import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import UserContext from '../../../context/user/userContext';

const PayDebtForm = ({ visible, onCreate, onCancel, id, creditor, payer, amount, socket, owner }) => {
  const [form] = Form.useForm();

  const userContext = useContext(UserContext);
  const { verifyOTP, transferIntraBank, updateDebt, postNotif, getAccountInfo, success, error } = userContext

  const [otp, setotp] = useState(null)
  const [OTP, setOTP] = useState({ message: null, status: null })

  useEffect(() => {
    const { message, status } = OTP
    console.log('message :>> ', message);
    console.log('status :>> ', status);
    console.log('otp :>> ', otp);
    if (error) {
      setOTP({ ...OTP, message: error.data.msg, status: "error" })
      console.log('OTP :>> ', OTP);
    }
  }, [error])


  useEffect(() => {
    const { message, status } = OTP
    console.log('message :>> ', message);
    console.log('status :>> ', status);
    if (success && success.toLowerCase().includes("otp")) {
      setOTP({ ...OTP, message: success, status: "success" })
      console.log('OTP :>> ', OTP);
    }
  }, [success])

  useEffect(() => {
    console.log('otp :>> ', otp);
    (async () => { if (otp !== null) await verifyOTP({ otp }) })()
  }, [otp])

  const sendNotif = (sender, receiver, message) => {
    console.log('socket', socket)
    console.log('sender :>> ', sender);
    console.log('receiver :>> ', receiver);
    socket.emit('sendNotif', { receiver, message: { ...message, unread: 1 } })


    return () => {
      socket.emit('disconnect')
      socket.off();
    }
  }

  return (
    <Modal
      visible={visible}
      title="Debt payment"
      okText="Pay debt"
      cancelText="Cancel"
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
              // await verifyOTP({ otp })
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
              setOTP({ ...OTP, message: null, status: null })
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
        <Form.Item name="otp" label="Enter OTP"
          validateStatus={OTP.status}
          help={OTP.message}
        >
          <Input type="textarea" onChange={(e) => {
            e.preventDefault()
            setotp(e.target.value);
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
        Pay
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