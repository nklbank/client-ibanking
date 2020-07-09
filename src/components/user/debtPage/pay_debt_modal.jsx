import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import UserContext from '../../../context/user/userContext';

const PayDebtForm = ({ visible, onCreate, onCancel, id, creditor, payer, amount }) => {
  const [form] = Form.useForm();

  const userContext = useContext(UserContext);
  const { verifyOTP, transferIntraBank, updateDebt, error } = userContext

  const [otp, setotp] = useState(null)
  const [messageOTP, setmessageOTP] = useState("OTP không hợp lệ")
  const [statusOTP, setstatusOTP] = useState(null)

  useEffect(() => {
    if (error) {
      setmessageOTP("OTP không hợp lệ")
      setstatusOTP("error")
    } else {
      setmessageOTP("OTP hợp lệ")
      setstatusOTP("success")
    }
  }, [error])

  return (
    <Modal
      visible={visible}
      title="Xác nhận thanh toán nợ"
      okText="Thanh toán"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);

            console.log(id, creditor, payer, amount, otp);

            verifyOTP({ otp });
            transferIntraBank({ depositor: payer, receiver: creditor, amount, pay_debt: id })
            updateDebt({ id, paid: 1 })

            setotp(null)
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item name="otp" label="Xác nhận OTP"
          validateStatus={statusOTP}
          help={messageOTP}
        >
          <Input type="textarea" onChange={(e) => {
            setotp(e.target.value);
            verifyOTP({ otp: e.target.value });
          }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const PayDebtModal = ({ id, creditor, payer, amount }) => {
  const [visible, setVisible] = useState(false);

  const userContext = useContext(UserContext);
  const { getOTP } = userContext

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          setVisible(true);
          getOTP()
        }}
      >
        Thanh toán
      </Button>
      <PayDebtForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        id={id} creditor={creditor} payer={payer} amount={amount}
      />
    </div>
  );
};

export default PayDebtModal;