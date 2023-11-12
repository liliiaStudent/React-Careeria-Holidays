import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import CustomerList from './CustomerList';
import HolidayPropertyList from './HolidayPropertyList';
import UserList from './UserList';
import ReservationList from './ReservationList';
import Message from './Message';
import Login from './Login'

import  Navbar  from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

  const [showMessage, setShowMessage] = useState('')
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState('')

  useEffect(() => {
    let storedUser = localStorage.getItem("username")
    if(storedUser !== null) {
      setLoggedInUser(storedUser)
    }
  },[])
  
  //Logout
  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
  }
  
  return (
    <div className="App">
      {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
               setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} / >}   

{loggedInUser &&
     
      <Router>
         <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Link to={'/Users'} className='nav-link'>Users</Link> 
              <Link to={'/Customers'} className='nav-link'>Customers</Link>             
              <Link to={'/HolidayProperties'} className='nav-link'>Holiday Properties</Link>
              <Link to={'/Reservations'} className='nav-link'>Reservations</Link>
              <button onClick={() => logout()}>Logout</button>
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

               <Route path="/Reservations"> <ReservationList setMessage={setMessage} setIsPositive={setIsPositive} 
               setShowMessage={setShowMessage} /></Route> 
            

          </Switch>
      </Router>
} 
    </div>
  )
}

export default App;
