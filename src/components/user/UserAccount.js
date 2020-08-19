
import React, { useEffect, useContext } from 'react'
import UserContext from '../../context/user/userContext'
import AlertContext from '../../context/alert/alertContext';
import Formatter from '../layout/CurrencyFormat'
import {
    IdcardOutlined, MoneyCollectOutlined, OneToOneOutlined
} from "@ant-design/icons";
// const accountsOwner = []
const UserAccount = (props) => {
    const userContext = useContext(UserContext)
    const alertContext = useContext(AlertContext);

    const { accountsOwner } = userContext;
    const { setAlert, alerts } = alertContext;

    const accountsInfor = (accountsOwner = []) => (
        accountsOwner.map((acc, i) =>
            <div key={i} className="container ml-5">
                <div><b><IdcardOutlined className="mr-3" />Số tài khoản   :</b>  {acc.account_number}</div>
                <div><b><MoneyCollectOutlined className="mr-3" />Số dư hiện tại :</b> {Formatter.format(acc.account_balance)} VND</div>
                <div><b><OneToOneOutlined className="mr-3" />Loại tài khoản :</b> {acc.type === 1 ? <span>Thanh toan</span> : <span>Tiet kiem</span>}</div>
                <br />
                <hr />
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
