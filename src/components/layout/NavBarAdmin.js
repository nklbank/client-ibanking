import React, { useState, useContext } from "react";
import { Menu, Button } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import AuthContext from "../../context/auth/authContext";
import ChangePasswordPage from "../user/ChangePasswordPage";
import ListEmployees from "../admin/listStaff/ListEmployees";

const comp = [
  {
    title: "Danh sách nhân viên",
    content: <ListEmployees />,
  },
  {
    title: "Thông tin",
    content: "Thông tin",
  },
  {
    title: "Lịch sử giao dịch",
    content: "Lịch sử giao dịch",
  },
  {
    title: "change password",
    content: <ChangePasswordPage />,
  },
];
const NavBarAdmin = () => {
  const authContext = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("0");
  const { logout } = authContext;
  const onLogout = () => {
    logout();
    localStorage.removeItem("token");
  };

  const handleClick = (e) => {
    setKey(e.key);
  };

  return (
    <div className="row">
      <div className="col-3">
        <Menu
          defaultSelectedKeys={["0"]}
          defaultOpenKeys={["sub1", "sub2", "sub3"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          onClick={handleClick}
        >
          <Menu.Item key="0" icon={<PieChartOutlined />}>
            Danh sách nhân viên
          </Menu.Item>
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            Thông tin
          </Menu.Item>
          <Menu.Item key="2" icon={<ContainerOutlined />}>
            Lịch sử giao dịch
          </Menu.Item>
          <Menu.Item key="3">Đổi mật khẩu</Menu.Item>
          <Menu.Item onClick={onLogout}>
            <LogoutOutlined />
            Logout
          </Menu.Item>
        </Menu>
      </div>
      <div className="col-8 p-5 shadow bg-white rounded border ">
        {" "}
        <h2> {comp[key].title}</h2>
        {/* {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.success && <span className="text-success">SUCCESS: {users.success}</span>} */}
        {comp[key].content}
      </div>
    </div>
  );
};

export default NavBarAdmin;
