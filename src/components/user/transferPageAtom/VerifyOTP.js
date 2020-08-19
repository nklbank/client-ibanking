import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Select, Steps, Button, message } from 'antd';
import UserContext from "../../../context/user/userContext";
// import { layout, tailLayout } from '../../layout/layoutConfig'

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
const { Step } = Steps;
const { Option } = Select;
let transferInfor = {}


const VerifyOTP = () => {
    const userContext = useContext(UserContext);
    const {

        getOTP,
        verifyOTP,
        success,
        error,
    } = userContext;

    useEffect(() => {
        getOTP()
    }, []);

    useEffect(() => {
        if (error === "send otp failed" || error === "verify otp failed") {
            message.error(error)
        }
    }, [error]);

    useEffect(() => {
        if (success === "Send otp successfully. Check your email") {
            message.success(success)
        }
    }, [success]);
    const onFinish = values => {

        verifyOTP(values)

    };

    const onFinishFailed = errorInfo => {
    };

    return (
        <Form
            {...layout}
            name="Xác thực OTP"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Xác thực OTP"
                name="otp"
                rules={[{ required: true, message: 'Nhập OTP!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button onClick={() => getOTP()}>Reload OTP</Button>
            </Form.Item>

            <Form.Item >
                <Button {...tailLayout} type="primary" htmlType="submit">
                    Hoàn thành
          </Button>
            </Form.Item>
        </Form>
    )
}

export default VerifyOTP