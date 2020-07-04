import React, { useState, useContext, useEffect } from 'react'
import {
    Form,
    Input,
    message,
    Button,
    Modal
} from 'antd';
import UserContext from '../../context/user/userContext'
import EmployeeContext from '../../context/employee/employeeContext'
import Formatter from '../layout/CurrencyFormat'
const { Search } = Input;
const layout = {
    labelCol: {
        span: 8,
    },
    wrappercol: {
        span: 16,
    },
};
const tailLayout = {
    wrappercol: {
        offset: 8,
        span: 16,
    },
};

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

const AddMoney = () => {

    const userContext = useContext(UserContext);
    const employeeContext = useContext(EmployeeContext);

    const {
        getBeneficiry,
        beneficiary,
        refresh
    } = userContext;


    const {
        error
    } = employeeContext;


    useEffect(() => {
        refresh()
    }, [])

    useEffect(() => {
        if (error === "add money error, please check your connection or input")
            message.error(error)
        if (userContext.error === "get beneficiary error, please check the connection or input")
            message.error(userContext.error)
    }, [error, userContext.error])

    const addMoneySuccess = (addmoneyInfor, beneficiary) => {
        return (<Modal
            title="Add money successfully"
            visible={isShow}
            onOk={() => setIsShow(false)}
            onCancel={() => setIsShow(false)}
        >
            <div className="text-center">
                <div> <b>Account Number :</b> {addmoneyInfor.account_number}</div>
                <div> <b>Account Name   :</b> {beneficiary.beneficiary_name}</div>
                <div> <b>Account Balance:</b> {Formatter.format(addmoneyInfor.account_balance)}</div>
            </div>
        </Modal>)
    }

    const { addMoney, addmoneyInfor } = employeeContext;
    const [isShow, setIsShow] = useState(true)
    const [form] = Form.useForm();


    const onSearch = (value) => {
        getBeneficiry({ account_number: value })
    }

    const onFinish = values => {
        addMoney(values)

    };


    return (
        <div >
            {addmoneyInfor && addMoneySuccess(addmoneyInfor, beneficiary)}
            {beneficiary && customerInfor(beneficiary)}
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
                initialValues={{

                }}
                scrollToFirstError
            >
                {/* {employeeContext.success && message.success(employeeContext.success)} */}
                <Form.Item name='receiver' label="Receiver" rules={[{ required: true }]}>
                    {/* <Input suffix="" /> */}
                    <Search placeholder="input search loading default" onSearch={onSearch} loading={userContext.loading} />
                </Form.Item>
                <Form.Item name='amount' label="Amount" rules={[{ required: true }]} >
                    <Input suffix="VNĐ" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={employeeContext.loading} disabled={!beneficiary.beneficiary_account}>
                        Add Money
        </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default AddMoney
