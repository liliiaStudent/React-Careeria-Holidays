import './App.css'
import React, {useState, useEffect} from 'react'
import ReservationServices from './services/Reservation'
import Reservation from './Reservation'
import ReservationAdd from './ReservationAdd'
import ReservationEdit from './ReservationEdit'


// Propsi otettu vastaan suoran nimellä

const ReservationList = ({setIsPositive, setShowMessage, setMessage}) => {

    //Komponentin tilan määritys
      
const [reservations, setReservations] = useState([])
const [showReservations, setShowReservations] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaReservation, setMuokattavaReservation] = useState(false)
const [search, setSearch] = useState("")

useEffect( () => {
    ReservationServices.getAll()
    .then(data => {
        setReservations(data)
        //console.log(data)
})

},[lisäystila, reload, muokkaustila]
)
//Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setShowReservations(true)
    setSearch(event.target.value.toLowerCase())
}


const editReservation = (reservation) => {
    setMuokattavaReservation(reservation)
    setMuokkaustila(true)
  
  }

    return (
    <>
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowReservations(!showReservations)}>Reservations</nobr>   

                 {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                 {!lisäystila && !muokkaustila &&
                <input placeholder="Search by the name" value={search} onChange={handleSearchInputChange} />
                }


                 {lisäystila && <ReservationAdd setLisäystila={setLisäystila} 
                 setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                 />}
                
                {muokkaustila && <ReservationEdit setMuokkaustila={setMuokkaustila} 
                  setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                  muokattavaReservation={muokattavaReservation}
                  />}
        

                 
         {
             !lisäystila && !muokkaustila && showReservations && reservations && reservations.map(r =>  
                
                {
                    const lowerCaseName = r.propertyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                  

                <Reservation key={r.reservationId} reservation={r} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editReservation={editReservation}/>
              
                ) 
                        }
                    }
                 )     
                               

            
          }
      
       
    </>
           )
}

export default ReservationList