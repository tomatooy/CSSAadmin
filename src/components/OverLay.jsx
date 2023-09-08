import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import styles from './Styles.module.css'


const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function OverLay(props) {
    
    const{closeModal,setMessage} = props
    const [embeddedContent, setEmbeddedContent] = useState()
    const [loading, setLoading] = useState(true)
    const {
        coverUrl,
        wechatUrl,
        title,
        header
    } = props.data

    

    useEffect(() => {
        wechatUrl && fetch()
    }, [wechatUrl])


    return (
        <div className={styles.modal} onClick={(e)=>closeModal(e)} id="modal">
            <div className={styles.modalContent}>
                <div className={styles.close} onClick={(e)=>closeModal(e)} id="close" >&times;</div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={coverUrl} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {header}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div>
                    {loading ? <p>Loading...</p> : null}
                    {embeddedContent && <div dangerouslySetInnerHTML={{ __html: embeddedContent }} />}
                </div>
            </div>
        </div>
    )

    async function fetch() {
        //const url1 = process.env.REACT_APP_SERVER_URL

        try {
            setLoading(true)
            setEmbeddedContent("")
            const response = await axios.get(`${url}/post/admin/postPreview?wechatUrl=${wechatUrl}`);
            setEmbeddedContent(response.data);
        } catch (error) {
            setMessage("Please enter valid url");
            console.error('Error fetching embedded content:', error);
        } finally {
            setLoading(false)
        }
    }
}
