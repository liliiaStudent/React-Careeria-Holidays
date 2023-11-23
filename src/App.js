import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './CustomerList';
import HolidayPropertyList from './HolidayPropertyList';
import UserList from './UserList';
import ReservationList from './ReservationList';
import Message from './Message';
import Login from './Login';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  const [message, setMessage] = useState('');
  const [isPositive, setIsPositive] = useState(true);
  const [showMessage, setShowMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    let storedUser = localStorage.getItem("username");
    if (storedUser !== null) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setLoggedInUser('');
  };

  return (
    <div className="App">
      
      {!loggedInUser && 
        <Login
          setMessage={setMessage}
          setIsPositive={setIsPositive}
          setShowMessage={setShowMessage}
          setLoggedInUser={setLoggedInUser}
        /> }
      
       { loggedInUser && 
        <Router>
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href='/Customers'>Customers</Nav.Link>
              <Nav.Link href='/Users'>Users</Nav.Link>
              <Nav.Link href='/HolidayProperties'>Holiday Properties</Nav.Link>
              <Nav.Link href='/Reservations'>Reservations</Nav.Link>
              <button onClick={logout}>Logout</button>
            </Nav>
          </Navbar>
          
          <h2>Holidays</h2>
          {showMessage && <Message message={message} isPositive={isPositive} />}
          <Routes>
            <Route path="/Customers" element={<CustomerList
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
              />}>
              
            </Route>
            <Route path="/Users" element={<UserList
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
              />}>
              
            </Route>
            <Route path="/HolidayProperties" element={<HolidayPropertyList
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
              />}>
            </Route>
            <Route path="/Reservations" element={<ReservationList
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
              />}>
            </Route>
          </Routes>
       </Router>  
      
            }      
    </div>
  )
};

export default App;
