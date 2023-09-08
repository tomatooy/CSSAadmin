import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Loader from '../components/Loader';

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function JoinUsScreen() {
    const [formData, setFormData] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        fetch()
    },[])
    const nowrap = {"white-space":"nowrap"}
    return (
        <>
        {formData && 
        (<Table responsive="md" striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Major/Year</th>
                    <th>Message</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {   
                    formData.map((data,index)=>{
                    const{name, email, phone, major,year,text,date} = data
                    const formatDate = date && date.split('T')[0]
                    return (<tr index={index}>
                    <td>{name}</td>
                    <td >{email}</td>
                    <td style={nowrap}>{phone}</td>
                    <td style={nowrap}>{major} {year}</td>
                    <td >{text} </td>
                    <td style={nowrap}>{formatDate}</td>
                </tr>)
                })}
                
            </tbody>
        </Table>)
        }
        {loading && <Loader/>}
        </>
       
      
    )

    async function fetch() {
        try {
            setLoading(true)
            const response = await axios.get(`${url}/joinus/get`)
            setFormData(response.data)
        } catch (error) {
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }
}
