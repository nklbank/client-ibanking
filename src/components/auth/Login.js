import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Recaptcha from 'react-recaptcha'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Login = (props) => {
    const alertContext = useContext(AlertContext);

    const authContext = useContext(AuthContext);

    const { login, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    const [verified, setVerified] = useState(false)
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);


    const onFinish = values => {
        // console.log('Success:', values);
        if (!verified) {
            alert("you have to verify");
        }
        else {
            login({
                ...values
            });
        }
    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    const onloadCallbackCaptcha = () => {
        // console.log("onloadCallbackCaptcha")
    }

    const verifyCallback = (respond) => {
        if (respond) {
            setVerified(true)
        }
    }
    return (
        <div className="container border rounded shadow-lg p-3 mb-5  p-5 m-5">
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <div className="offset-5 p-3">
                    <Recaptcha
                        sitekey="6LfQCaMZAAAAAFsv9S2IZsfw2XIDXZsozSY3NV5o"
                        render="explicit"
                        onloadCallback={onloadCallbackCaptcha}
                        verifyCallback={verifyCallback}
                    />
                </div>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
</Button>
                </Form.Item>
            </Form>


        </div>
    );
};


export default Login