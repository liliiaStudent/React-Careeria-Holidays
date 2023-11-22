import './App.css'
import React, {useState} from 'react'
import ReservationServices from './services/Reservation'



// Propsi otettu vastaan suoran nimellä

const ReservationAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

//Komponentin tilan määritys

const [newReservationId, setNewReservationId] = useState('')
const [newPropertyName, setNewPropertyName] = useState('')
const [newPropertyId, setNewPropertyId] = useState('')
const [newBookedDateFrom, setNewBookedDateFrom] = useState('')
const [newBookedDateTo, setNewBookedDateTo] = useState('')
const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newPhoneNumber, setNewPhoneNumber] = useState('')
const [newAddress, setNewAddress] = useState('')
const [newCity, setNewCity] = useState('')
const [newCountry, setNewCountry] = useState('')
const [newPostalCode, setNewPostalCode] = useState('')
const [newDetails, setNewDetails] = useState('')

                 
                       
                        

//onSubmit tapahtumankäsittelijä funktio


const handleSubmit = (event) => {
    event.preventDefault()
    var newReservation = {
     
      reservationId: newReservationId,
      propertyName: newPropertyName,
      propertyId: newPropertyId,
      bookedDateFrom: newBookedDateFrom,
      bookedDateTo: newBookedDateTo,
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,
      phoneNumber: newPhoneNumber,
      address: newAddress,
      city: newCity,
      country: newCountry,
      postalCode: newPostalCode,
      details: newDetails
     
    }
    console.log(newReservation)
    
    ReservationServices.create(newReservation)
    .then(response => {
      if (response.status === 200) {
        setMessage("Added new Reservation: " + newReservation.propertyName )
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
        <h2>Reservation add</h2>
        <form onSubmit={handleSubmit}>
        
            <div>
              <input type="text" value={newReservationId} placeholder="Reservation Id"
                    onChange={({ target }) => setNewReservationId(target.value)} required  />
          </div>
            <div>
                <input type="text" value={newPropertyName} placeholder="Property Name"
                    onChange={({ target }) => setNewPropertyName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newPropertyId} placeholder="Property Id"
                    onChange={({ target }) => setNewPropertyId(target.value)} required  />
            </div>
            <div>
                <input type="text" value={newBookedDateFrom} placeholder="Booked Date From"
                    onChange={({ target }) => setNewBookedDateFrom(target.value)} required />
            </div>
            <div>
                <input type="text" value={newBookedDateTo} placeholder="Booked Date To"
                    onChange={({ target }) => setNewBookedDateTo(target.value)}  />
            </div>
            <div>
                <input type="text" value={newFirstname} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Lastname"
                    onChange={({ target }) => setNewLastname(target.value)} required />
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
                <input type="text" value={newPostalCode} placeholder="PostalCode"
                    onChange={({ target }) => setNewPostalCode(target.value)} required />
            </div>
            <div>
                <input type="text" value={newDetails} placeholder="Details"
                    onChange={({ target }) => setNewDetails(target.value)} required />
            </div>
                      
           
            
             <input type='submit' value='save' /> 
             <input type='button' value='back' onClick={() => setLisäystila(false)} />     
            
           
        </form>
       
       
       
      </div>
    )
}

export default ReservationAdd