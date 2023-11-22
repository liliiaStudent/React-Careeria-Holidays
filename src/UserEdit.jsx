import './App.css'
import React, {useState} from 'react'
import UserServices from './services/User'
import md5 from 'md5'

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

//Komponentin tilan määritys
const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstname)
const [newLastname, setNewLastname] = useState(muokattavaUser.lastname)
const [newEmail, setNewEmail] = useState(muokattavaUser.email)
const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)
const [newUsername, setNewUsername] = useState(muokattavaUser.username)
const [newPassword, setNewPassword] = useState(muokattavaUser.password)
const [confirmPassword, setConfirmPassword] = useState(muokattavaUser.confirmPassword);


//onSubmit tapahtumankäsittelijä funktio

const handleSubmit = (event) => {
    event.preventDefault()
    var newUser = {
      userId: newUserId,
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,
      accesslevelId: parseInt(newAccesslevelId),
      username: newUsername,
      password: md5(newPassword) //salataan md5 kirjaston metodilla
      
    }
    console.log(newUser)

    UserServices.update(newUser)
    .then(response => {
      if (response.status === 200) {
        setMessage("Edited User: " + newUser.username)
        setIsPositive(true)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 5000)

        setMuokkaustila(false)
      }
       
           })
    .catch(error => {
      setMessage(error)
      setIsPositive(false)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 6000)
      

     /* 
       */
      })

}  
return (
    <div id="edit">
        <h2>User edit</h2>
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
                    onChange={({ target }) => setNewEmail(target.value)} required />
            </div>
            <div>
                <input type="number" value={newAccesslevelId} placeholder="Access level"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} required />
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="User Name"
                    onChange={({ target }) => setNewUsername(target.value)} required/>
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
             <input type='button' value='back' onClick={() => setMuokkaustila(false)} />     
            
           
        </form>
       
       
       
      </div>
    )
}

export default UserEdit