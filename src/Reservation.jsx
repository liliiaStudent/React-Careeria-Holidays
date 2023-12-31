import './App.css'
import React, {useState} from 'react'
import ReservationService from './services/Reservation'
//import Reservation from './services/Reservation'

// Props on nimeltään customer

const Reservation = ({reservation, editReservation, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    //Komponentin tilan määritys
      

const [showDetails, setShowDetails] = useState(false)

const deleteReservation =(reservation) => {
    let vastaus = window.confirm(`Remove Reservation ${reservation.propertyName} `)

    if (vastaus === true) { 
    ReservationService.remove(reservation.reservationId)
    .then(res => {
        if (res.status === 200) {
            setMessage(`Successfully removed reservation ${reservation.propertyName} `)
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
    
    

    return (
    
        <div className='reservDiv'>
         <h4 
            onClick={() => setShowDetails(!showDetails)}>
                {reservation.propertyName} {reservation.lastname}
         </h4>      

          {showDetails && <div className='reservationDetails'>
            <h3> {reservation.propertyName} {reservation.lastname} </h3>
            <button className="nappi" onClick={() => deleteReservation(reservation)}>Delete</button>
            <button className="nappi" onClick={() => editReservation(reservation)} >Edit</button>
            <table>
                <thead>
                    <tr>
                        <th>ReservationId</th>
                        <th>Property Name</th>
                        <th>PropertyId</th>
                        <th>BookedDateFrom </th>
                        <th>BookedDateTo</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>PhoneNumber</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>PostalCode</th>
                        <th>Details</th>
                        
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                        
                            <td>{reservation.reservationId}</td> 
                            <td>{reservation.propertyName}</td>                        
                            <td>{reservation.propertyId}</td>  
                            <td>{reservation.bookedDateFrom}</td>  
                            <td>{reservation.bookedDateTo}</td>  
                            <td>{reservation.firstname}</td>  
                            <td>{reservation.lastname}</td>  
                            <td>{reservation.email}</td>  
                            <td>{reservation.phoneNumber}</td>  
                            <td>{reservation.address}</td>  
                            <td>{reservation.city}</td>  
                            <td>{reservation.country}</td>  
                            <td>{reservation.postalCode}</td>  
                            <td>{reservation.details}</td>  
                        </tr>
                        
                        
                    </tbody>
            </table></div> }  
            
            
                 
       
        </div>  
     )
    } 

export default Reservation




