import './App.css'
import React, {useState} from 'react'
import CustomerServices from './services/Customer'



// Propsi otettu vastaan suoran nimellä

const CustomerAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

//Komponentin tilan määritys


const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')

const [newEmail, setNewEmail] = useState('')
const [newPhoneNumber, setNewPhoneNumber] = useState('')


const [newAddress, setNewAddress] = useState('')
const [newCity, setNewCity] = useState('')
const [newCountry, setNewCountry] = useState('')

const [newPostalCode, setNewPostalCode] = useState('')



//onSubmit tapahtumankäsittelijä funktio


const handleSubmit = (event) => {
    event.preventDefault()
    var newCustomer = {
      
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,
      phoneNumber: newPhoneNumber,
      address: newAddress,
      city: newCity,
      country: newCountry,      
      postalCode: newPostalCode,
      
     
    }
    console.log(newCustomer)
    
    CustomerServices.create(newCustomer)
    .then(response => {
      if (response.status === 200) {
        setMessage("Added new Customer: " + newCustomer.firstname + " " + newCustomer.lastname)
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
      

     /* 
       */
      })

}  
    return (
      <div id="addNew">
        <h2>Customer add</h2>
        <form onSubmit={handleSubmit}>
        
            <div>
                <input type="text" value={newFirstname} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Lastname"
                    onChange={({ target }) => setNewLastname(target.value)} required  />
            </div>
            <div>
                <input type="text" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} required />
            </div>
            <div>
                <input type="text" value={newPhoneNumber} placeholder="Phone Number"
                    onChange={({ target }) => setNewPhoneNumber(target.value)} required />
            </div>
            <div>
                <input type="text" value={newAddress} placeholder="Address"
                    onChange={({ target }) => setNewAddress(target.value)} required />
            </div>
            <div>
                <input type="text" value={newCity} placeholder="City"
                    onChange={({ target }) => setNewCity(target.value)} required />
            </div>
            <div>
                <input type="text" value={newCountry} placeholder="Country"
                    onChange={({ target }) => setNewCountry(target.value)} required />
            </div>
            
            <div>
                <input type="text" value={newPostalCode} placeholder="Postal code"
                    onChange={({ target }) => setNewPostalCode(target.value)} required />
            </div>
           
           
            
             <input type='submit' value='save' /> 
             <input type='button' value='back' onClick={() => setLisäystila(false)} />     
            
           
        </form>
       
       
       
      </div>
    )
}

export default CustomerAdd
