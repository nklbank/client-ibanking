
import React, { useEffect, useContext } from 'react'
import NavBar from '../layout/NavBar';
import UserContext from '../../context/user/userContext'
import AlertContext from '../../context/alert/alertContext';
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

    console.log(success)
    return (
        <div>
            {error && message.error("something wrong")}
            {success && message.success(success)}

            <NavBar />
        </div>


    )
}

export default Home