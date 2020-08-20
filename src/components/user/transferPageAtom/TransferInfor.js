import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Select, Steps, Button, Checkbox, message } from 'antd';
import UserContext from "../../../context/user/userContext";
// import { layout, tailLayout } from '../../layout/layoutConfig'
import VerifyOTP from './VerifyOTP'
import Formatter from '../../layout/CurrencyFormat'

const layout = {
    labelCol: {
        span: 8,
    },
    wrappercol: {
        span: 16,
    },
};
const tailLayout = {
    wrappercol: {
        offset: 8,
        span: 16,
    },
};
const { Step } = Steps;
const { Option } = Select;
let transferInfor = {}


const TransferInfor = (props) => {

    const userContext = useContext(UserContext);
    const {
        beneficiary,
        accountsOwner,
        getBeneficiry,
        transferIntraBank,
        addBeneficiary,
        transferInterBank,
        success,
        error,
    } = userContext;

    const [saveBeneficiary, setSaveBeneficiary] = useState(false)
    const [currentStep, setCurrentStep] = useState(0);


    const PayeeDetail = () => {

        const [form] = Form.useForm();

        const onSearchAccount = (e) => {
            const value = e.target.value
            getBeneficiry({ account_number: value });
        }

        const onFinish = values => {

            transferInfor = values
            setCurrentStep(1)
        };

        return (
            <Form   {...layout} form={form} name="control-hooks" onFinish={onFinish}
                initialValues={{ receiver: beneficiary.beneficiary_account, accountName: beneficiary.beneficiary_name }}
            >
                <Form.Item
                    name="partner_bank"
                    label="Tên ngân hàng"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn ngân hàng"
                        allowClear
                    >
                        <Option value="nklbank">NKL Bank</Option>
                        <Option value="mpbank">MP Bank</Option>
                        <Option value="s2qbank">P2Q Bank</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="receiver"
                    label="Số tài khoản"
                    autoFocus
                    // onBlur={onSearchAccount}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="accountName"
                    label="Tên người nhận"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="depositor"
                    label="Tài khoản"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn tài khoản"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        {accountsOwner.map(item => (
                            <Option key={item.account_number} value={item.account_number}>{item.account_number}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="Số tiền VNĐ"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="note"
                    label="Ghi chú"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button {...tailLayout} type="primary" htmlType="submit">
                        Tiếp tục
           </Button>
                </Form.Item>
            </Form>
        );
    };

    const Payment = () => {
        const onFinish = values => {
            transferInfor = { ...transferInfor, ...values }
            setCurrentStep(2)
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Form
                {...layout}
                // name="basic"
                initialValues={{ charge_include: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item>
                    <Checkbox onChange={() => setSaveBeneficiary(!saveBeneficiary)}>Save to your list</Checkbox>
                </Form.Item>
                <Form.Item
                    label="Beneficiary Name"
                    name="beneficiary"

                    rules={[{ required: saveBeneficiary, message: 'Please input your beneficiary!' }]}
                >
                    <Input disabled={!saveBeneficiary} />
                </Form.Item>

                <Form.Item name="charge_include" valuePropName="checked">
                    <Checkbox>Bạn sẽ trả phí</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button {...tailLayout} type="primary" htmlType="submit">
                        Tiếp tục
          </Button>
                </Form.Item>
            </Form>
        )
    }


    const Respond = () => (
        <div className="text-center p-5">
            <h6>Tên ngân hàng: {transferInfor.partner_bank}</h6>
            <h6>Tài khoản gửi: {transferInfor.depositor}</h6>
            <h6>Người nhận   : {transferInfor.receiver}</h6>
            <h6>Số tiền      : {Formatter.format(transferInfor.amount)}</h6>
            <h6>Ghi chú      : {transferInfor.note}</h6>
        </div>
    )

    useEffect(() => {
        setCurrentStep(0)
    }, [beneficiary])
    // const [successState,setSuccess] = useState({})
    useEffect(() => {
        // setSuccess(success);

        if (success === "Verify otp successfully") {
            console.log("transferInfor", transferInfor)
            if (transferInfor.partner_bank === "nklbank" || transferInfor.partner_bank === undefined) {
                transferIntraBank({
                    depositor: transferInfor.depositor,
                    receiver: transferInfor.receiver,
                    amount: transferInfor.amount,
                    note: transferInfor.note,
                    charge_include: transferInfor.charge_include
                })
            } else {
                console.log("transferInterBank");
                transferInterBank({
                    depositor: transferInfor.depositor,
                    receiver: transferInfor.receiver,
                    amount: transferInfor.amount,
                    note: transferInfor.note,
                    charge_include: transferInfor.charge_include,
                    partner_bank: transferInfor.partner_bank
                })
            }

            if (saveBeneficiary) {
                addBeneficiary({
                    bank: transferInfor.partner_bank,
                    beneficiary_account: transferInfor.receiver,
                    name: transferInfor.beneficiary
                })
            }
        }

        if (success === "Transfer money succeed") {
            message.success(success)
            setCurrentStep(3)
        }

    }, [success])


    useEffect(() => {
        if (error === "Account balance not enough" || error === "Transfer money fail" || error === "Transfer money less than minimun 20000" || error === "From mpbank: Account not found" || error === "Receiver account not found") {
            message.error(error)
            setCurrentStep(0)
        }
    }, [error]);



    const steps = [
        {
            title: `Người nhận`,
            content: <PayeeDetail />,
        },
        {
            title: 'Chuyển khoản',
            content: <Payment />,
        },
        {
            title: 'Xác thực',
            content: <VerifyOTP />,
        },
        {
            title: 'Phản hồi',
            content: <Respond />,
        },
    ];
    // console.log(props);

    return (
        <div>
            <div className="steps-content">{steps[currentStep].content}</div>

            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
        </div>
    )
}
export default TransferInfor