import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {FaShoppingCart} from "react-icons/fa";
import Shop from "../pages/Shop";
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import { useStateValue } from "../StateProvider";



const NavBar = observer(() => {
    const [{basket}, dispatch] = useStateValue();
    let [cartOpen, setCartOpen] = useState(false)
    const {user} = useContext(Context)
    const history = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    function admin() {
        history(ADMIN_ROUTE);
    }
    function login() {
        history(LOGIN_ROUTE);
    }
    function bas(){
        history(BASKET_ROUTE)
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container className={'header'}>
                <NavLink style={{color: 'white'}} to={Shop}>DevicesForDevs</NavLink>
                {user.isAuth ? <Nav className="ml-auto" style={{color: "white"}}>
                        <FaShoppingCart onClick={() => setCartOpen(cartOpen =! cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`} />
                        <Button className={'mx-2'} onClick={() => bas()}>Buy</Button>
                        {cartOpen && (
                            <div className='shop-cart'>
                                <h1 style={{textAlign: 'center'}}>{basket?.length}</h1>
                            </div>
                        )}
                        <Button onClick={() => admin()} variant={"outline-light"}>Admin</Button>
                        <Button onClick={() => logOut()} variant={"outline-light"} className="mx-2">Log out</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => login()}>Authorization</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;