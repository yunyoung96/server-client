import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function Tab() {
  const [webtoons, setWebtoons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://server-of-server-client.vercel.app/')
      .then((res) => res.json())
      .then((data) => {
        setWebtoons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching webtoons:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>📚 네이버 월요 웹툰 목록</h1>
      <ul>
        {webtoons.map((toon, index) => (
          <li key={index}>{toon.title}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveTab('home')} style={{ fontWeight: activeTab === 'home' ? 'bold' : 'normal' }}>
          Home
        </button>
        <button onClick={() => setActiveTab('mon')} style={{ fontWeight: activeTab === 'mon' ? 'bold' : 'normal' }}>
          Mon
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {activeTab === 'home' && <div>🏠 Home Content</div>}
        {activeTab === 'mon' && <Tab>👤 </Tab>}
      </div>
    </div>
  );
}

export default App;
