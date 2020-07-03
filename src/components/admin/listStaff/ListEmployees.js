import React, { useState, useContext, useEffect } from "react";
import { Form, Select, Table, Space, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import adminContext from "../../../context/admin/adminContext";
const { Option } = Select;
const dataSourceDefault = [
  {
    name: "LuuDeffault",
    username: "default",
    position: "default",
    email: "default",
    phone: "default",
    key: "key",
  },
];
const columnsDefault = [
  { title: "ID", dataIndex: "id", key: "key" },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Chức vụ",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Thao tác",
    key: "action",
    render: (text, record) => (
      <Space size="small" align="baseline">
        <Button
          type="text"
          className="text-danger"
          onClick={() => handlerDelete(record)}
        >
          Xóa
          <DeleteOutlined />
        </Button>

        <Button
          type="text"
          className="text-info"
          onClick={() => handlerEdit(record)}
        >
          Sửa
          <EditOutlined />
        </Button>
      </Space>
    ),
  },
];
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const handlerDelete = (person) => {
  console.log("deleted person ", person);
};
const handlerEdit = (person) => {
  console.log("edit person ", person);
};
const validateListEmployees = (employees) => {
  var newList = employees;
  console.log("emplyee", employees);
  for (let index = 0; index < employees.length; index++) {
    const element = employees[index];
    newList[index] = { ...element, key: element.id };
  }
  console.log("newList", newList);
  return newList;
};
const ListEmployees = (props) => {
  const { getListEmployees, listEmployees } = useContext(adminContext);
  const [dataSource, setDataSource] = useState(listEmployees);
  useEffect(() => {
    (async () => {
      await getListEmployees();
      setDataSource(validateListEmployees(listEmployees));
    })();
  }, [dataSource]);
  return (
    <div>
      <Table dataSource={dataSource} columns={columnsDefault}></Table>
    </div>
  );
};

export default ListEmployees;
