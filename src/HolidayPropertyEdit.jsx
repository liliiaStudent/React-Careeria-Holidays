import './App.css'
import React, {useState} from 'react'
import HolidayPropertyServices from './services/HolidayProperty'



// Propsi otettu vastaan suoran nimellä

const HolidayPropertyEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProperty}) => {

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
    
    HolidayPropertyServices.update(newHolidayProperty)
    .then(response => {
      if (response.status === 200) {
        setMessage("Edited Holiday Property: " + newHolidayProperty.propertyName )
        setIsPositive(true)
        setShowMessage(true)
       

        setTimeout(() => {
          setMuokkaustila(false)
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
      <h2>Holiday Property edit</h2>
      <form onSubmit={handleSubmit}>
          <div>
                <input type="text" value={newPropertyId} placeholder="ID" 
                    onChange={({ target }) => setNewPropertyId(target.value)} required />
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
                  onChange={({ target }) => setNewImageLink(target.value)} required />
          </div>
                    
         
          
           <input type='submit' value='save' /> 
           <input type='button' value='back' onClick={() => setMuokkaustila(false)} />     
          
         
      </form>
     
     
     
    </div>
  )
}


export default HolidayPropertyEdit