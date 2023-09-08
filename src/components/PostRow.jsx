import React, { useState } from 'react'
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap';

const thumbnailStyle = {
    "maxWidth": "300px",
    "height": "auto",
}
const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function PostRow(props) {

    const { coverUrl, _id, createdAt, bannerShow, title, contentShow } = props.data
    const [checkedData, setCheckData] = useState({
        bannerShow: bannerShow,
        contentShow: contentShow
    })


    const hanldeOnClickView = (_id) => {
        window.location.href = `https://ugacssa.vercel.app/post/${_id}`;
    }


    const handleOnChange = async (e) => {
        const { name, checked } = e.target
        setCheckData({
            ...checkedData,
            [name]: checked,
        })

        axios.patch(`${url}/post/admin/updateShow?_id=${_id}`, { [name]: checked })
            .catch((error) => console.error('Error:', error));


    }


    return (
        <tr>
            <td><Image src={coverUrl} style={thumbnailStyle} /></td>
            <td>{title}</td>
            <td>{createdAt}</td>
            <td><Form.Check
                type="switch"
                id="custom-switch"
                onChange={handleOnChange}
                checked={checkedData.bannerShow}
                defaultChecked={bannerShow}
                name="bannerShow"
            /></td>
            <td><Form.Check
                type="switch"
                id="custom-switch"
                onChange={handleOnChange}
                checked={checkedData.contentShow}
                defaultChecked={contentShow}
                name="contentShow"
            /></td>
            <td>
                <LinkContainer to={{
                    pathname: './edit',
                    search: `?_id=${_id}`,
                }} >
                    <Button>Edit</Button>
                </LinkContainer>
                &nbsp;
                <Button onClick={() => { hanldeOnClickView(_id) }}>View</Button></td>
        </tr>
    )




}
