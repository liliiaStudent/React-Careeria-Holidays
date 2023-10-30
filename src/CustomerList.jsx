import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerServices from './services/Customer'


// Propsi otettu vastaan suoran nimellä

const CustomerList = () => {

    //Komponentin tilan määritys
      
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)


useEffect( () => {
    CustomerServices.getAll()
    .then(data => {
        setCustomers(data)
})

},[]
)


    return (
    <>
        
        <h2 onClick={() => setShowCustomers(!showCustomers)}>Customers</h2>   

                 
         {
             showCustomers && customers && customers.map(c =>  (   

                <h3 key={c.customerId}>{c.firstname} {c.lastname}</h3>
              
                ) 
              
                 )            

            
          }
      
       
    </>
           )
}

export default CustomerList