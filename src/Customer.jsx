import './App.css'
import React, {useState} from 'react'

// Props on nimeltään customer

const Customer = ({customer}) => {

    //Komponentin tilan määritys
      

const [showDetails, setShowDetails] = useState(false)

    return (
    
        <div className='custDiv'>
         <h4 
            onClick={() => setShowDetails(!showDetails)}>
            {customer.firstname} {customer.lastname}
            </h4>      

          {showDetails && <div className='customerDetails'>
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