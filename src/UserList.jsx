import './App.css'
import React, {useState, useEffect} from 'react'
import UserServices from './services/User'
import UserAdd from './UserAdd'



// Propsi otettu vastaan suoran nimellä

const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

//Komponentin tilan määritys
  
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

const editUsers = (user) => {
  setMuokattavaUser(user)
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
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Accesslevel</th>                    
                     </tr>
                    </thead> 
                
                 <tbody>
                
               
                             
                    { users  && users.map(u => 
                     {
                     let valueaccesslevelId = localStorage.getItem('accesslevelId');
                     //console.log(valueaccesslevelId);
                     const lowerCaseName = u.lastname.toLowerCase()
                        if(valueaccesslevelId == 2){
                          if (lowerCaseName.indexOf(search) > -1) {
                          return(
                          <tr key={u.userId}>
                              <td>{u.firstname}</td>
                              <td>{u.lastname}</td>
                              <td>{u.email}</td>
                              <td>{u.accesslevelId}</td>
                          </tr>              
                  
                              )
                          }
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
