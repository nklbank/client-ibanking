
import React, { useEffect, useContext } from 'react'
import UserContext from '../../context/user/userContext'
import AlertContext from '../../context/alert/alertContext';
import Formatter from '../layout/CurrencyFormat'

// const accountsOwner = []
const UserAccount = (props) => {
    const userContext = useContext(UserContext)
    const alertContext = useContext(AlertContext);

    const { accountsOwner } = userContext;
    const { setAlert, alerts } = alertContext;

    // useEffect(() => {
    //     getAccounts();
    // }, [])
    // useEffect(() => {
    //     console.log(alerts)
    // }, [alerts, ])

    const accountsInfor = (accountsOwner = []) => (
        accountsOwner.map((acc, i) =>
            <div key={i} className="container ml-5">
                <div><b>So tai khoan   :</b>  {acc.account_number}</div>
                <div><b>So du hien tai :</b> {Formatter.format(acc.account_balance)} VND</div>
                <div><b>Loai tai khoan :</b> {acc.type === 1 ? <span>Thanh toan</span> : <span>Tiet kiem</span>}</div>
                <br />
            </div>
        )
    )

    return (
        <div >
            <hr />
            <div className="mt-5">
                {accountsInfor(accountsOwner)}
            </div>

        </div>
    )
}

export default UserAccount
