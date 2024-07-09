import axios from 'axios';
import './App.css';

const App = () => {
  const handleLike = async () => {
    try {
      await axios.post('http://localhost:9100/like')
      alert('いいねを送信しました！')
    } catch (error) {
      console.error('Error sending like:', error)
    }
  }

  return (
    <div className="App">
      <h1>いいねボタン</h1>
      <button onClick={handleLike}>いいね！</button>
    </div>
  );
}

export default App;
