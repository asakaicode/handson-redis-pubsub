import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const App = () => {
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    const socket = io('http://localhost:9100')
    socket.on('notification', (message: string) => {
      setNotifications((prev) => [...prev, message])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const renderNotifications = useCallback(() => {
    return ( 
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
      )
  }, [notifications])

  return (
    <div className="App">
      <h1>通知アプリ</h1>
      {renderNotifications()}
    </div>
  );
}

export default App;
