import React, { useContext, useState , useEffect} from 'react'
import { Form, Input, Select, Steps, Button, Checkbox } from 'antd';
import UserContext from "../../../context/user/userContext";

const { Step } = Steps;
const { Option } = Select;
let transferInfor = {}

const TransferInfor = (props) => {

    console.log(props)
    const userContext = useContext(UserContext);
    const {
        beneficiary,
        accountsOwner,
        getBeneficiry,
        transferIntraBank,
        addBeneficiary,
        transferInterBank,
        getOTP,
        verifyOTP,
        success,
        error,
        otpSuccess
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
            <Form form={form} name="control-hooks" onFinish={onFinish} initialValues={{ partner_bank: "nklbank", receiver: beneficiary.beneficiary_account, accountName: beneficiary.beneficiary_name }} >
                <Form.Item
                    name="partner_bank"
                    label="Bank Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select bank name"
                        allowClear
                    >
                        <Option value="nklbank">NKL Bank</Option>
                        <Option value="mpbank">MP Bank</Option>
                        <Option value="s2qbank">P2Q Bank</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="receiver"
                    label="Number"
                    autoFocus
                    onBlur={onSearchAccount}
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
                    label="Name"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="depositor"
                    label="Depositor"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select depositor"
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
                    label="Amount"
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
                    label="Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
           </Button>
                </Form.Item>
            </Form>
        );
    };

    const Payment = () => {
        const onFinish = values => {
            transferInfor = { ...transferInfor, ...values }
            console.log('Success:', transferInfor);

            setCurrentStep(2)
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Form
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
                    <Checkbox>You will pay the fee</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
          </Button>
                </Form.Item>
            </Form>
        )
    }



// const [successState,setSuccess] = useState({})
    useEffect(() => {
        // setSuccess(success);
        console.log('successState:', success);

        if(otpSuccess  === "OTP is valid"){
            console.log('successState:', otpSuccess);

            if (transferInfor.partner_bank === "NKL Bank" || transferInfor.partner_bank === undefined) {
                transferIntraBank({
                    depositor: transferInfor.depositor,
                    receiver: transferInfor.receiver,
                    amount: transferInfor.amount,
                    note: transferInfor.note,
                    charge_include: transferInfor.charge_include
                })
            } else {
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
            setCurrentStep(0)
        }
    }, [otpSuccess, success])

    console.log("otpSuccess", otpSuccess)

    const VerifyOTP = () => {

        const onFinish = values => {
            // console.log('successState:', successState);

            verifyOTP(values)


            // setCurrentStep(0)
        };

        const onFinishFailed = errorInfo => {
        };

        console.log(success)
        return (
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Verify OTP"
                    name="otp"
                    rules={[{ required: true, message: 'Please input OTP!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button onClick={() => getOTP()}>load OTP</Button>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
              </Button>
                </Form.Item>
            </Form>
        )
    }

    const steps = [
        {
            title: `Payee's detail`,
            content: <PayeeDetail />,
        },
        {
            title: 'Payment',
            content: <Payment />,
        },
        {
            title: 'Verify',
            content: <VerifyOTP />,
        },
    ];

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