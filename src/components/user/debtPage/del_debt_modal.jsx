
import React, { useState, useContext } from 'react';
import { Button, Modal, Form, Input, Row } from 'antd';
import { DeleteTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons';
import UserContext from '../../../context/user/userContext';

const DelDebtForm = ({ visible, onCreate, onCancel, id, permanentDel, socket, owner }) => {
    const [form] = Form.useForm();
    const message = permanentDel ? "Permanently delete the debt" : "Hide the debt, which is only deleted by debt creator"
    const icon = permanentDel ? (<DeleteTwoTone twoToneColor="red" />) : (<EyeInvisibleTwoTone twoToneColor="orange" />);


    const userContext = useContext(UserContext);
    const { delDebt, updateDebt, postNotif, getAccountInfo } = userContext


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

    console.log('socket in deleting :>> ', socket);
    return (
        <Modal
            visible={visible}
            title="Delete debt"
            okText="Delete debt"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);

                        console.log('id', id);

                        (async () => {
                            const affectedDebt = permanentDel ? await delDebt(id) : await updateDebt({ id, visibleToPayer: 0 });
                            const type = permanentDel ? "deldebt" : "hidedebt"
                            const { creditor, payer, amount } = affectedDebt;
                            console.log('affectedDebt :>> ', affectedDebt);

                            // "hidedebt" means payer wanted to, payer is notif sender
                            const sender = type === "hidedebt" ? payer : creditor
                            const receiver = type === "hidedebt" ? creditor : payer

                            const ret = await postNotif({ sender, receiver, type, amount })
                            const receiverInfo = await getAccountInfo({ account_number: receiver })
                            const senderInfo = await getAccountInfo({ account_number: sender })
                            console.log('receiverInfo :>> ', receiverInfo);
                            console.log('senderInfo :>> ', senderInfo);

                            const { username } = receiverInfo
                            const { beneficiary_name } = senderInfo
                            const { insertId, now } = ret
                            const message = {
                                id: insertId,
                                sender,
                                receiver,
                                type,
                                amount,
                                fullname: beneficiary_name,
                                timestamp: now,
                            }
                            console.log('message :>> ', message);
                            sendNotif(owner, username, message);
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
                <Row align="middle" style={{ marginBottom: "10px" }}>
                    {icon} {message}</Row>

                <Form.Item
                    name="deletorNote"
                    label="Note"
                    rules={[
                        {
                            required: true,
                            message: 'Enter your note',
                        },
                    ]}
                >
                    <Input placeholder="Enter your note..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const DelDebtModal = ({ id, permanentDel, socket, owner }) => {
    const [visible, setVisible] = useState(false);

    const onCreate = values => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    return (
        <div>
            <Button
                danger size="small"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Delete
      </Button>
            <DelDebtForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                id={id}
                permanentDel={permanentDel}
                socket={socket}
                owner={owner}
            />
        </div>
    );
};

export default DelDebtModal

