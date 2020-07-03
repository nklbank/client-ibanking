import React, { useState, useContext } from 'react'
import {
    Form,
    Input,
    message,
    Button
} from 'antd';
import UserContext from '../../context/user/userContext'
import EmployeeContext from '../../context/employee/employeeContext'

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

const AddMoney = () => {

    const userContext = useContext(UserContext);
    const employeeContext = useContext(EmployeeContext);

    const {
        // loading,
        getBeneficiry
    } = userContext;

    const { addMoney } = employeeContext;
    const [form] = Form.useForm();

    // const [search, SetSearch] = useState(false)

    const onSearch = (value) => {
        // SetSearch(true);
        getBeneficiry({ account_number: value })
        // SetSearch(false)
    }

    const onFinish = values => {
        addMoney(values)

    };


    return (
        <div >
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
                <Form.Item name='amount' label="Amount" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={employeeContext.loading}>
                        Add Money
        </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default AddMoney
