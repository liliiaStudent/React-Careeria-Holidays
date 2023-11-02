import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer'

// Props on nimeltään customer

const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    //Komponentin tilan määritys
      

const [showDetails, setShowDetails] = useState(false)

const deleteCustomer =(customer) => {
    let vastaus = window.confirm(`Remove Customer ${customer.firstname} ${customer.lastname}`)

    if (vastaus === true) { 
    CustomerService.remove(customer.customerId)
    .then(res => {
        if (res.status === 200) {
            setMessage(`Successfully removed customer ${customer.firstname} ${customer.lastaname}`)
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
    
        <div className='custDiv'>
         <h4 
            onClick={() => setShowDetails(!showDetails)}>
            {customer.firstname} {customer.lastname}
            </h4>      

          {showDetails && <div className='customerDetails'>
            <h3> {customer.firstname} {customer.lastname}</h3>
            <button className="nappi" onClick={() => deleteCustomer(customer)}>Delete</button>
            <button className="nappi" onClick={() => editCustomer(customer)} >Edit</button>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Postal Code</th>
                    </tr>
                </thead>
                <tbody>
                        
                        <td>{customer.email}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.country}</td>
                        <td>{customer.postalCode}</td>
                </tbody>
            </table></div> }  
            
            
                 
       
        </div>  
     )
    } 

export default Customer