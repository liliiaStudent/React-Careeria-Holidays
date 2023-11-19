import './App.css'
import React, {useState} from 'react'
import CustomerServices from './services/Customer'



// Propsi otettu vastaan suoran nimellä

const CustomerEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer}) => {

//Komponentin tilan määritys
const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
const [newFirstname, setNewFirstname] = useState(muokattavaCustomer.firstname)
const [newLastname, setNewLastname] = useState(muokattavaCustomer.lastname)

const [newEmail, setNewEmail] = useState(muokattavaCustomer.email)
const [newPhoneNumber, setNewPhoneNumber] = useState(muokattavaCustomer.phoneNumber)


const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
const [newCity, setNewCity] = useState(muokattavaCustomer.city)
const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)

const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)

//onSubmit tapahtumankäsittelijä funktio


const handleSubmit = (event) => {
    event.preventDefault()
    var newCustomer = {
      customerId: newCustomerId,
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,
      phoneNumber: newPhoneNumber,
      address: newAddress,
      city: newCity,
      country: newCountry,      
      postalCode: newPostalCode,
      
     
    }
    CustomerServices.update(newCustomer)
    .then(response => {
      if (response.status === 200) {
        setMessage("Edited Customer: " + newCustomer.firstname + " " + newCustomer.lastname)
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
      <h2>Customer Edit</h2>
      <form onSubmit={handleSubmit}>
          <div>
                <input type="text" value={newCustomerId} placeholder="ID" 
                    onChange={({ target }) => setNewCustomerId(target.value)} disabled />
          </div>
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
           <input type='button' value='back' onClick={() => setMuokkaustila(false)} />     
          
         
      </form>
     
     
     
    </div>
  )
}

export default CustomerEdit
