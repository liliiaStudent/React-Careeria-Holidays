import './App.css'
import React, {useState} from 'react'
import HolidayPropertyService from './services/HolidayProperty'

// Props on nimeltään customer

const HolidayProperty = ({property, editHolidayProperty, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    //Komponentin tilan määritys
      

const [showDetails, setShowDetails] = useState(false)

const deleteHolidayProperty =(property) => {
    let vastaus = window.confirm(`Remove Property ${property.propertyName} `)

    if (vastaus === true) { 
    HolidayPropertyService.remove(property.propertyId)
    .then(res => {
        if (res.status === 200) {
            setMessage(`Successfully removed property ${property.propertyName} `)
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
    
        <div className='propDiv'>
         <h4 
            onClick={() => setShowDetails(!showDetails)}>
            {property.propertyName} 
            </h4>      

          {showDetails && <div className='propertyDetails'>
            <h3> {property.propertyName} </h3>
            <button className="nappi" onClick={() => deleteHolidayProperty(property)}>Delete</button>
            <button className="nappi" onClick={() => editHolidayProperty(property)} >Edit</button>
            <table>
                <thead>
                    <tr>
                        <th>Property Name</th>
                        <th>Price per Night</th>
                        <th>Property Details</th>
                        <th>Image link</th>
                        
                    </tr>
                </thead>
                <tbody>
                        
                        <td>{property.propertyName}</td>                        
                        <td>{property.pricePerNight}</td>
                        <td>{property.propertyDetails}</td>
                        <td>{property.imageLink}</td>
                        
                        
                </tbody>
            </table></div> }  
            
            
                 
       
        </div>  
     )
    } 

export default HolidayProperty