import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import ImageBs from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const thumbnailStyle = {
    "maxWidth": "200px",
    "height": "auto",
}
const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function UploadImg() {
    const [message, setMessage] = useState()
    const [imageData, setImage] = useState()
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file"
                        onChange={hanldeOnChange}
                    />
                </Form.Group>
                {message && <Alert>{message}</Alert>}
                {imageData && <ImageBs style={thumbnailStyle} src={imageData.src} thumbnail />}
                <br />
                {imageData && <Button type='submit'>Submit</Button>}
            </Form>
        </div>
    )
    function handleSubmit(e) {
        e.preventDefault()
        axios.post(`${url}/photo/add`, imageData)
            .then((res) => {
                if(res.status === 200){
                    setMessage('Uploaded')
                    setImage()
                }
            }).catch(err => {
                console.log(err.message)
                setMessage('Upload fail, try again')
            })
    }
    function hanldeOnChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    setMessage()
                    const src = img.src
                    const width = img.width;
                    const height = img.height;
                    setImage({ width, height, src });
                };

                img.onerror = () => {
                    setImage()
                    setMessage('read image error, check file')
                };
            };

            reader.readAsDataURL(file);

        }
        else {
            setMessage('read file error')
        }

    }
}
