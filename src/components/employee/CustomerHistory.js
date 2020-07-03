import React, { useState, useEffect, useContext } from 'react'
import EmployeeContext from '../../context/employee/employeeContext'
import UserContext from '../../context/user/userContext'
import { Form, Input, Button, Select, Table } from 'antd';
import TransferList from 'antd/lib/transfer/list';

const { Option } = Select;
const { Search } = Input;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



const columns = [
    {
        title: 'depositor',
        dataIndex: 'depositor',
    },
    {
        title: 'receiver',
        dataIndex: 'receiver',
        // sorter: {
        //     compare: (a, b) => a.chinese - b.chinese,
        //     multiple: 3,
        // },
    },
    {
        title: 'amount',
        dataIndex: 'amount',
        // sorter: {
        //     compare: (a, b) => a.english - b.english,
        //     multiple: 1,
        // },
    },
    {
        title: 'Bank',
        dataIndex: 'partner_bank',
        // sorter: {
        //     compare: (a, b) => a.math - b.math,
        //     multiple: 2,
        // },
    },
    {
        title: 'Description',
        dataIndex: 'note',
        // sorter: {
        //     compare: (a, b) => a.english - b.english,
        //     multiple: 1,
        // },
    },
    {
        title: 'charge_include',
        dataIndex: 'charge_include',
        // sorter: {
        //     compare: (a, b) => a.english - b.english,
        //     multiple: 1,
        // },
    },
    {
        title: 'Time',
        dataIndex: 'timestamp',
        // sorter: {
        //     compare: (a, b) => a.english - b.english,
        //     multiple: 1,
        // },
    },


];

const table = (data) => <table className="table">
    <thead>
        <tr>
            <th scope="col">STT</th>
            <th scope="col">depositor</th>
            <th scope="col">receiver</th>
            <th scope="col">amount</th>
            <th scope="col">Bank</th>
            <th scope="col">Description</th>
            <th scope="col">charge_include</th>
            <th scope="col">Time</th>

        </tr>
    </thead>
    <tbody>
        {data.map((item, key) =>
            <tr>
                <th scope="row" key={key}>{key + 1}</th>
                <td>{item.depositor}</td>
                <td>{item.receiver}</td>
                <td>{item.amount}</td>
                <td>{item.partner_bank}</td>
                <td>{item.note}</td>
                <td>{item.charge_include}</td>
                <td>{item.timestamp}</td>
            </tr>
        )}

    </tbody>
</table>

const CustomerHistory = () => {
    const userContext = useContext(UserContext);
    const employeeContext = useContext(EmployeeContext);

    const {
        // loading,
        getBeneficiry
    } = userContext;

    const { success, error, depositHistory,
        transferHistory,
        debtHistory,
        debtList,
        transferList,
        depositList,
        loading } = employeeContext;

    const [form] = Form.useForm();

    const [data, setData] = useState([])
    const onFinish = values => {
        console.log(values);

        if (values.type === "transfer") {
            transferHistory(values.receiver)
        }
        else if (values.type === "deposit") {
            depositHistory(values.receiver)
        }
        else if (values.type === "debt") {
            debtHistory(values.receiver)
        }
    };

    useEffect(() => {
        if (success === "get transfer successfully") {
            console.log(transferList)
            setData(transferList)
        }
        else if (success === "get deposit successfully")
            setData(depositList)
        else if (success === "get debt successfully")
            setData(debtList)

    }, [success])
    const onSearch = (value) => {
        // SetSearch(true);
        getBeneficiry({ account_number: value })
        // SetSearch(false)
    }

    data && console.log(data)
    console.log(success)
    return (
        <div>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name='receiver' label="Receiver" rules={[{ required: true }]}>
                    {/* <Input suffix="" /> */}
                    <Search placeholder="input search loading default" onSearch={onSearch} loading={userContext.loading} />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="deposit">Deposit</Option>
                        <Option value="transfer">Transfer</Option>
                        <Option value="debt">Debt</Option>
                    </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
          </Button>
                </Form.Item>
            </Form>

            {data && table(data)}

        </div>
    );
}

export default CustomerHistory
