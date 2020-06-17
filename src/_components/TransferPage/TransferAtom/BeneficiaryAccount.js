import React, { Component } from 'react'
import { Form, AutoComplete, Input, Button, Select, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';


const { Panel } = Collapse;


const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



const accountInfo = (info = {}) => (
    <div >
        <p><b>Beneficiary's Name:</b> {info.beneficiary_name}</p>
        <p><b>Account Number    : </b>{info.beneficiary_account}</p>
    </div>
);

const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
                <UserOutlined /> {count}
            </span>
        </div>
    ),
});

const options = (values = []) => [
    {
        options: values.map((value, i) => renderItem(value.beneficiary_account, value.beneficiary_name)),
    },
];


const accounts = (account = []) => (
    account.map((acc, i) => <Option value={acc.account_number} key={i}>{acc.account_number}</Option>)
)

//end
//---------------------------------------------------//


class Beneficiary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSaveBeneficiary: true,
            isDisable: true,
            Collapse: 0,
            accountBeneficiary: {}
        }
    }

    componentDidMount() {
        // const { getAccount, getListBeneficiaryAccount } = this.props
        // getAccount();
        // getListBeneficiaryAccount();
    }

    searchInfor(value) {
        if (value === "" || value === undefined || value === null) return

        this.props.users.accountBeneficiarys.forEach(acc => {
            if (acc.beneficiary_account === value) {
                console.log(value)
                return
            }
        });
        console.log("object")
        const { getBeneficiaryAccount } = this.props
        getBeneficiaryAccount({ account_number: value });

        this.setState({
            accountBeneficiary: {
                ...this.props.accountBeneficiary
            },
            Collapse: "1",
            isDisable: false
        })
    }

    onSelect(value) {
        // const value = e.target.value
        this.props.listAccountBeneficiary.forEach(acc => {
            if (acc.beneficiary_account === value) {
                this.setState({
                    accountBeneficiary: { ...acc },
                    Collapse: "1",
                    isDisable: true
                })
                return
            }
        });
    }

    render() {
        const onFinish = values => {
            console.log('Success:', values);

            const transferAccountInfo = {
                ...values
                // depositors: ownerAccount,
                // receivers: BeneficiaryAccount
            }
            localStorage.setItem("transferAccountInfo", JSON.stringify(transferAccountInfo))
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        const { accountOwner, listAccountBeneficiary } = this.props
        const { accountBeneficiary } = this.state

        console.log(this.state.Collapse)
        return (
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true, bank: "NKLBank" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Your account" className="border-bottom border-light p-3"
                        name="depositor"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose your account!',
                            },
                        ]}>
                        <Select autoFocus
                            placeholder="Select your account"
                        >
                            {accounts(accountOwner)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Beneficiary" className="border-bottom border-light p-3"
                        name="receiver"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose beneficiary!',
                            },
                        ]}>
                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            options={options(listAccountBeneficiary)}
                            onSelect={(value) => this.onSelect(value)}

                        >
                            <Input.Search
                                size="large"
                                placeholder="input here"
                                onSearch={(value) => { this.searchInfor(value) }}
                            />
                        </AutoComplete>
                    </Form.Item>

                    <Form.Item label="choose bank" className="border-bottom border-light p-3">
                        <Select
                        //   onChange={onGenderChange}
                        // defaultValue="NKLBank"
                        >
                            <Option value="NKLBank">NKL Bank</Option>
                            <Option value="MPBank">MP Bank</Option>
                            <Option value="Q2Bank">Q2 Bank</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Save Beneficiary" className="border-bottom border-light pl-3">
                        <Checkbox disabled={this.state.isDisable} onChange={() => this.setState({ isSaveBeneficiary: !this.state.isSaveBeneficiary })} checked={this.state.isSaveBeneficiary}> </Checkbox>
                    </Form.Item>
                    <Collapse
                        activeKey={[this.state.Collapse]}
                        bordered={true}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="site-collapse-custom-collapse bg-light mb-4"
                    >
                        <Panel header="Beneficiary's Information" key="1" className="site-collapse-custom-panel">
                            {accountInfo(accountBeneficiary)}
                        </Panel>
                    </Collapse>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Access Beneficiary
                   </Button>
                    </Form.Item>
                </Form>

                {/* --------------------------- */}

            </div>
        )
    }
}


function mapStateToProps(state) {
    const users = state.users
    return {
        accountOwner: users.accountOwner,
        accountBeneficiary: users.accountBeneficiary,
        listAccountBeneficiary: users.accountBeneficiarys,
        addError: users.addError,

    };
}

const mapDispatchToProps = (dispatch) => ({
    // getAccount: () => dispatch(userActions.getAccount()),
    getBeneficiaryAccount: (accNumber) => dispatch(userActions.getBeneficiaryAccount(accNumber)),
    // getListBeneficiaryAccount: () => dispatch(userActions.getBeneficiaryAccounts()),
    // addBeneficiary: (beneficiaryInfo) => dispatch(userActions.addBeneficiary(beneficiaryInfo)),
});


const BeneficiaryAccount = connect(mapStateToProps, mapDispatchToProps)(Beneficiary);

export { BeneficiaryAccount }
