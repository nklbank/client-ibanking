import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Table, Button, Tag } from "antd";
import UserContext from '../../context/user/userContext';

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
        render: (paid, {visibleToPayer}) => {
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
        render: (paid, { payer }) => {
            console.log('payer', payer)
            if (paid === 0 && listAccount.indexOf(payer) !== -1)
                return (<><Button type="primary" size="small">Thanh toán</Button><Button danger size="small">Xóa</Button></>)
            else return (<Button danger size="small">Xóa</Button>)
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


const CreateDebtPage = () => {
    const [dataSource, setdataSource] = useState({});
    const userContext = useContext(UserContext);
    const { debts, getDebts, accountsOwner } = userContext;
    console.log('accountsOwner', accountsOwner)
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
        return (<div><Table dataSource={data} columns={columns} /></div>)
    }
    else return (<div></div>)
}

CreateDebtPage.propTypes = {

}

export default CreateDebtPage

