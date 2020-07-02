import React, { useState, useContext } from "react";
import { Form, Select, Table } from "antd";
import UserContext from "../../../context/user/userContext";
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const dataSourceDefault = [];
const columnsDefault = [
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
];
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
const TransactionsPage = (props) => {
  const userContext = useContext(UserContext);
  const { transactions, accountsOwner, getTransactions } = userContext;
  const [dataSource, setDataSource] = useState(dataSourceDefault);
  const [columns, setColumns] = useState(columnsDefault);
  const [selectedAccount, setSelectedAccount] = useState();

  const onAccountSelected = (selectedAccount) => {
    console.log("finish ", selectedAccount);
    getTransactions(selectedAccount);
  };

  const onAccountFinishFailed = () => {};

  const Types = (types) => {
    console.log(types);
    return types.map((item) => (
      <Option title={item.title} value={item.key} key={item.key}>
        {" "}
        {item.title}
      </Option>
    ));
  };

  const accounts = (accounts = []) =>
    //<Option></Option>
    accounts.map((acc, i) => (
      <Option value={acc.account_number} key={i}>
        {acc.account_number}
      </Option>
    ));

  const renderListTransactions = (type) => {
    console.log("type", transactions);
    switch (type) {
      case "receiver":
        setDataSource(validateTransactionsData(transactions.receivers));
        break;
      case "transfer":
        setDataSource(validateTransactionsData(transactions.transfers));
        break;
      case "debt":
        setDataSource(validateTransactionsData(transactions.debts));
        break;
      default:
        break;
    }
  };

  const validateTransactionsData = (list) => {
    var newData = list;

    for (let index = 0; index < newData.length; index++) {
      const element = newData[index];
      const time = new Date(element.timestamp);
      const timeString = time.toDateString();
      newData[index] = { ...element, key: element.id, timestamp: timeString };
    }
    return newData;
  };
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
          name="SelectedAccount"
        >
          <Select onSelect={onAccountSelected} placeholder="Chọn tài khoản">
            {accounts(accountsOwner)}
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
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default TransactionsPage;
