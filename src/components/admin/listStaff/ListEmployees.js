import React, { useState, useContext, useEffect } from "react";
import { Form, Select, Table, Space, Button, Popconfirm, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import adminContext from "../../../context/admin/adminContext";
const { Option } = Select;

const ListEmployees = (props) => {
  const dataSourceDefault = {
    data: [
      {
        name: "LuuDeffault",
        username: "default",
        position: "default",
        email: "default",
        phone: "default",
        key: "key",
      },
    ],
    count: 1,
  };
  const columnsDefault = [
    { title: "ID", dataIndex: "id", key: "key" },
    {
      title: "Tên",
      dataIndex: "fullname",
      key: "fullname",
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
          <Popconfirm
            title="Bạn có chắc muốn xóa nhân viên này"
            onConfirm={() => handlerDelete(record)}
            okText="Xóa"
            cancelText="Bỏ qua"
          >
            <Button type="text" className="text-danger">
              Xóa
              <DeleteOutlined />
            </Button>
          </Popconfirm>
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

  const validateListEmployees = (employees) => {
    var newList = employees;
    console.log("emplyee", employees);
    for (let index = 0; index < employees.length; index++) {
      const element = employees[index];
      const position = element.admin > 0 ? "Admin" : "Employee";

      newList[index] = { ...element, key: element.id, position: position };
    }
    const count = employees.length;
    var newDataSource = { data: newList, count: count };
    console.log("newList", newList);
    return newDataSource;
  };

  const { getListEmployees, listEmployees, deleteEmployee } = useContext(
    adminContext
  );

  const [dataSource, setDataSource] = useState(listEmployees);
  const [selectedPerson, setSelectedPerson] = useState();
  const [isModalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    getListEmployees();
  }, []);

  useEffect(() => {
    setDataSource(validateListEmployees(listEmployees));
  }, [listEmployees]);

  const handlerDelete = (person) => {
    console.log("deleted person ", person);
    var newDS = dataSource;
    newDS.data = dataSource.data.filter((item) => item != person);

    setDataSource({ data: newDS.data, count: newDS.data.length });
    console.log("newDS", newDS);
    //deleteEmployee(person.id);
  };

  const handlerEdit = (person) => {
    setSelectedPerson(person);
    console.log("edit person ", person);
  };

  const renderEditWindow = () => {
    return <Modal title="Chỉnh sửa thông tin" visible={isModalVisible}></Modal>;
  };
  return (
    <div>
      {renderEditWindow()}
      <Table dataSource={dataSource.data} columns={columnsDefault}></Table>
    </div>
  );
};

export default ListEmployees;
