import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Select, Steps, Button, Checkbox } from 'antd';
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
        console.log("otp", success)
        getOTP()
      }, []);
    const onFinish = values => {
        // console.log('successState:', successState);

        verifyOTP(values)


        // setCurrentStep(0)
    };

    const onFinishFailed = errorInfo => {
    };

    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Verify OTP"
                name="otp"
                rules={[{ required: true, message: 'Please input OTP!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button onClick={() => getOTP()}>Reload OTP</Button>
            </Form.Item>

            <Form.Item >
                <Button {...tailLayout} type="primary" htmlType="submit">
                    Submit
          </Button>
            </Form.Item>
        </Form>
    )
}

export default VerifyOTP