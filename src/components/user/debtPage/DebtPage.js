import { Button, Space, Table, Tag, notification, message } from "antd";
import React, { useContext, useEffect, useState } from 'react';

import UserContext from '../../../context/user/userContext';
import CreateDebtModal from './create_debt_modal';
import DelDebtModal from './del_debt_modal';
import PayDebtModal from './pay_debt_modal';

var listAccount;

const columns = [
    {
        title: "Creditor",
        dataIndex: "creditor",
        key: "creditor",
        render: creditor => {
            if (listAccount.indexOf(creditor) !== -1)
                return (<b>{creditor}</b>)
            else return (<>{creditor}</>)
        }
    },
    {
        title: "Payer",
        dataIndex: "payer",
        key: "payer",
        render: payer => {
            if (listAccount.indexOf(payer) !== -1)
                return (<b>{payer}</b>)
            else return (<>{payer}</>)
        }
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
    },
    {
        title: "Status",
        dataIndex: "paid",
        key: "paid",
        render: (paid, { visibleToPayer }) => {
            console.log('visibleToPayer', visibleToPayer);
            let color = paid === 0 ? 'red' : 'green';
            let text = (paid === 0 ? 'unpaid' : 'paid');
            if (visibleToPayer === 1)
                return (<Tag color={color} key={paid}>{text.toUpperCase()}</Tag>)
            else return (<>
                <Tag color={color} key={paid}>{text.toUpperCase()}</Tag>
                <Tag>Deleted</Tag>
            </>)
        }
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Time",
        dataIndex: "timestamp",
        key: "timestamp",
    },
    {
        title: "Action",
        dataIndex: "paid",
        key: "action",
        render: (paid, { creditor, visibleToPayer, id, payer, amount, socket, owner }) => {
            console.log('socket in table', socket)
            const del_btn = (isCreditor) => (<DelDebtModal id={id} permanentDel={isCreditor} socket={socket} owner={owner} />);
            const pay_btn = (id, creditor, payer, amount) => (<PayDebtModal id={id} creditor={creditor} payer={payer} amount={amount} socket={socket} owner={owner}></PayDebtModal>)
            // nếu mình là chủ nợ
            if (listAccount.indexOf(creditor) !== -1)
                return visibleToPayer === 0 ? (<><Space>{del_btn(true)}</Space></>) : (<>{del_btn(true)}</>)
            else
                return paid === 0 ? (<><Space>{del_btn(false)}{pay_btn(id, creditor, payer, amount)}</Space></>) : (<>{del_btn(false)}</>)
        }
    }
];

const adjustedDataSource = (debts, socket, username) => {
    const { creditors, payers } = debts;
    console.log('debts', debts)
    const visible_debt = [...payers].filter(debt => debt.visibleToPayer === 1)
    const list = [...creditors, ...visible_debt].map(element => ({ ...element, socket, owner: username })).sort(function (a, b) {
        return a.id - b.id;
    });
    const timestampFormatList = list.map(element => {
        const { timestamp } = element
        const _timestamp = new Date(timestamp)
        const mins = _timestamp.getMinutes() < 10 ? `0${_timestamp.getMinutes()}` : _timestamp.getMinutes()
        var timestring = `${_timestamp.getDate()}/${_timestamp.getMonth() + 1}/${_timestamp.getFullYear()} ${_timestamp.getHours()}:${mins}`
        return { ...element, timestamp: timestring }
    })
    console.log('adjustedDataSource', list)
    console.log('timestampFormatList :>> ', timestampFormatList);
    return timestampFormatList
}

const openNotification = (message, type) => {
    const _type = type === "create" ? "info" : (type === "del" ? "warning" : "success")
    notification[_type]({
        message: 'Notification Title',
        description: JSON.stringify(message),
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

const listAccounts = (accountsOwner) =>
    accountsOwner.map(account => account.account_number)


const DebtPage = ({ socket, username }) => {
    const [dataSource, setdataSource] = useState({});
    // const [username, setusername] = useState(null)
    const [message, setmessage] = useState(null)

    const userContext = useContext(UserContext);
    const { debts, getDebts, accountsOwner, notifs } = userContext;

    listAccount = listAccounts(accountsOwner);

    console.log('socket', socket)


    useEffect(() => {
        if (message) {
            console.log('message :>>', message)

            openNotification(message, "create")
        }
    }, [message])

    if (Object.keys(dataSource).length === 0) {
        getDebts();
        console.log('debts', debts)
    }

    useEffect(() => {
        setdataSource({ ...debts })
    }, [debts, notifs]);


    console.log('dataSource', dataSource)
    if (Object.keys(dataSource).length !== 0) {
        const data = adjustedDataSource(dataSource, socket, username)
        return (<>
            <CreateDebtModal owner={username} socket={socket}></CreateDebtModal>
            <div><Table dataSource={data} columns={columns} /></div>
        </>
        )
    }
    else return (<div></div>)
}


export default DebtPage

