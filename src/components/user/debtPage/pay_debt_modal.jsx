import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import UserContext from '../../../context/user/userContext';

const PayDebtForm = ({ visible, onCreate, onCancel, id, creditor, payer, amount, socket, owner }) => {
  const [form] = Form.useForm();

  const userContext = useContext(UserContext);
  const { verifyOTP, transferIntraBank, updateDebt, error, postNotif, getAccountInfo } = userContext

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

  const sendNotif = (sender, receiver, message) => {
    console.log('socket', socket)
    console.log('sender :>> ', sender);
    console.log('receiver :>> ', receiver);
    socket.emit('sendNotif', { receiver, message })

    return () => {
      socket.emit('disconnect')
      socket.off();
    }
  }

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
            const transaction = { depositor: payer, receiver: creditor, amount, pay_debt: id };

            (async () => {
              verifyOTP({ otp });
              // verifyOTP(otp);
              await transferIntraBank(transaction)
              const affectedDebt = await updateDebt({ id, paid: 1 })

              const { creditor, payer, amount } = affectedDebt;
              console.log('affectedDebt :>> ', affectedDebt);

              const notif = {
                sender: payer,
                receiver: creditor,
                type: "paydebt",
                amount
              }

              const ret = await postNotif(notif)
              const receiverInfo = await getAccountInfo({ account_number: notif.receiver })
              const senderInfo = await getAccountInfo({ account_number: notif.sender })
              console.log('receiverInfo :>> ', receiverInfo);
              console.log('senderInfo :>> ', senderInfo);

              const { username } = receiverInfo
              const { beneficiary_name } = senderInfo
              const { insertId, now } = ret
              const message = {
                ...notif,
                id: insertId,
                fullname: beneficiary_name,
                timestamp: now,
              }
              console.log('message :>> ', message);
              sendNotif(owner, username, message);
              setotp(null)
            }
            )()
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

const PayDebtModal = ({ id, creditor, payer, amount, socket, owner }) => {
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
        socket={socket} owner={owner}
      />
    </div>
  );
};

export default PayDebtModal;