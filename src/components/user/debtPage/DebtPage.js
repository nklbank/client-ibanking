import { Button, Space, Table, Tag, notification, message } from "antd";
import React, { useContext, useEffect, useState } from 'react';

import UserContext from '../../../context/user/userContext';
import CreateDebtModal from './create_debt_modal';
import DelDebtModal from './del_debt_modal';
import PayDebtModal from './pay_debt_modal';
// import { openNotification } from './notification'

import io from 'socket.io-client'
const { proxy } = require('../../../../package.json');

let socket
var listAccount;

const columns = [
    {
        title: "Chủ nợ",
        dataIndex: "creditor",
        key: "creditor",
        render: creditor => {
            if (listAccount.indexOf(creditor) !== -1)
                return (<b>{creditor}</b>)
            else return (<>{creditor}</>)
        }
    },
    {
        title: "Người mượn nợ",
        dataIndex: "payer",
        key: "payer",
        render: payer => {
            if (listAccount.indexOf(payer) !== -1)
                return (<b>{payer}</b>)
            else return (<>{payer}</>)
        }
    },
    {
        title: "Số tiền",
        dataIndex: "amount",
        key: "amount",
    },
    {
        title: "Tình trạng",
        dataIndex: "paid",
        key: "paid",
        render: (paid, { visibleToPayer }) => {
            console.log('visibleToPayer', visibleToPayer);
            let color = paid === 0 ? 'red' : 'green';
            let text = (paid === 0 ? 'chưa thanh' : 'đã thanh');
            if (visibleToPayer === 1)
                return (<Tag color={color} key={paid}>{text.toUpperCase()}</Tag>)
            else return (<>
                <Tag color={color} key={paid}>{text.toUpperCase()}</Tag>
                <Tag>Xóa</Tag>
            </>)
        }
    },
    {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Thời gian",
        dataIndex: "timestamp",
        key: "timestamp",
    },
    {
        title: "Thao tác",
        dataIndex: "paid",
        key: "action",
        render: (paid, { creditor, visibleToPayer, id, payer, amount }) => {
            const del_btn = (isCreditor) => (<DelDebtModal id={id} permanentDel={isCreditor} />);


            // const del_btn = (<Button danger size="small">Xóa</Button>);
            // const pay_btn = (<Button type="primary" size="small">Thanh toán</Button>);
            const pay_btn = (id, creditor, payer, amount) => (<PayDebtModal id={id} creditor={creditor} payer={payer} amount={amount}></PayDebtModal>)
            const remind_btn = (<Button type="primary" size="small">Nhắc lại</Button>);
            // if (paid === 0 && visibleToPayer === 0) return (<><Space>{del_btn}{remind_btn}</Space></>)
            // if (paid === 0 && listAccount.indexOf(payer) !== -1) return (<><Space>{del_btn}{pay_btn}</Space></>)
            // else return (<>{del_btn}</>)
            // nếu mình là chủ nợ
            if (listAccount.indexOf(creditor) !== -1)
                return visibleToPayer === 0 ? (<><Space>{del_btn(true)}{remind_btn}</Space></>) : (<>{del_btn(true)}</>)
            else
                return paid === 0 ? (<><Space>{del_btn(false)}{pay_btn(id, creditor, payer, amount)}</Space></>) : (<>{del_btn(false)}</>)
        }
    }
];

const adjustedDataSource = (debts) => {
    const { creditors, payers } = debts;
    console.log('debts', debts)
    const visible_debt = [...payers].filter(debt => debt.visibleToPayer === 1)
    const list = [...creditors, ...visible_debt].sort(function (a, b) {
        return a.id - b.id;
    });
    console.log('adjustedDataSource', list)
    return list
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


const DebtPage = () => {
    const [dataSource, setdataSource] = useState({});
    const [username, setusername] = useState(null)
    const [message, setmessage] = useState(null)

    const userContext = useContext(UserContext);
    const { debts, getDebts, accountsOwner, getCustomerInfo } = userContext;

    listAccount = listAccounts(accountsOwner);
    // const customerUsername = (async () => { const res = await getCustomerInfo(); const { username } = res; setusername(username) })();
    // customerUsername();

    (async () => { const res = await getCustomerInfo(); const { username } = res[0]; setusername(username) })();


    useEffect(() => {
        if (username) {
            socket = io(proxy)
            console.log('socket', socket)
            console.log('username', username)

            socket.emit('join', { username }, (error) => console.log('error', error))

            socket.on('getNotif', ({ message }) => {
                setmessage({ ...message })
                console.log('message', message)
            })
        }
    }, [username])

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
    }, [debts]);


    console.log('dataSource', dataSource)
    if (Object.keys(dataSource).length !== 0) {
        const data = adjustedDataSource(dataSource)
        return (<>
            <CreateDebtModal owner={username} socket={socket}></CreateDebtModal>
            <div><Table dataSource={data} columns={columns} /></div>
        </>
        )
    }
    else return (<div></div>)
}


export default DebtPage

