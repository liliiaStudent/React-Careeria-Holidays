import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerServices from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'


// Propsi otettu vastaan suoran nimellä

const CustomerList = () => {

    //Komponentin tilan määritys
      
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)


useEffect( () => {
    CustomerServices.getAll()
    .then(data => {
        setCustomers(data)
})

},[]
)


    return (
    <>
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>   

                 {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                 {lisäystila && <CustomerAdd setLisäystila={setLisäystila} 
                 />}
                
        

                 
         {
             showCustomers && customers && customers.map(c =>  (   

                <Customer key={c.customerId} customer={c}/>
              
                ) 
              
                 )            

            
          }
      
       
    </>
           )
}

export default CustomerList