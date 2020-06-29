import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Table, Button, Tag, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons'
import UserContext from '../../../context/user/userContext';
import CreateDebtModal from './create_debt_modal';

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
        title: "Thao tác",
        dataIndex: "paid",
        key: "action",
        render: (paid, { payer, visibleToPayer }) => {
            const del_btn = (<Button danger size="small">Xóa</Button>);
            const pay_btn = (<Button type="primary" size="small">Thanh toán</Button>);
            const remind_btn = (<Button type="primary" size="small">Nhắc lại</Button>);
            if (paid === 0 && visibleToPayer === 0) return (<><Space>{del_btn}{remind_btn}</Space></>)
            if (paid === 0 && listAccount.indexOf(payer) !== -1) return (<><Space>{del_btn}{pay_btn}</Space></>)
            else return (<>{del_btn}</>)
        }
    }
];

const adjustedDataSource = (debts) => {
    const { creditors, payers } = debts;
    console.log('debts', debts)
    const visible_debt = [...payers].filter(debt => debt.visibleToPayer === 1)
    const list = [...creditors, ...visible_debt]
    console.log(creditors);
    return list
}

const listAccounts = (accountsOwner) =>
    accountsOwner.map(account => account.account_number)



const DebtPage = () => {
    const [dataSource, setdataSource] = useState({});

    const userContext = useContext(UserContext);
    const { debts, getDebts, accountsOwner } = userContext;

    listAccount = listAccounts(accountsOwner);

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
            <CreateDebtModal></CreateDebtModal>
            <div><Table dataSource={data} columns={columns} /></div>
        </>
        )
    }
    else return (<div></div>)
}

DebtPage.propTypes = {

}

export default DebtPage
