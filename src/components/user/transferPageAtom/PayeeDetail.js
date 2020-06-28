import React, { useContext, useState } from 'react'

import { Form, Input, Select, Steps, Button, message } from 'antd';

const { Option } = Select;



const PayeeDetail = () => {
    const [form] = Form.useForm();


    const onFinish = values => {
        console.log(values);
    };

    return (
        <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
                name="note"
                label="Note"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item >
                {/* <Button type="primary" htmlType="submit">
                    Submit
           </Button> */}
            </Form.Item>
        </Form>
    );
};

export default PayeeDetail