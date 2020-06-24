import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import UserContext from "../../context/user/userContext";

const ChangePasswordPage = () => {
  const userContext = useContext(UserContext);

  const { changePassword } = userContext;
  const onFinish = (values) => {
    console.log("Success:", values);
    changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    // this.setState({
    //     ...values,
    // });

    // const { onChangePassword } = this.props;

    // if (onChangePassword) {
    //     onChangePassword({
    //         oldpassword: this.state.password,
    //         newpassword: this.state.newPassword,
    //     });
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="m-5 p-5 border shadow p-3 mb-5 bg-white rounded">
      <Form
        // {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Password"
          name="oldPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
