import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerServices from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

// Propsi otettu vastaan suoran nimellä
const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {
    
    //console.log("CustomerList component is rendering");
    //Komponentin tilan määritys      
    const [customers, setCustomers] = useState([])
    const [showCustomers, setShowCustomers] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
    const [search, setSearch] = useState("")

    useEffect( () => {
        //console.log("useEffect is running")
        /*const token = localStorage.getItem('token')
        CustomerServices
            .setToken(token)*/

        CustomerServices.getAll()
        .then(data => {
            setCustomers(data);
        })
        .catch(error => {
            setMessage(error);
            setIsPositive(false);
            setShowMessage(true);
        });        
    },[lisäystila, reload, muokkaustila]); 
    //console.log("CustomerList");
    //Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        setShowCustomers(true)
        setSearch(event.target.value.toLowerCase())
    }

    const editCustomer = (customer) => {
        setMuokattavaCustomer(customer)
        setMuokkaustila(true)
    
    }

    return (
        <div>
            <h1>
                <nobr style={{cursor:'pointer'}}onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>   
                {!lisäystila && 
                    <button 
                        className="nappi" 
                        onClick={() => setLisäystila(true)}
                    >Add new</button>
                }
            </h1>
            {!lisäystila && !muokkaustila &&
                <input 
                    placeholder="Search by firstname" 
                    value={search} 
                    onChange={handleSearchInputChange} 
                />
            }
            {lisäystila && 
                <CustomerAdd 
                    setLisäystila={setLisäystila} 
                    setIsPositive={setIsPositive} 
                    setMessage={setMessage} 
                    setShowMessage={setShowMessage}
                />
            }        
            {muokkaustila && 
                <CustomerEdit 
                    setMuokkaustila={setMuokkaustila} 
                    setIsPositive={setIsPositive} 
                    setMessage={setMessage} 
                    setShowMessage={setShowMessage}
                    muokattavaCustomer={muokattavaCustomer}
                />
            }    
            {!lisäystila && !muokkaustila && showCustomers && customers && 
                customers.map(c => {
                    const lowerCaseName = c.firstname.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(                    
                            <Customer 
                                key={c.customerId} 
                                customer={c} 
                                reloadNow={reloadNow} 
                                reload={reload}
                                setIsPositive={setIsPositive} 
                                setMessage={setMessage} 
                                setShowMessage={setShowMessage}
                                editCustomer={editCustomer}
                            />                
                        ) 
                    }
                })                                                
            }             
        </div>
    )
}

export default CustomerList