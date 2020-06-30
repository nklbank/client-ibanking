
import React, { useState, useEffect, useContext } from 'react';
import {
    Form,
    Input,
    Select,
    Button
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const { Option } = Select;

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

const Register = (props) => {
    // const alertContext = useContext(AlertContext);
    // const authContext = useContext(AuthContext);

    // const { setAlert } = alertContext;
    // const { error, clearErrors, isAuthenticated } = authContext;

    // useEffect(() => {
    //     console.log(props)
    //     if (isAuthenticated) {
    //         props.history.push('/');
    //     }

    //     if (error === 'User already exists') {
    //         setAlert(error, 'danger');
    //         clearErrors();
    //     }
    //     // eslint-disable-next-line
    // }, [error, isAuthenticated, props.history]);

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
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
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
                        Register
        </Button>
                </Form.Item>
            </Form>
        </div>
    );
};


export default Register

