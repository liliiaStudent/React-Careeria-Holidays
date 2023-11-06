import './App.css'
import React, {useState, useEffect} from 'react'
import HolidayPropertyServices from './services/HolidayProperty'
import HolidayProperty from './HolidayProperty'
import HolidayPropertyAdd from './HolidayPropertyAdd'
import HolidayPropertyEdit from './HolidayPropertyEdit'


// Propsi otettu vastaan suoran nimellä

const HolidayPropertyList = ({setIsPositive, setShowMessage, setMessage}) => {

    //Komponentin tilan määritys
      
const [properties, setProperties] = useState([])
const [showProperties, setShowProperties] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProperty, setMuokattavaProperty] = useState(false)
const [search, setSearch] = useState("")

useEffect( () => {
    HolidayPropertyServices.getAll()
    .then(data => {
        setProperties(data)
})

},[lisäystila, reload, muokkaustila]
)
//Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setShowProperties(true)
    setSearch(event.target.value.toLowerCase())
}


const editProperty = (property) => {
    setMuokattavaProperty(property)
    setMuokkaustila(true)
  
  }

    return (
    <>
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowProperties(!showProperties)}>Holiday Properties</nobr>   

                 {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                 {!lisäystila && !muokkaustila &&
                <input placeholder="Search by the name" value={search} onChange={handleSearchInputChange} />
                }


                 {lisäystila && <HolidayPropertyAdd setLisäystila={setLisäystila} 
                 setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                 />}
                
                {muokkaustila && <HolidayPropertyEdit setMuokkaustila={setMuokkaustila} 
                  setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                  muokattavaProperty={muokattavaProperty}

/>}
        

                 
         {
             !lisäystila && !muokkaustila && showProperties && properties && properties.map(p =>  
                
                {
                    const lowerCaseName = p.propertyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                  

                <HolidayProperty key={p.propertyId} property={p} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editProperty={editProperty}/>
              
                ) 
                        }
                    }
                 )     
                               

            
          }
      
       
    </>
           )
}

export default HolidayPropertyList