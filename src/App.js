import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import CustomerList from './CustomerList';
import HolidayPropertyList from './HolidayPropertyList';
import UserList from './UserList';
import Message from './Message';

import  Navbar  from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {

  const [showMessage, setShowMessage] = useState('')
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(true)
  return (
    <div className="App">
      <Router>
         <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Link to={'/Users'} className='nav-link'>Users</Link> 
              <Link to={'/Customers'} className='nav-link'>Customers</Link>
              <Link to={'/HolidayProperties'} className='nav-link'>Holiday Properties</Link>
            </Nav>
          </Navbar> 
    
          <h1>Holidays</h1>

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Switch>
              <Route path="/Users"> <UserList setMessage={setMessage} setIsPositive={setIsPositive} 
               setShowMessage={setShowMessage} /></Route>
               
               <Route path="/Customers"> <CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
               setShowMessage={setShowMessage} /></Route> 

               <Route path="/HolidayProperties"> <HolidayPropertyList setMessage={setMessage} setIsPositive={setIsPositive} 
               setShowMessage={setShowMessage} /></Route>              

          </Switch>
      </Router>
      
    </div>
  )
}

export default App;
