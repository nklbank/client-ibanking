import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Form, Modal, Select, Descriptions } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import UserContext from '../../../context/user/userContext';

// import io from 'socket.io-client'
// let socket;
// const { proxy } = require('../../../../package.json');

const { Option } = Select;

const CreateDebtForm = ({ visible, onCreate, onCancel, owner, socket }) => {
    const [form] = Form.useForm();
    const [creditor, setcreditor] = useState(null)
    const [amount, setamount] = useState(0)
    const [description, setdescription] = useState(null)

    const [payer, setpayer] = useState(null)

    const userContext = useContext(UserContext);
    const { addDebt, accountsOwner, beneficiaries, debts, getAccountInfo, postNotif } = userContext
    console.log('beneficiaries :>> ', beneficiaries);
    const creditorAccounts = accountsOwner.map(account => account.account_number);
    const intraBeneficiaries = beneficiaries.filter(account => account.partner_bank === null)

    const enterPayer = async (value) => {
        console.log('...value', value)
        const payerInfo = value.length !== 0 ? await getAccountInfo({ account_number: value }) : null;
        console.log('payerInfo', payerInfo);
        if (payerInfo) {
            setpayer({ ...payerInfo })
            console.log('payer :>> ', payer);
        }
    }

    const sendNotif = (sender, receiver, message) => {
        console.log('socket', socket)
        console.log('sender :>> ', sender);
        console.log('receiver :>> ', receiver);
        socket.emit('sendNotif', { receiver, message: { ...message, unread: 1 } })

        // socket.emit('sendNotif', { receiver, message })

        return () => {
            socket.emit('disconnect')
            socket.off();
        }
    }

    return (
        <Modal
            visible={visible}
            title="Tạo nhắc nợ"
            okText="Tạo nhắc nợ"
            cancelText="Hủy"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();


                        onCreate(values);
                        const { beneficiary_account, username } = payer;

                        console.log('_payer :>> ', beneficiary_account);
                        const newDebt = { creditor, payer: beneficiary_account, amount, description };
                        console.log('newDebt :>> ', newDebt);
                        addDebt(newDebt)
                        console.log('debts :>> ', debts);

                        // reset all state
                        setamount(null);
                        setcreditor(null);
                        setpayer(null);
                        setdescription(null);

                        (async () => {
                            const ret = await postNotif({
                                sender: creditor, receiver: payer.beneficiary_account[0], type: "createdebt", amount, description
                            })
                            console.log('creditorAccounts[0] :>> ', creditorAccounts[0]);
                            const accountInfo = await getAccountInfo({ account_number: creditorAccounts[0] })
                            const { beneficiary_name } = accountInfo
                            console.log('ret :>> ', ret);
                            const { insertId, now } = ret
                            console.log('insertId :>> ', insertId);
                            console.log('beneficiary_name :>> ', beneficiary_name);
                            const message = {
                                id: insertId,
                                sender: creditor,
                                receiver: payer.beneficiary_account[0],
                                type: "createdebt",
                                amount,
                                fullname: beneficiary_name,
                                timestamp: now,
                                description
                            }
                            console.log('owner :>> ', owner);
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
                <Form.Item
                    name="creditor"
                    label="Tài khoản chủ nợ"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select onChange={(value) => { setcreditor(value) }}>
                        {creditorAccounts.map(account => (<Option value={account}>{account}</Option>))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="payer"
                    label="Tài khoản mượn nợ"
                >
                    <Select mode="tags" onChange={(value) => { enterPayer(value) }} tokenSeparators={[',']}>
                        {intraBeneficiaries.map(account => (<Option value={account.beneficiary_account}>{account.beneficiary_account}</Option>))}
                    </Select>
                    {/* <Descriptions visible={payerName !== null}><Descriptions.Item>{payerName}</Descriptions.Item></Descriptions> */}

                    {payer !== null ?
                        <Descriptions><Descriptions.Item>{payer.beneficiary_name}</Descriptions.Item></Descriptions>
                        : null}

                </Form.Item>
                <Form.Item name="amount" label="Số tiền"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập số tiền nợ',
                        },
                    ]}>
                    <Input type="textarea" onChange={(e) => { setamount(e.target.value) }} />
                </Form.Item>
                <Form.Item name="description" label="Nội dung">
                    <Input type="textarea" onChange={(e) => { setdescription(e.target.value) }} />
                </Form.Item>
            </Form>
        </Modal >
    );
};

const CreateDebtModal = ({ owner, socket }) => {
    const [visible, setVisible] = useState(false);

    const onCreate = values => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                <PlusOutlined />Tạo nhắc nợ
        </Button>
            <CreateDebtForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                owner={owner}
                socket={socket}
            />
        </div>
    );
};

CreateDebtModal.propTypes = {
}

export default CreateDebtModal