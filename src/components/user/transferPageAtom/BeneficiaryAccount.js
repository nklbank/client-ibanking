import React, { useContext, useState } from "react";

import {
  Collapse,
  Form,
  AutoComplete,
  Input,
  Button,
  Select,
  Checkbox,
} from "antd";
import { UserOutlined, CaretRightOutlined } from "@ant-design/icons";

import UserContext from "../../../context/user/userContext";

const { Panel } = Collapse;

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const accountInfo = (info = {}) => (
  <div>
    <p>
      <b>Beneficiary's Name:</b> {info.beneficiary_name}
    </p>
    <p>
      <b>Account Number : </b>
      {info.beneficiary_account}
    </p>
  </div>
);

const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
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
    options: values.map(
      (value, i) =>
        value.partner_bank === null &&
        renderItem(value.beneficiary_account, value.beneficiary_name)
    ),
  },
];

const accounts = (account = []) =>
  account.map((acc, i) => (
    <Option value={acc.account_number} key={i}>
      {acc.account_number}
    </Option>
  ));

const BeneficiaryAccount = () => {
  const userContext = useContext(UserContext);

  const {
    beneficiaries,
    beneficiary,
    accountsOwner,
    getBeneficiry,
  } = userContext;

  const [collapse, setCollapse] = useState(true);
  const [beneficiaryAcc, setBeneficiaryAcc] = useState({});
  const [accountBeneficiary, setAccountBeneficiary] = useState({});
  const [isSaveBeneficiary, setIsSaveBeneficiary] = useState(false);
  const [savebleBeneficiary, setSavebleBeneficiary] = useState(false);

  const searchInfor = (value) => {
    console.log(value);
    let isExist = false;
    beneficiaries.forEach((acc) => {
      if (acc.beneficiary_account === value) {
        console.log("value", isExist, value);
        isExist = true;
        return;
      }
    });
    //return here bug
    if (!isExist) {
      // const { getBeneficiaryAccount } = this.props
      getBeneficiry({ account_number: value });

      if (beneficiary) {
        setBeneficiaryAcc(beneficiary);
        setCollapse("1");
        setSavebleBeneficiary(true);
      }
    }
  };

  const onSelect = (value) => {
    beneficiaries.forEach((acc) => {
      if (acc.beneficiary_account === value) {
        console.log("value", acc);
        setAccountBeneficiary(acc);
        setCollapse("1");
        setSavebleBeneficiary(false);
      }
    });
    // this.props.listAccountBeneficiary.forEach(acc => {
    //     if (acc.beneficiary_account === value) {
    //         this.setState({
    //             accountBeneficiary: { ...acc },
    //             Collapse: "1",
    //             isDisable: true
    //         })
    //         return
    //     }
    // });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const { accountOwner, listAccountBeneficiary } = this.props
  // const { accountBeneficiary } = this.state

  // console.log(this.props);
  // const accountOwner = []
  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true, bank: "NKLBank" }}
        // onFinish={(data) => this.props.onNext({ isSaveBeneficiary: this.state.isSaveBeneficiary, ...data })}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Your account"
          className="border-bottom border-light p-3"
          name="depositor"
          rules={[
            {
              required: true,
              message: "Please choose your account!",
            },
          ]}
        >
          <Select autoFocus placeholder="Select your account">
            {accounts(accountsOwner)}
          </Select>
        </Form.Item>
        <Form.Item
          label="Beneficiary"
          className="border-bottom border-light p-3"
          name="receiver"
          rules={[
            {
              required: true,
              message: "Please choose beneficiary!",
            },
          ]}
        >
          <AutoComplete
            dropdownClassName="certain-category-search-dropdown"
            options={options(beneficiaries)}
            onSelect={onSelect}
          >
            <Input.Search
              size="large"
              placeholder="input here"
              onSearch={(value) => console.log(value)}
            />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          label="Save Beneficiary"
          className="border-bottom border-light pl-3"
        >
          <Checkbox
            disabled={!savebleBeneficiary}
            onChange={() => setIsSaveBeneficiary(!isSaveBeneficiary)}
          >
            {" "}
          </Checkbox>
        </Form.Item>
        <Collapse
          activeKey={[collapse]}
          bordered={true}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse bg-light mb-4"
        >
          <Panel
            header="Beneficiary's Information"
            key="1"
            className="site-collapse-custom-panel"
          >
            {accountInfo(accountBeneficiary)}
          </Panel>
        </Collapse>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>

      {/* --------------------------- */}
    </div>
  );
};

export default BeneficiaryAccount;

//end
//---------------------------------------------------//

// class Beneficiary extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isSaveBeneficiary: false,
//             isDisable: true,
//             Collapse: 0,
//             accountBeneficiary: {}
//         }
//     }

//     render() {
//         // const onFinish = values => {
//         //     console.log(this.props.value);
//         //     const transferAccountInfo = {
//         //         ...values
//         //     }

//         //     localStorage.setItem("transferAccountInfo", JSON.stringify(transferAccountInfo));
//         // };

//     }
// }

// const mapStateToProps = (state) => {
//     const users = state.users
//     return {
//         accountOwner: users.accountOwner,
//         accountBeneficiary: users.accountBeneficiary,
//         listAccountBeneficiary: users.accountBeneficiarys,
//         // addError: users.addError,
//         users: state.users

//     };
// }

// const mapDispatchToProps = (dispatch) => ({
//     // getAccount: () => dispatch(userActions.getAccount()),
//     getBeneficiaryAccount: (accNumber) => dispatch(userActions.getBeneficiaryAccount(accNumber)),
//     // getListBeneficiaryAccount: () => dispatch(userActions.getBeneficiaryAccounts()),
//     // addBeneficiary: (beneficiaryInfo) => dispatch(userActions.addBeneficiary(beneficiaryInfo)),
// });
