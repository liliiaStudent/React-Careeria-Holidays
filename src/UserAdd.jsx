import './App.css'
import React, {useState} from 'react'
import UserServices from './services/User'
import md5 from 'md5'


// Propsi otettu vastaan suoran nimellä

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

//Komponentin tilan määritys

const [newUserId, setNewUserId] = useState('')
const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState('2')
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('');


//onSubmit tapahtumankäsittelijä funktio


const handleSubmit = (event) => {
    event.preventDefault()
    var newUser = {
      userId: newUserId,
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,      
      username: newUsername,
      password: md5(newPassword), //salataan md5 kirjaston metodilla
      accesslevelId: parseInt(newAccesslevelId),
    }
    console.log(newUser)

    UserServices.create(newUser)
    .then(response => {
      if (response.status === 200) {
        setMessage(`Added new User: ${newUser.username}`)
        setIsPositive(true)
        setShowMessage(true)
        setTimeout(() => {
          setLisäystila(false)
         }, 5000)

        setLisäystila(false)
      }
       
           })
    .catch(error => {
      setMessage(error)
      setIsPositive(false)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 6000)
      

     
      })

}  
    return (
      <div id="addNew">
        <h2>User add</h2>
        <form onSubmit={handleSubmit}>
            
            <div>
                <input type="text" value={newUserId} placeholder="ID" 
                    onChange={({ target }) => setNewUserId(target.value)} required />
            </div>
            <div>
                <input type="text" value={newFirstname} placeholder="First Name" 
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Last Name"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="emai" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="number" value={newAccesslevelId} placeholder="Access level"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="User Name"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
                <input 
                    type="password" 
                    value={newPassword} 
                    placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} 
                    style={newPassword === confirmPassword ? {} : {border: '2px solid red'}}
                />
            </div>
            <div>
                <input 
                    type="password" 
                    value={confirmPassword} 
                    placeholder="Confirm Password"
                    onChange={({ target }) => setConfirmPassword(target.value)} 
                    style={newPassword === confirmPassword ? {} : {border: '2px solid red'}}
                />
                {newPassword !== confirmPassword && <p>Passwords do not match!</p>}
            </div>
           
             <input type='submit' value='save' disabled={newPassword !== confirmPassword} />
             <input type='button' value='back' onClick={() => setLisäystila(false)} />     
            
           
        </form>
       
       
       
      </div>
    )
}

export default UserAdd