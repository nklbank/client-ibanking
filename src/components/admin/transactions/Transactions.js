import React, { useContext, useEffect } from "react";
import adminContext from "../../../context/admin/adminContext";
import {
  Select,
  DatePicker,
  Table,
  Form,
  Row,
  Spin,
  Col,
  Typography,
} from "antd";
import { useState } from "react";
import moment from "moment";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const informationDefault = {
  bankCode: "",
  dateFrom: moment(),
  dateTo: moment(),
};

const banks = [
  { title: "MP Bank", key: "mpbank" },
  {
    title: "S2QBank",
    key: "s2qbank",
  },
];
const Transactions = (props) => {
  const { Text, Link } = Typography;

  const { loading, getTransactionsBank, listTransactionsBank } = useContext(
    adminContext
  );
  const [information, setInformation] = useState(informationDefault);
  const [dataSource, setDataSource] = useState([]);

  const validateTransactionsData = (transactions) => {
    var newData = transactions;
    for (let index = 0; index < newData.length; index++) {
      const element = newData[index];
      const time = new Date(element.timestamp);
      const timeString = time.toDateString();
      newData[index] = { ...element, key: element.id, timestamp: timeString };
    }
    return newData;
  };

  const columns = [
    {
      title: "Người gửi",
      dataIndex: "depositor",
      key: "depositor",
      render: (depositor, record) => {
        console.log("depositpr", record);
        if (record.keyID) {
          return <Text>{record.depositor}</Text>;
        } else {
          return (
            <Text style={{ fontWeight: "bold" }}>{record.depositor} </Text>
          );
        }
      },
    },
    {
      title: "Người nhận",
      dataIndex: "receiver",
      key: "receiver",
      render: (receiver, record) => {
        if (record.keyID) {
          return <Text style={{ fontWeight: "bold" }}>{record.receiver} </Text>;
        } else {
          return <Text>{record.receiver}</Text>;
        }
      },
    },
    {
      title: "Số tiền (vnđ)",
      dataIndex: "amount",
      key: "amount",
      render: (receiver, record) => {
        if (record.keyID) {
          return <Text style={{ color: " green" }}>+{record.receiver} </Text>;
        } else {
          return <Text style={{ color: " red" }}>-{record.receiver}</Text>;
        }
      },
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

  useEffect(() => {
    if (listTransactionsBank) {
      setDataSource(validateTransactionsData(listTransactionsBank));
    }
  }, [listTransactionsBank]);
  const onSelectBank = (bank) => {
    setInformation({ ...information, bankCode: bank });
    console.log("onSelectBank", information);
    var data = information;
    data["dateFrom"] = data.dateFrom.format("YYYY-MM-DD HH:mm:ss");
    data["dateTo"] = data.dateTo.format("YYYY-MM-DD HH:mm:ss");
    data["bankCode"] = bank;
    getTransactionsBank(data);
  };

  const onSelectDateFrom = (date) => {
    console.log("date from", date);
    setInformation({
      ...information,
      dateFrom: date,
    });
    const data = {
      ...information,
      dateFrom: date.format("YYYY-MM-DD HH:mm:ss"),
      dateTo: information.dateTo.format("YYYY-MM-DD HH:mm:"),
    };
    getTransactionsBank(data);
  };

  const onSelectDateTo = (date) => {
    console.log("dateTo", date);
    setInformation({ ...information, dateTo: date });
    const data = {
      ...information,
      dateFrom: information.dateFrom.format("YYYY-MM-DD HH:mm:ss"),
      dateTo: date.format("YYYY-MM-DD HH:mm:ss"),
    };
    getTransactionsBank(data);
  };

  const spinner = () => {
    if (loading)
      return (
        <Row align="center">
          <Spin />;
        </Row>
      );
  };

  return (
    <div>
      <Form name="basic" initialValues={information}>
        <Row>
          <Col offset={1}>
            <Form.Item
              label="From"
              className="border-bottom border-light p-3"
              name="dateFrom"
            >
              <DatePicker
                allowClear={false}
                value={information.dateFrom}
                onChange={(value) => onSelectDateFrom(value)}
              ></DatePicker>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="To"
              className="border-bottom border-light p-3"
              name="dateTo"
            >
              <DatePicker
                allowClear={false}
                value={information.dateTo}
                onChange={(value) => onSelectDateTo(value)}
              ></DatePicker>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={15} offset={1}>
            <Form.Item
              label="Bank"
              name="bankCode"
              className="border-bottom border-light p-3"
            >
              <Select onSelect={onSelectBank} placeholder="Bank">
                <Select.Option value={"s2qbank"}> S2Q Bank</Select.Option>
                <Select.Option value={"mpbank"}> MP Bank</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Spin spinning={loading}>
        <Table dataSource={dataSource} columns={columns} />
      </Spin>
    </div>
  );
};

export default Transactions;
