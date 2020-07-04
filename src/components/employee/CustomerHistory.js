import React, { useState, useEffect, useContext } from 'react'
import EmployeeContext from '../../context/employee/employeeContext'
import UserContext from '../../context/user/userContext'
import { Form, Input, Button, Select, message } from 'antd';
import Formatter from '../layout/CurrencyFormat'

const { Option } = Select;
const { Search } = Input;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const table = (data) => <table className="table">
    <thead>
        <tr>
            <th scope="col">STT</th>
            <th scope="col">depositor</th>
            <th scope="col">receiver</th>
            <th scope="col">amount</th>
            <th scope="col">Bank</th>
            <th scope="col">Description</th>
            <th scope="col">Charge</th>
            <th scope="col">Time</th>

        </tr>
    </thead>
    <tbody>
        {data.map((item, key) =>
            <tr key={key}>
                <th scope="row" key={key}>{key + 1}</th>
                <td>{item.depositor}</td>
                <td>{item.receiver}</td>
                <td>{Formatter.format(item.amount)}</td>
                <td>{item.partner_bank}</td>
                <td>{item.note}</td>
                <td>{item.charge_include == 1 ? item.depositor : item.receiver}</td>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
        )}

    </tbody>
</table>

const customerInfor = (beneficiary) => (
    beneficiary.beneficiary_account && <div className="card mb-5 text-center ">
        <img style={{ height: '200px' }} src="https://i.ytimg.com/vi/gx5nVJCG4ng/maxresdefault.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
            <p className="card-text"><b >To:</b> {beneficiary.beneficiary_account}</p>
            <h6 className="card-title">Account Name: {beneficiary.beneficiary_name}</h6>
            <p className="card-text"><small className="text-muted">please enter amount</small></p>
        </div>
    </div>
)


const CustomerHistory = () => {
    const userContext = useContext(UserContext);
    const employeeContext = useContext(EmployeeContext);

    const {
        // loading,
        getBeneficiry,
        beneficiary,
        refresh
    } = userContext;

    const { success, depositHistory,
        transferHistory,
        debtHistory,
        debtList,
        transferList,
        depositList,
        error,
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
        refresh()
    }, [])

    useEffect(() => {
        if (success === "get transfer successfully") {
            setData(transferList)
        }
        else if (success === "get deposit successfully")
            setData(depositList)
        else if (success === "get debt successfully")
            setData(debtList)

        else if (error === "get history error, please check your connection or input")
            message.error(error)
        else if (userContext.error === "get beneficiary error, please check the connection or input")
            message.error(userContext.error)

    }, [success, error, userContext.error])


    const onSearch = (value) => {
        getBeneficiry({ account_number: value })
    }


    return (
        <div>
            {beneficiary && customerInfor(beneficiary)}

            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name='receiver' label="Receiver" rules={[{ required: true }]}>
                    {/* <Input suffix="" /> */}
                    <Search placeholder="input search loading default" onSearch={onSearch} loading={userContext.loading} />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    // onSelect={onFinish}
                    // loading={loading}
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
