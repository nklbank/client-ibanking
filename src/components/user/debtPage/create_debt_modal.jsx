import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Form, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'


const CreateDebtForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
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
                    name="payer"
                    label="Tài khoản mượn nợ"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập tài khoản mượn nợ',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="amount" label="Số tiền"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập số tiền nợ',
                        },
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
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

