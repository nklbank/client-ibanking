
import React, { useState, useContext } from 'react';
import { Button, Modal, Form, Input, Row } from 'antd';
import { DeleteTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons';
import UserContext from '../../../context/user/userContext';

const DelDebtForm = ({ visible, onCreate, onCancel, id, permanentDel }) => {
    const [form] = Form.useForm();
    const message = permanentDel ? "Xóa nhắc nợ vĩnh viễn" : "Ẩn nhắc nợ. Nhắc nợ chỉ được xóa bởi chủ nợ"
    const icon = permanentDel ? (<DeleteTwoTone twoToneColor="red" />) : (<EyeInvisibleTwoTone twoToneColor="orange" />);


    const userContext = useContext(UserContext);
    const { delDebt } = userContext

    return (
        <Modal
            visible={visible}
            title="Xóa nhắc nợ"
            okText="Xóa nhắc nợ"
            cancelText="Hủy"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);

                        console.log('id', id);
                        delDebt(id);
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
                    label="Nội dung"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập nội dung lời nhắn',
                        },
                    ]}
                >
                    <Input placeholder="Nhập lời nhắc khi xóa nhắc nợ" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const DelDebtModal = ({ id, permanentDel }) => {
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
                Xóa
      </Button>
            <DelDebtForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                id={id}
                permanentDel={permanentDel}
            />
        </div>
    );
};

export default DelDebtModal

