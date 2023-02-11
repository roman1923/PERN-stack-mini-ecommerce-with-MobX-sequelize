import React, {useContext, useState} from 'react';
import { Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


export const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    function push(){
        history(SHOP_ROUTE)
    }
    const click = async() => {
        try{
            let data;
            if (isLogin){
                data = await login(email, password)
            }else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            push()
        }catch (e){
            alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorization' : 'Sign up'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                    className="my-3"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                    <Form.Control
                        className="my-3"
                        placeholder="Enter your password"
                        value={password}
                        type={'password'}
                        onChange={e => setPassword(e.target.value)}/>
                    <Row className={"d-flex justify-content-between my-3 px-3"}>
                        {isLogin ?
                            <div>
                                Haven't account? <NavLink style={{color: "blue"}} to={REGISTRATION_ROUTE}>Sign up</NavLink>
                            </div>
                            :
                            <div>
                                Have account? <NavLink style={{color: "blue"}} to={LOGIN_ROUTE}>Log in</NavLink>
                            </div>
                        }
                        <Button
                            className="my-3"
                            onClick={click}
                            variant={"outline-success"}>
                            {isLogin ? 'Log in' : 'Sign up'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;