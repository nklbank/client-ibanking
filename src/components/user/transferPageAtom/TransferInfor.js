import React, { useContext, useState } from 'react'
import { Form, Input, Select, Steps, Button, Checkbox } from 'antd';
import UserContext from "../../../context/user/userContext";

const { Step } = Steps;
const { Option } = Select;
let transferInfor = {}

const TransferInfor = () => {

    const userContext = useContext(UserContext);
    const {
        beneficiaries,
        beneficiary,
        accountsOwner,
        getBeneficiry,
        transferIntraBank
    } = userContext;

    const PayeeDetail = () => {

        const [form] = Form.useForm();

        const onSearchAccount = (e) => {
            const value = e.target.value


            getBeneficiry({ account_number: value });

            if (beneficiary) {
                //   setBeneficiaryAcc(beneficiary);
                console.log(beneficiary)
            }

            console.log(e.target);

        }

        const onFinish = values => {
            // if (values.bank === "NKL Bank") {
            //     // console.log(values)

            // } else {

            // }
            transferInfor = values
            console.log(transferInfor)
            setCurrentStep(1)
        };

        return (
            <Form form={form} name="control-hooks" onFinish={onFinish} initialValues={{ partner_bank: "NKL Bank", receiver: beneficiary.beneficiary_account, accountName: beneficiary.beneficiary_name }} >
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
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="nklbank">NKL Bank</Option>
                        <Option value="mpbank">MP Bank</Option>
                        <Option value="s2qbank">P2Q Bank</Option>
                    </Select>
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
                    name="receiver"
                    label="Number"
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
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input disabled />
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
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {/* <Form.Item
                    label="Beneficiary Name"
                    name="beneficiary"
                // rules={[{ required: true, message: 'Please input your beneficiary!' }]}
                >
                    <Input />
                </Form.Item> */}

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


    const VerifyOTP = () => {

        const onFinish = values => {
            console.log('Success:', transferInfor);

            transferIntraBank({
                depositor: transferInfor.depositor,
                receiver: transferInfor.receiver,
                amount: transferInfor.amount,
                note: transferInfor.note,
                charge_include: transferInfor.charge_include
            })


            setCurrentStep(0)
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Verify OTP"
                    name="verify"
                    rules={[{ required: true, message: 'Please input OTP!' }]}
                >
                    <Input />
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


    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div>
            <div className="steps-content">{steps[currentStep].content}</div>

            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            {/* <div className="steps-action">
                {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={Next}>
                        Next
                    </Button>
                        )}
                        {currentStep === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Done
                    </Button>
                        )}
                        {currentStep > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => setCurrentStep(currentStep - 1)}>
                                Previous
                    </Button>
                )}
            </div> */}
        </div>
    )
    // }
}
export default TransferInfor