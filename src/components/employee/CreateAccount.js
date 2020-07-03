
import React, { useState, useEffect, useContext } from 'react';
import {
    Form,
    Input,
    Select,
    Button
} from 'antd';
import EmployeeContext from '../../context/employee/employeeContext'


const { Option } = Select;
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
const CreateAccount = () => {

    const employeeContext = useContext(EmployeeContext);

    const { success, error, createCustomerAccount, loading } = employeeContext;
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        createCustomerAccount(values)
    };


    return (
        <div >
            <Form
                {...layout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    // residence: ['zhejiang', 'hangzhou', 'xihu'],
                    // prefix: '86',
                }}
                scrollToFirstError
            >
                <Form.Item name='username' label="username" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='fullname' label="fullname" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Account
                     </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateAccount
