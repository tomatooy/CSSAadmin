import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import OverLay from '../components/OverLay';
import { useLocation } from 'react-router-dom';

const initialData = {
    _id: '',
    coverUrl: '',
    wechatUrl: '',
    title: '',
    header: '',
    bannerShow: false,
    contentShow: true
}

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function AddPost(props) {


    const { type } = props
    const isEdit = type === 'Edit'
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get('_id')

    const [validated, setValidation] = useState(false)
    const [message, setMessage] = useState('')
    const [postData, setPostData] = useState()
    const [showPreview, setShowPreview] = useState(false)

    useEffect(() => {
        if (isEdit) {
            fetch()
        }
        else {
            setPostData(initialData)
        }
    }, [])

    return (
        <>
            <h4>{type} Post</h4>
            {postData &&
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Input Cover URL</Form.Label>
                            <Form.Control name="coverUrl" placeholder="Cover URL" onChange={(e) => handleOnChange(e)} value={postData.coverUrl} required />
                            <br />
                            <Form.Label>Input WeChat Post URL</Form.Label>
                            <Form.Control name="wechatUrl" placeholder="Wechat Post URL" onChange={(e) => handleOnChange(e)} value={postData.wechatUrl} required />
                            <br />

                            <Form.Label>Post Title</Form.Label>
                            <Form.Control name="title" placeholder="Post Title" onChange={(e) => handleOnChange(e)} value={postData.title} required />
                            <br />
                            <Form.Label>Post Header</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Post Header"
                                style={{ height: '100px' }}
                                name='header'
                                value={postData.header}
                                required
                                onChange={(e) => handleOnChange(e)}
                            />
                            <Alert show={message}>{message}</Alert>
                            <br />
                            <Button onClick={hanldePreview}  >Preview</Button>
                            &nbsp;
                            {validated && <Button type="submit">{isEdit?'Update':'Submit'}</Button>}
                        </Form.Group>

                    </Form>

                </div>
            }
           
            <LinkContainer to='/post'>
                <Button variant="secondary">Back to List</Button>
            </LinkContainer>
            {showPreview && <OverLay closeModal={(e) => handleClose(e)} data={postData} setMessage={setMessage} />}
        </>
    )

    function hanldePreview() {
        setShowPreview(true)
        setValidation(true)
    }

    function handleClose(e) {
        if (e.target.id === "modal" || e.target.id === "close")
            setShowPreview(false)
    }

    function handleOnChange(event) {
        const { name, value } = event.target
        setPostData({ ...postData, [name]: value })
        setValidation(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if(isEdit) {
            try {
                const response = await axios.patch(`${url}/post/admin/updatePost?_id=${postId}`, postData)
                .catch((error) => console.error('Error:', error));
                if (response.status === 200) {
                    setMessage("updated")
                } else {
                    setMessage("Something went wrong")
                }
            } catch (error) {
                console.log(error.message)
            }
        }else{
            try {
                const response = await axios.post(`${url}/post/add`, postData)
                if (response.status === 200) {
                    setMessage("upload")
                    setPostData(initialData)
                } else {
                    setMessage("something went wrong")
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        
    }

    async function handleUpdate() {
       
    }


    async function fetch() {
        try {
            const data = await axios.get(`${url}/post/admin/getPostData?_id=${postId}`)
            setPostData(data.data)
        } catch (error) {
            setMessage(error.message)
        }
    }
}
