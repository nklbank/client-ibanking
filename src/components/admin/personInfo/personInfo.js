import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import adminContext from "../../../context/admin/adminContext";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 15,
    span: 16,
  },
};
const dateFormat = "YYYY/MM/DD";
const formatNumber = (value) => {
  value += "";
  const list = value.split(".");
  const prefix = list[0].charAt(0) === "-" ? "-" : "";
  let num = prefix ? list[0].slice(1) : list[0];
  let result = "";
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
};

const PersonInfo = (props) => {
  const [person, setPerson] = useState(props.person);
  const { loading } = useContext(adminContext);
  useEffect(() => {});
  const formatPhoneNumber = (str) => {
    console.log(str);
    //Filter only numbers from the input
    let cleaned = ("" + str).replace(/\D/g, "");

    setPerson({ ...person, phone: cleaned });
    return cleaned;
  };
  const isPassword = () => {
    if (props.newPerson) {
      return (
        <Form.Item label="Password">
          <Input.Password
            onChange={(e) => {
              return setPerson({ ...person, password: e.target.value });
            }}
          />
        </Form.Item>
      );
    }
    return (
      <Form.Item label="Password">
        <Input.Password disabled />
      </Form.Item>
    );
  };
  return (
    <div>
      <Form {...layout}>
        <Form.Item label="Họ tên">
          <Input
            value={person.fullname}
            onChange={(e) => {
              console.log(e.target.value);
              return setPerson({ ...person, fullname: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Tên đăng nhập">
          <Input
            defaultValue={person.username}
            onChange={(e) => setPerson({ ...person, username: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Chức vụ">
          <Select
            value={person.admin}
            onSelect={(value) => {
              console.log(value);

              setPerson({ ...person, admin: value });
            }}
          >
            <Select.Option value={1}>Admin</Select.Option>
            <Select.Option value={0}>Employee</Select.Option>
          </Select>
        </Form.Item>
        {/* <Form.Item label="Ngày sinh">
          <DatePicker format={dateFormat} />
        </Form.Item> */}
        {isPassword()}
        <Form.Item label="Email">
          <Input defaultValue={person.email} />
        </Form.Item>
        <Form.Item label="Điện thoại">
          <Input
            value={person.phone}
            onChange={(value) => {
              setPerson({
                ...person,
                phone: formatPhoneNumber(value.target.value),
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            className="offset-8"
            type="primary"
            onClick={(e) => props.onConfirm(person)}
          >
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonInfo;
