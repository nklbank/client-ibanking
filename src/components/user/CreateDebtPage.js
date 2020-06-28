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

// const adjustedDataSource = (debts) => {
//     const { creditors, payers } = debts;
//     console.log('debts', debts)
//     const visible_debt = [...payers].filter(debt => debt.visibleToPayer === 1)
//     const list = [...creditors, ...visible_debt]
//     console.log(creditors);
//     return list
// }


const CreateDebtPage = () => {
    const userContext = useContext(UserContext);
    const { debts, getDebts } = userContext

    const [dataSource, setdataSource] = useState(debts)

    useEffect(() => {
        async function onLoads() {
            await getDebts().then((result) => {
                console.log('debts', debts)
                setdataSource(debts);
            }).catch((err) => {
                return err
            });;

        }
        onLoads();
    })


    console.log('dataSource', dataSource)
    return dataSource ? (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    ) : (<div></div>)
}

CreateDebtPage.propTypes = {

}

export default CreateDebtPage

