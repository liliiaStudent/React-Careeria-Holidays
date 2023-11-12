import './App.css'
import React, {useState} from 'react'
import ReservationService from './services/Reservation'
import Reservation from './services/Reservation'

// Props on nimeltään customer

const HolidayProperty = ({reservation, editReservation, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    //Komponentin tilan määritys
      

const [showDetails, setShowDetails] = useState(false)

const deleteReservation =(property) => {
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
            {reservation.propertyName} 
            </h4>      

          {showDetails && <div className='reservationDetails'>
            <h3> {reservation.propertyName} </h3>
            <button className="nappi" onClick={() => deleteReservation(reservation)}>Delete</button>
            <button className="nappi" onClick={() => editReservation(reservation)} >Edit</button>
            <table>
                <thead>
                    <tr>
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
                        
                        <td>{reservation.propertyName}</td>                        
                        <td>{reservation.propertyId}</td>  
                        <td>{reservation.BookedDateFrom}</td>  
                        <td>{reservation.BookedDateTo}</td>  
                        <td>{reservation.Firstname}</td>  
                        <td>{reservation.Lastname}</td>  
                        <td>{reservation.Email}</td>  
                        <td>{reservation.PhoneNumber}</td>  
                        <td>{reservation.Address}</td>  
                        <td>{reservation.City}</td>  
                        <td>{reservation.Country}</td>  
                        <td>{reservation.PostalCode}</td>  
                        <td>{reservation.Details}</td>  
                        
                        
                </tbody>
            </table></div> }  
            
            
                 
       
        </div>  
     )
    } 

export default Reservation




