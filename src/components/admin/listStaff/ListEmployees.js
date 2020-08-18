import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  Select,
  Table,
  Space,
  Button,
  Popconfirm,
  Modal,
  Row,
  Col,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import adminContext from "../../../context/admin/adminContext";
import PersonInfo from "../personInfo/PersonInfo";
const { Option } = Select;

const defaultPersonInfo = {
  fullname: "",
  username: "",
  password: "",
  admin: 0,
  email: "",
  phone: "",
};

const ListEmployees = (props) => {
  const dataSourceDefault = {
    data: [
      {
        name: "LuuDeffault",
        username: "default",
        admin: "default",
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
      title: "Full name",
      dataIndex: "fullname",
      key: "fullname",
      width: 1500,
    },

    {
      title: "Position",
      dataIndex: "admin",
      key: "admin",
      render: (text, record) => (parseInt(text) > 0 ? "Admin" : "Employee"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small" align="baseline">
          <Popconfirm
            title="Sure you want to delete?"
            onConfirm={() => handlerDelete(record)}
          >
            <Button type="text" className="text-danger">
              <DeleteOutlined />
              Delete
            </Button>
          </Popconfirm>
          <Button
            type="text"
            className="text-info"
            onClick={() => handlerEdit(record)}
          >
            <EditOutlined />
            Edit
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

      newList[index] = { ...element, key: element.id };
      delete newList[index].password;
    }
    const count = employees.length;
    var newDataSource = { data: newList, count: count };
    console.log("newList", newList);
    return newDataSource;
  };

  const {
    getListEmployees,
    listEmployees,
    deleteEmployee,
    updateEmployee,
    loading,
    addEmployee,
  } = useContext(adminContext);

  const [dataSource, setDataSource] = useState(listEmployees);
  const [selectedPerson, setSelectedPerson] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    getListEmployees();
  }, []);

  useEffect(() => {
    if (!loading) {
      setModalVisible(false);
      setAddModalVisible(false);
    }
    setSelectedPerson({ ...selectedPerson, loading: loading });
  }, [loading]);
  useEffect(() => {
    setDataSource(validateListEmployees(listEmployees));
  }, [listEmployees]);

  const handlerDelete = (person) => {
    console.log("deleted person ", person);
    var newDS = dataSource;
    newDS.data = dataSource.data.filter((item) => item != person);

    setDataSource({ data: newDS.data, count: newDS.data.length });
    console.log("newDS", newDS);
    deleteEmployee(person.id);
  };

  const handlerEdit = (person) => {
    setSelectedPerson(person);
    setModalVisible(true);
    console.log("modal vis  ", isModalVisible);
    console.log("select person", person);
  };

  const OnSubmitEdit = (person) => {
    var newData = dataSource.data.map((data) => {
      if (data.id === person.id) return person;
      return data;
    });
    console.log("onSubmitEdit", { ...dataSource, data: newData });
    setDataSource({ ...dataSource, data: newData });
    var personSubmit = { ...person };
    delete personSubmit.key;
    updateEmployee(personSubmit);
    console.log("edit person ", person);
  };

  const OnSubmitAdd = (person) => {
    console.log("ADD person ", person);

    (async () => {
      const { error } = await addEmployee(person);
      if (!error) {
        await getListEmployees();
      }
    })();
  };

  const renderAddWindow = () => {
    return (
      <Modal
        title="Add personnel"
        visible={isAddModalVisible}
        footer={null}
        onCancel={() => setAddModalVisible(false)}
      >
        <PersonInfo
          loading={loading}
          person={defaultPersonInfo}
          onConfirm={OnSubmitAdd}
          newPerson={true}
        />{" "}
      </Modal>
    );
  };

  const renderEditWindow = () => {
    console.log("select person", selectedPerson);
    if (selectedPerson) {
      return (
        <Modal
          title="Information"
          visible={isModalVisible}
          footer={null}
          onCancel={() => setModalVisible(false)}
        >
          <PersonInfo
            loading={loading}
            person={selectedPerson}
            onConfirm={OnSubmitEdit}
          />{" "}
        </Modal>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div>
      {renderEditWindow()}
      {renderAddWindow()}
      <Row justify="end" gutter={[16, 24]}>
        <Col offset={12}>
          <Button type="primary" onClick={() => setAddModalVisible(true)}>
            <UserAddOutlined /> Add personnel
          </Button>
        </Col>
      </Row>

      <Table dataSource={dataSource.data} columns={columnsDefault}></Table>
    </div>
  );
};

export default ListEmployees;
