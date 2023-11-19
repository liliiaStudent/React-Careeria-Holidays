import './App.css'
import React, {useState} from 'react'
import HolidayPropertyServices from './services/HolidayProperty'



// Propsi otettu vastaan suoran nimellä

const HolidayPropertyAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

//Komponentin tilan määritys


const [newPropertyId, setNewPropertyId] = useState('')
const [newPropertyName, setNewPropertyName] = useState('')
const [newPricePerNight, setNewPricePerNight] = useState('')

const [newPropertyDetails, setNewPropertyDetails] = useState('')
const [newImageLink, setNewImageLink] = useState('')




//onSubmit tapahtumankäsittelijä funktio


const handleSubmit = (event) => {
    event.preventDefault()
    var newHolidayProperty = {
     
      propertyId: newPropertyId,
      propertyName: newPropertyName,
      pricePerNight: newPricePerNight,
      propertyDetails: newPropertyDetails,
      imageLink: newImageLink,
      
     
    }
    console.log(newHolidayProperty)
    
    HolidayPropertyServices.create(newHolidayProperty)
    .then(response => {
      if (response.status === 200) {
        setMessage("Added new Holiday Property: " + newHolidayProperty.propertyName )
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
        <h2>Holiday Property add</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newPropertyId} placeholder="ID" 
                    onChange={({ target }) => setNewPropertyId(target.value)} disabled />
            </div>
        
            <div>
                <input type="text" value={newPropertyName} placeholder="Property Name"
                    onChange={({ target }) => setNewPropertyName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newPricePerNight} placeholder="Price per Night"
                    onChange={({ target }) => setNewPricePerNight(target.value)} required  />
            </div>
            <div>
                <input type="text" value={newPropertyDetails} placeholder="Property Details"
                    onChange={({ target }) => setNewPropertyDetails(target.value)} required />
            </div>
            <div>
                <input type="text" value={newImageLink} placeholder="Image Link"
                    onChange={({ target }) => setNewImageLink(target.value)}  />
            </div>
                      
           
            
             <input type='submit' value='save' /> 
             <input type='button' value='back' onClick={() => setLisäystila(false)} />     
            
           
        </form>
       
       
       
      </div>
    )
}

export default HolidayPropertyAdd