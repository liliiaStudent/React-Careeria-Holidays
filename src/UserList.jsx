import './App.css'
import React, {useState, useEffect} from 'react'
import UserServices from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'



// Propsi otettu vastaan suoran nimellä

const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

//Komponentin tilan määritys
const User = ({setIsPositive, setMessage, setShowMessage, reload, reloadNow}) 
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
const editUser = (users) => {
  setMuokattavaUser(users)
  setMuokkaustila(true)

}
    return (
      <>
        
        <h1><nobr>Users</nobr>   

                {lisäystila && <UserAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>
             

                {!lisäystila && !muokkaustila &&
                <input placeholder="Search by Last Name" value={search} onChange={handleSearchInputChange} />
                }              

                {!lisäystila && !muokkaustila &&
                <table id='userTable'>
                   <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Access Level Id</th>  
                            <th>Password</th>                  
                        </tr>
                    </thead> 
                
                 <tbody>
                
               
                             
                    { users  && users.map(u => 
                     {
                     let valueaccesslevelId = localStorage.getItem('accessLevelId');
                     //console.log(valueaccesslevelId);
                     const lowerCaseName = u.lastname.toLowerCase()
                        if(valueaccesslevelId = 1){
                          if (lowerCaseName.indexOf(search) > -1) {
                          return(
                          <tr key={u.userId}>
                              <td>{u.userId}</td>
                              <td>{u.firstname}</td>
                              <td>{u.lastname}</td>
                              <td>{u.email}</td>
                              <td>{u.accessLevelId}</td>
                              <td>{u.password}</td>
                          </tr> 
                                       
                  
                              )
                          }
                        }
                        
                     }
                         ) 
                    }
                  muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila} 
                  setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                  muokattavaUser={muokattavaUser}

/>
        

                 
         {
             !lisäystila && !muokkaustila  && users && users.map(u =>  
                
                {
                    const lowerCaseName = u.username.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                  

                <User key={u.userId} users={u} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editUser={editUser}/>
              
                ) 
                        }
                    }
                 )     
                                          

            
                   }
              </tbody>
               </table>
            }
      </>
    )
}

export default UserList
