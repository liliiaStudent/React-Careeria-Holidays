import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import CustomerList from './CustomerList';
import Message from './Message';

function App() {

  const [showMessage, setShowMessage] = useState('')
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(true)
  return (
    <div className="App">
      <h1>Hello from react!</h1>

      {showMessage && <Message message={message} isPositive={isPositive} />}
      <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>
    </div>
  );
}

export default App;
