import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Form, Modal, Select, Descriptions } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import UserContext from '../../../context/user/userContext';

const { Option } = Select;

const CreateDebtForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [payer, setpayer] = useState(null)
    const [creditor, setcreditor] = useState(null)
    const [amount, setamount] = useState(0)
    const [description, setdescription] = useState(null)
    const [payerName, setpayerName] = useState(null)

    const userContext = useContext(UserContext);
    const { addDebt, accountsOwner, beneficiaries, debts, getAccountInfo } = userContext
    console.log('beneficiaries :>> ', beneficiaries);
    const creditorAccounts = accountsOwner.map(account => account.account_number);
    const intraBeneficiaries = beneficiaries.filter(account => account.partner_bank === null)

    const enterPayer = async (value) => {
        console.log('...value', value)
        const payerInfo = value.length !== 0 ? await getAccountInfo({ account_number: value }) : null;
        console.log('payerInfo', payerInfo);
        if (payerInfo) {
            setpayer(value)
            setpayerName(payerInfo.beneficiary_name)
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
                        const _payer = payer[0];
                        const newDebt = { creditor, payer: _payer, amount, description };
                        console.log('newDebt :>> ', newDebt);
                        addDebt(newDebt)
                        console.log('debts :>> ', debts);

                        // reset all state
                        setamount(null);
                        setcreditor(null);
                        setpayer(null);
                        setdescription(null);
                        setpayerName("")
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
                    <Descriptions visible={payerName !== null}><Descriptions.Item>{payerName}</Descriptions.Item></Descriptions>
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

const CreateDebtModal = () => {
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
            />
        </div>
    );
};

CreateDebtModal.propTypes = {
}

export default CreateDebtModal

