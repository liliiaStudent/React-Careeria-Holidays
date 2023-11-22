import './App.css'
import React, {useState, useEffect} from 'react'
import UserServices from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
import User from './services/User'


// Propsi otettu vastaan suoran nimellä

const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

//Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")

useEffect( () => {
    UserServices.getAll()
    .then(data => {
        setUsers(data)
})

},[lisäystila, reload, muokkaustila]
)

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSearchInputChange = (event) => {    
    setSearch(event.target.value.toLowerCase())
}

const deleteUser =(users) => {
  let vastaus = window.confirm(`Remove User ${users.userId} `)

  if (vastaus === true) { 
  UserServices.remove(users.userId)
  .then(u => {
      if (u.status === 200) {
          setMessage(`Successfully removed user ${users.userId} `)
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

         
           // Ilmoituksen piilotus
          setTimeout(() => {
          setShowMessage(false)},
          5000
          )
          reloadNow(!reload)
          }
          
      
  }
      )
      .catch(error => {
          setMessage(error)
          setIsPositive(false)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
  
          setTimeout(() => {
            setShowMessage(false)
           }, 6000)
        })
        

      } // Jos poisto halutaankin perua
      else {
          setMessage('Poisto peruttu onnistuneesti.')
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
  
          // Ilmoituksen piilotus
          setTimeout(() => {
          setShowMessage(false)},
          5000
          )
      }


  }

const editUser = (user) => {
  setMuokattavaUser(user)
  setMuokkaustila(true)

}
    return (
      <div>
        
        <h1><nobr>Users</nobr>   

                {lisäystila && <UserAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>
             

                {!lisäystila && !muokkaustila &&
                <input placeholder="Search by Last Name" value={search} onChange={handleSearchInputChange} />
                }

                {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila} 
                  setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                  muokattavaUser={muokattavaUser} /> }
              

                {!lisäystila && !muokkaustila &&
                <table id='userTable'>
                  <tbody>      
                    { users  && users.map(u =>
                    
                      {
                        let valueaccesslevelId = localStorage.getItem('accessLevelId');
                        //console.log(valueaccesslevelId);
                        const lowerCaseName = u.lastname.toLowerCase()
                          if(valueaccesslevelId === "1"){
                            if (lowerCaseName.indexOf(search) > -1) {
                              return(
                                  <div className='userDiv'>
                                  <h4
                                    onClick={() => setShowDetails(!showDetails)}>
                                    {u.firstname} {u.lastname}
                                  </h4>
                                  

                                  {showDetails && <div className='userDetails'>
                                  
                                    <button className="nappi" onClick={() => deleteUser(u)}>Delete</button>
                                    <button className="nappi" onClick={() => editUser(u)}>Edit</button>                                    
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>UserId</th>
                                          <th>Firstname</th>
                                          <th>Lastname</th>
                                          <th>Email</th>
                                          <th>Username</th>
                                          <th>Password</th>
                                          <th>Access Level Id</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr key={u.userId}>
                                          <td>{u.userId}</td>
                                          <td>{u.firstname}</td>
                                          <td>{u.lastname}</td>
                                          <td>{u.email}</td>
                                          <td>{u.username}</td>
                                          <td>{u.password}</td>
                                          <td>{u.accessLevelId}</td>
                                        </tr>
                                      </tbody>
                                    </table></div>}
                                </div>
                                
                              )                            
                            }
                          }                        
                        }
                      )            
                    }
                  </tbody>
               </table>
            }
      </div>
    )
}

export default UserList
