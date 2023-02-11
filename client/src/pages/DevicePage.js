import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import bigStar from '../assets/star.jpg'
import Button from "react-bootstrap/Button";
import {useParams} from 'react-router-dom';
import {fetchOneDevice} from "../http/deviceAPI";
import { useStateValue } from '../StateProvider';


export const DevicePage = ({title, price, rating}) => {
    const [{basket}, dispatch] = useStateValue();
    console.log(basket);
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                title: device.name,
                price: device.price,
                rating: device.rating,
            },
        });
    };
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    const description = [
        {id:1, title: 'RAM', description: '32 gb'},
        {id:2, title: 'Camera', description: '52 MP'},
        {id:3, title: 'Processor', description: 'Ryzen 7'},
        {id:4, title: 'Cores', description: '8'},
        {id:5, title: 'Accumulator', description: '4000'},
    ]

    return (
        <Container className={'mt-3'}>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                    <Row className={'d-flex flex-column align-items-center'}>
                       <h2>{device.name}</h2>
                        <div
                        className={'d-flex align-items-center justify-content-center'}
                        style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', color: "white", fontSize: 64}}>
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className={"d-flex flex-column align-items-center justify-content-around"}
                    style={{width: 380, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
                        <h3>From: {device.price} $</h3>
                        <Button onClick={addToBasket} variant={"outline-dark"}>Add to cart</Button>
                    </Card>
                </Col>
            </Row>
            <Row className={'d-flex flex-column m-3'}>
                <h1>Characteristics</h1>
                {description.map((info, index)  =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;