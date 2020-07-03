
import React, { useState, useEffect, useContext } from 'react';
import {
    Form,
    Input,
    Select,
    Button
} from 'antd';

const formItemLayout = {
    labelcol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrappercol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrappercol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const CreateAccount = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);


    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );


    return (
        <div >
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
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
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Create Account
        </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateAccount
