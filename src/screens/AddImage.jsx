import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ImageBs from 'react-bootstrap/Image';
import axios from 'axios';
import { formatUrl } from '../utils/utils';
import UploadImg from '../components/UploadImg';

const thumbnailStyle = {
    "maxWidth": "200px",
    "height": "auto",
}
const url = import.meta.env.VITE_REACT_APP_SERVER_URL;


export default function AddImage() {
    const [imageUrl, setUrl] = useState('')
    const [message, setMessage] = useState('')
    const [validation, setValidation] = useState(false)
    const [imageHeight, setImageHeight] = useState()
    const [imageWidth, setImageWidth] = useState()
    const ButtonGroup = (
        <>
            <Button onClick={handleCancel}>Cancel</Button>  <Button onClick={handleSubmit}>Submit</Button>
        </>
    )
    return (
        <>
            <h4>Add Image</h4>
            <Tabs
                defaultActiveKey="byUrl"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="byUrl" title="By URL" >

                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Input Image URL</Form.Label>
                            <Form.Control type="email" placeholder="URL" onChange={handleOnChangeUrl} value={imageUrl} disabled={validation} />
                            <br />
                            {message && <Alert >{message}</Alert>}
                            {validation && <ImageBs style={thumbnailStyle} src={formatUrl(imageUrl)} thumbnail />}
                            {validation ? ButtonGroup : <Button onClick={handleValidateUrl}>Validate URL</Button>}
                        </Form.Group>
                    </Form>

                </Tab>
                <Tab eventKey="byUpload" title="Upload">
                    <UploadImg />
                </Tab>
            </Tabs>
            <br />
            <LinkContainer to='/gallery'>
                <Button variant="secondary">Back to List</Button>
            </LinkContainer>
        </>
    )




    function handleOnChangeUrl(event) {
        setUrl(event.target.value)
        setMessage('')
    }

    async function handleSubmit(event) {
        //event.preventDefault()
        const res = await axios.post(`${url}/photo/add`, { src: imageUrl, height: imageHeight, width: imageWidth })
        const { status } = res
        if (status === 200) {
            alert("Submitted! We be in touch with you soon")
            setMessage("uploaded")
            setUrl("")
            setValidation(false)
        }
        else {
            alert("Something went wrong, Try again")
            console.log("err:" + res.data.message)
        }
    }
    function handleCancel() {
        setValidation(false)
        setMessage('')
        setImageHeight()
        setImageWidth()
    }

    async function handleValidateUrl() {
        const img = new Image();
        img.src = formatUrl(imageUrl);
        img.onload = () => {
            setMessage("Url validated")
            setValidation(true)
            setImageHeight(img.height)
            setImageWidth(img.width)

        };
        img.onerror = (err) => {
            setMessage("Please enter a valid url");
            setValidation(false)
            console.error(err);
        };

    }

}