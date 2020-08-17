import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Recaptcha from "react-recaptcha";
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 5 },
};
const PersonnelLogin = (props) => {
  const alertContext = useContext(AlertContext);

  const authContext = useContext(AuthContext);

  const [verified, setVerified] = useState(false);
  const {
    user,
    personnelLogin,
    error,
    clearErrors,
    isAuthenticated,
  } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    if (!verified) {
      alert("you have to verify");
    }
    else {
      await personnelLogin({
        ...values,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onloadCallbackCaptcha = () => {
    // console.log("onloadCallbackCaptcha")
  };

  const verifyCallback = (respond) => {
    if (respond) {
      setVerified(true);
    }
  };

  return (
    <Form
      style={{ marginTop: 300 }}
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
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        width="10%"
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
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
  );
};

export default PersonnelLogin;
