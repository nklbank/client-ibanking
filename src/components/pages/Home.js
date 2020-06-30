
import React, { useEffect, useContext } from 'react'
import NavBar from '../layout/NavBar';
import UserContext from '../../context/user/userContext'
import AlertContext from '../../context/alert/alertContext';
import Header from '../layout/Header'
import { message } from 'antd';

const Home = () => {
    const userContext = useContext(UserContext)
    const alertContext = useContext(AlertContext);

    const { setAlert, alerts } = alertContext;
    const { getBeneficiries, getAccounts, error, success } = userContext

    useEffect(() => {
        getAccounts();
        getBeneficiries();

    }, [])

    console.log(error)
    return (
        <div>
            {error && message.error(error.msg ? error.msg : error.data.msg)}
            {success && message.success(success.msg)}
            <Header />
            <NavBar />
        </div>


    )
}

export default Home