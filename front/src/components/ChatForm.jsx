import React, { useRef } from 'react';

const ChatForm = ({ generateChatResponse, chatHistory, setChatHistory }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userMessage = inputRef.current.value.trim(); // 입력 앞뒤 공백 제거

    if (!userMessage) return;
    inputRef.current.value = '';

    setChatHistory((history) => [
      ...history,
      { role: 'user', text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: 'model', text: '생각중...' },
      ]);
      generateChatResponse([{ role: 'user', text: userMessage }]);
    }, 500);
  };
  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="메시지를 입력해 주세요..."
        className="message-input"
        ref={inputRef}
        required
      />
      <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};

export default ChatForm;
