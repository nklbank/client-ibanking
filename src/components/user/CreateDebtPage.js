import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Table, Button, Tag } from "antd";
import UserContext from '../../context/user/userContext';



const columns = [
    {
        title: "Chủ nợ",
        dataIndex: "creditor",
        key: "creditor",
    },
    {
        title: "Người mượn nợ",
        dataIndex: "payer",
        key: "payer",
    },
    {
        title: "Số tiền",
        dataIndex: "amount",
        key: "amount",
    },
    {
        title: "Thanh toán",
        dataIndex: "paid",
        key: "paid",
        render: paid => {
            let color = paid === 0 ? 'red' : 'green';
            let text = (paid === 0 ? 'chưa thanh toán' : 'đã thanh toán');
            return (
                <Tag color={color} key={paid}>
                    {text.toUpperCase()}
                </Tag>
            );
        }
    },
    {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Thao tác",
        key: "action",
        render: () => (
            <Button danger>XÓA</Button>
        )
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


const CreateDebtPage = () => {
    const [dataSource, setdataSource] = useState({});


    const userContext = useContext(UserContext);
    const { debts, getDebts } = userContext;
    getDebts();
    console.log('debts', debts)

    useEffect(() => {
        console.log('call useeffect')
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

