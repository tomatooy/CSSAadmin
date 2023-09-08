import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Loader from '../components/Loader';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {formatUrl} from '../utils/utils'

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function GalleryScreen() {
    const [galleryData, setGalleryData] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch()
    }, [])
    const thumbnailStyle = {
        "maxWidth": "200px",
        "height": "auto",
    }
    return (
        <>
            {galleryData &&
                (<>
                    <LinkContainer to='./add'>
                        <Button>Add New Image</Button>
                    </LinkContainer>

                    <Table responsive="md" striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>thumb nail</th>
                                <th>URL</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                galleryData.map((data, index) => {
                                    const { src, _id } = data
                                    return (
                                        <tr>
                                            <td>{index}</td>
                                            <td><Image src={formatUrl(src)} style={thumbnailStyle} /></td>
                                            <td style={{"maxWidth":"40vw","overflow": "hidden"}}>{src}</td>
                                            <td><Button variant="danger" onClick={() => handleDelete(_id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </Table>
                </>
                )
            }
            {loading && <Loader />}
        </>
    )
    async function handleDelete(_id) {
        let result = window.confirm("Do you want to confirm this action?");

        if (result) {
            try {
                const response = await axios.delete(`${url}/photo/delete?_id=${_id}`)
                if (response.status === 204) fetch()
            } catch (error) {
                console.log(error)
            }
        } else {
            // User clicked "Cancel" button or closed the dialog
            alert("You canceled the action.");
        }
    }

    async function fetch() {
        try {
            setLoading(true)
            const response = await axios.get(`${url}/photo/get`)
            setGalleryData(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    

}
