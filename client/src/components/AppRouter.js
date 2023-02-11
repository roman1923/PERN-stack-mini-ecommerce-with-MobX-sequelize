import React, {useContext, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
//import {authRoutes, publicRoutes} from "../routes"
import {Context} from "../index";
import { Shop } from '../pages/Shop'
import { Admin } from '../pages/Admin'
import { Auth } from '../pages/Auth'
import { Basket } from '../pages/Basket'
import { DevicePage } from '../pages/DevicePage'
import { Error } from '../pages/Error'
import Registration from "../pages/Registration";


const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            <Route path='/' element={<Shop/>} />
            {user.isAuth === true && <Route path='/admin' element={<Admin/>} />}
            {user.isAuth === true && <Route path='/basket' element={<Basket/>} />}
            <Route path='/login' element={<Auth/>} />
            <Route path='/registration' element={<Registration/>} />
            <Route path='/device/:id' element={<DevicePage/>} />
            <Route path='*' element={<Error />}/>
        </Routes>
    );
};

export default AppRouter;

//{authRoutes.map(({path, Component}) =>
//                 <Route key={path} path={path} component={Component} exact />
//             ) && isAuth === true}
//             {publicRoutes.map(({path, Component}) =>
//                 <Route key={path} path={path} component={Component} exact />
//             ) && true}
//That's was old ver for react-router-dom ver less than 6,
// also it needs router and utils/consts