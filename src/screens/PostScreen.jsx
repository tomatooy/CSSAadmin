import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Loader from '../components/Loader';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PostRow from '../components/PostRow';

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function PostScreen() {
    const [postData, setData] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch()
    }, [])

    return (
        <div>
            <LinkContainer to='./add'>
                <Button>Add New Post</Button>
            </LinkContainer>
            <Table esponsive="md" striped bordered hover>
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Banner</th>
                        <th>Visiable</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                {postData && (
                    <>
                        <tbody>
                            {
                                postData.map((data) => {

                                    return (
                                        <PostRow data={data} />
                                    )
                                })}
                        </tbody>
                    </>
                )

                }

            </Table>
            {loading && <Loader />}
        </div>
    )

    async function fetch() {
        try {
            setLoading(true)
            const response = await axios.get(`${url}/post/admin/getAll`)
            setData(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }
}
