import React, { useState, useContext } from "react";
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import AuthContext from "../../context/auth/authContext";

import Register from "../auth/Register";
import UserAccount from "../user/UserAccount";
import BeneficiaryInforPage from "../user/BeneficiaryInforPage";
import ChangePasswordPage from "../user/ChangePasswordPage";
import TransferPage from "../user/TransferPage";
import TransactionsPage from "../user/transactionsPage/TransactionsPage";
import { useEffect } from "react";
import DebtPage from "../user/debtPage/DebtPage";
import ListEmployees from "../admin/listStaff/ListEmployees";

const comp = {
  admin0: {
    title: "Danh sách nhân viên",
    content: <ListEmployees />,
  },
  admin1: {
    title: "Thông tin",
    content: "Thông tin",
  },
  admin2: {
    title: "Lịch sử giao dịch",
    content: "Lịch sử giao dịch",
  },
  admin3: {
    title: "change password",
    content: <ChangePasswordPage />,
  },
};
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
    <Menu
      defaultSelectedKeys={["0"]}
      defaultOpenKeys={["sub1", "sub2", "sub3"]}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      onClick={handleClick}
    >
      <Menu.Item key="admin0" icon={<PieChartOutlined />}>
        Danh sách nhân viên
      </Menu.Item>
      <Menu.Item key="admin1" icon={<DesktopOutlined />}>
        Thông tin
      </Menu.Item>
      <Menu.Item key="admin2" icon={<ContainerOutlined />}>
        Lịch sử giao dịch
      </Menu.Item>
      <Menu.Item key="admin3">Đổi mật khẩu</Menu.Item>
      <Menu.Item onClick={onLogout}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default NavBarAdmin;
