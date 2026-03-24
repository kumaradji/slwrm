// ChatButton.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ChatButton.module.scss';
import { FaComments, FaTimes } from 'react-icons/fa';
import { logToServer } from "../../services/logger";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const lastMessageId = useRef(0);
  const messagesEndRef = useRef(null);
  const pollingRef = useRef(null);
  const inputRef = useRef(null);

  const token = localStorage.getItem('token');

  // Прокрутка вниз
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Фокус на поле ввода при открытии
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Загрузка истории
  const fetchMessages = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/messages/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        if (data.length > 0) {
          lastMessageId.current = data[data.length - 1].id;
        }
      } else {
        logToServer('Не удалось получить сообщения', 'error');
      }
    } catch (error) {
      logToServer(`Ошибка при получении сообщений: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Поллинг новых сообщений
  const pollMessages = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(
        `/api/long-polling/messages/?last_message_id=${lastMessageId.current}`,
        { headers: { 'Authorization': `Token ${token}` } }
      );
      if (response.ok) {
        const newMessages = await response.json();
        if (newMessages.length > 0) {
          setMessages(prev => {
            const existingIds = new Set(prev.map(m => m.id));
            const filtered = newMessages.filter(m => !existingIds.has(m.id));
            if (filtered.length > 0) {
              lastMessageId.current = filtered[filtered.length - 1].id;
            }
            return [...prev, ...filtered];
          });
        }
      }
    } catch (error) {
      logToServer(`Ошибка поллинга: ${error.message}`, 'error');
    }
  }, [token]);

  // Запуск/остановка поллинга при открытии чата
  useEffect(() => {
    if (isOpen && token) {
      fetchMessages();
      pollingRef.current = setInterval(pollMessages, 60000);
    }
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [isOpen, token, fetchMessages, pollMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !token) return;
    try {
      const response = await fetch('/api/messages/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newMessage, is_admin: false })
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => {
          const exists = prev.some(m => m.id === data.id);
          return exists ? prev : [...prev, data];
        });
        setNewMessage('');
      } else {
        logToServer('Не удалось отправить сообщение', 'error');
      }
    } catch (error) {
      logToServer(`Ошибка отправки: ${error.message}`, 'error');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!token) return null;

  return (
    <div className={styles.chatWrapper}>

      {/* Окно чата */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h2>Чат</h2>
          </div>

          <div className={styles.chatMessages}>
            {isLoading && (
              <div className={styles.loading}>
                <span /><span /><span />
              </div>
            )}
            {!isLoading && messages.length === 0 && (
              <div className={styles.empty}>
                Напишите нам — мы всегда рады помочь! 🌿
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${message.is_admin ? styles.adminMessage : styles.userMessage}`}
              >
                <strong>{message.user_name || 'Unknown'}:</strong> {message.content}
                <div className={styles.timestamp}>{formatTime(message.timestamp)}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className={styles.chatInput}>
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите ваше сообщение..."
              rows={1}
              required
            />
            <button type="submit">Отправить</button>
          </form>
        </div>
      )}

      {/* Кнопка — как была */}
      <div className={styles.chatButton} onClick={() => setIsOpen(v => !v)}>
        {isOpen ? <FaTimes /> : <FaComments />}
      </div>

    </div>
  );
};

export default ChatButton;
