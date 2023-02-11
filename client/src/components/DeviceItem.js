import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.jpg'
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useNavigate()
    function push() {
        history(DEVICE_ROUTE + '/' + device.id);
    }
    return (
        <Col md={3} className={'my-3'} onClick={() => push()}>
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
                <div className={'text-black-50 my-1 d-flex justify-content-between align-items-center'}>
                    <div>Samsung...</div>
                    <div className={'d-flex align-items-center'}>
                        <div>{device.rating}</div>
                        <Image width={20} src={star} />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;