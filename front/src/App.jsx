import { useState } from 'react';
import './App.css';
import ChatIcon from './components/ChatIcon';
import ChatForm from './components/ChatForm';

const App = () => {
  const BACKEND_URL = 'http://localhost:8000/chat';
  const [chatHistory, setChatHistory] = useState([]);

  const generateChatResponse = async (history) => {
    const updateHistory = (text) => {
      // setChatHistory((prev) => [...prev.filter((msg) => console.log(msg))]),
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== '생각중...'),
      ]),
        { role: 'model', text };
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role: role === 'user' ? 'user' : 'model',
      parts: [{ text: text }],
    }));

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(BACKEND_URL, options);
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error.message || '요청 오류가 발생했습니다.');

      console.log(data);

      updateHistory(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  const [showChatbot, setShowChatbot] = useState(true);
  return (
    <div className={`container ${showChatbot ? 'show-chatbot' : ''}`}>
      <button id="cb-toggler" onClick={() => setShowChatbot((prev) => !prev)}>
        <span className="material-symbols-rounded">Mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className="cb-popup">
        <div className="cb-header">
          <div className="header-info">
            <ChatIcon />
            <h2 className="logo-text">Agent Chatbot</h2>
          </div>
          <button
            className="material-symbols-rounded arrow-icon"
            onClick={() => setShowChatbot((prev) => !prev)}
          >
            keyboard_arrow_down
          </button>
        </div>
        <div className="cb-body">
          <div className="message bot-message">
            <ChatIcon />
            <p className="message-text">
              안녕하세요 <br /> 저는 챗봇입니다. 무엇을 도와드릴까요?
            </p>
          </div>

          <div className="message user-message">
            <p className="message-text">교통사고 보험처리 절차를 알려주세요.</p>
          </div>

          <div className="message bot-message">
            <ChatIcon />
            <p className="message-text">변호사한테 물어보세요.</p>
          </div>
        </div>
        <div className="cb-footer">
          <ChatForm
            generateChatResponse={generateChatResponse}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
