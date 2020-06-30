import React, { Component } from "react";
import { Table, Form, Select } from "antd";

import { connect } from "react-redux";
import { userActions } from "../../../_actions";

const { Option } = Select;
const types = [
  { title: "Chuyển tiền", key: "transfer" },
  {
    title: "Nhận tiền",
    key: "receiver",
  },
  {
    title: "Trả nợ",
    key: "debt",
  },
];
const layout = {
  labelCol: { span: 5 },
  wrappercol: { span: 16 },
};
class TransactionsTransferPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      columns: [
        {
          title: "Tài khoản gửi",
          dataIndex: "depositor",
          key: "depositor",
        },
        {
          title: "Người nhận",
          dataIndex: "receiver",
          key: "receiver",
        },
        {
          title: "Số tiền",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Thời gian",
          dataIndex: "timestamp",
          key: "timestamp",
        },
        {
          title: "Ghi chú",
          dataIndex: "note",
          key: "note",
        },
      ],
    };
  }

  componentDidMount() {
    const { getTransactions, getAccount } = this.props;
    //   getAccount();
  }

  render() {
    const onAccountSelected = (selectedAccount) => {
      console.log("finish ", selectedAccount);
      this.setState({
        ...this.state,
        selectedAccount: selectedAccount,
      });
      this.props.getTransactions(selectedAccount);
      this.setState({
        ...this.state,
      });

      console.log("dataSource", this.state.dataSource);
    };

    const onAccountFinishFailed = () => { };

    const renderListTransactions = (type) => {
      console.log("type", type);
      switch (type) {
        case "receiver":
          this.setState({
            ...this.state,
            dataSource: this.props.listTransactions.receivers,
          });
          console.log("datasrc", this.state.dataSource);
          break;
        case "transfer":
          this.setState({
            ...this.state,
            dataSource: this.props.listTransactions.transfers,
          });
          break;
        default:
          break;
      }
    };
    const onTypeSelect = (type) => { };
    console.log(this.props.listTransactions);
    console.log("TRANSSSSSS", this.props.users);
    return (
      <div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinishFailed={onAccountFinishFailed}
        >
          <Form.Item
            label="Tài khoản"
            className="border-bottom border-light p-3"
            name="SelectedAccont"
          >
            <Select onSelect={onAccountSelected} placeholder="Chọn tài khoản">
              {accounts(this.props.listAccounts)}
            </Select>
          </Form.Item>
          <Form.Item
            label="Loại giao dịch"
            className="border-bottom border-light p-3"
            name="selectType"
          >
            <Select onSelect={renderListTransactions} placeholder="Chọn">
              {Types(types)}
            </Select>
          </Form.Item>
        </Form>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
        />
      </div>
    );
  }
}
const accounts = (accounts = []) =>
  //<Option></Option>
  accounts.map((acc, i) => (
    <Option value={acc.account_number} key={i}>
      {acc.account_number}
    </Option>
  ));
const Types = (types) => {
  console.log(types);
  return types.map((item) => (
    <Option title={item.title} value={item.key} key={item.key}>
      {" "}
      {item.title}
    </Option>
  ));
};
const mapStateToProps = (state) => {
  var listTransactions = state.users.listTransactions;
  if (listTransactions) {
    console.log("list trans", listTransactions);
    for (let index = 0; index < listTransactions.length; index++) {
      const element = listTransactions[index];
      listTransactions[index] = { ...element, key: element.id };
    }
    if (listTransactions.transfers) {
      for (let index = 0; index < listTransactions.transfers.length; index++) {
        const element = listTransactions.transfers[index];
        const time = new Date(element.timestamp);
        const timeString = time.toDateString();
        console.log("time", timeString, time, element.timestamp);
        listTransactions.transfers[index] = {
          ...element,
          timestamp: timeString,
        };
      }
    }
    if (listTransactions.receivers) {
      for (let index = 0; index < listTransactions.receivers.length; index++) {
        const element = listTransactions.receivers[index];
        const time = new Date(element.timestamp);
        const timeString = time.toDateString();
        console.log("time", timeString, time, element.timestamp);
        listTransactions.receivers[index] = {
          ...element,
          timestamp: timeString,
        };
      }
    }
  }
  return {
    listTransactions: listTransactions,

    listAccounts: state.users.accountOwner,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getTransactions: (account_number) =>
    dispatch(userActions.getTransactions(account_number)),

  //  getAccount: () => dispatch(userActions.getAccount()),
});
const connectedTransactions = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsTransferPage);
export { connectedTransactions as TransactionsTransferPage };
