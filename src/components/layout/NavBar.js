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
// import { useEffect } from "react";
import DebtPage from "../user/debtPage/DebtPage";
import ListEmployees from "../admin/listStaff/ListEmployees";
import socket from "socket.io-client/lib/socket";

const { SubMenu } = Menu;
const comp = (socket, username) => {
  return {
    0: {
      title: "Danh sach tai khoan",
      content: <UserAccount />,
    },
    1: {
      title: "Thong tin",
      content: <BeneficiaryInforPage />,
    },
    2: {
      title: "Lịch sử giao dịch",
      content: <TransactionsPage />,
    },
    3: {
      title: "Chuyển tiền",
      content: <TransferPage />,
    },
    4: {
      title: "Ngân hàng khác",
      content: "<TransferInterBankPage />",
    },
    5: {
      title: "Danh sách nợ",
      content: <DebtPage socket={socket} username={username} />,
    },
    6: {
      content: "Danh sách người nhận",
      content: "danh sách người nhận",
    },
    7: {
      title: "change password",
      content: <ChangePasswordPage />,
    },
    8: {
      title: "change password",
      content: "Lịch sử giao dịch",
    }
  }
};

const NavBar = ({ socket, username }) => {
  const authContext = useContext(AuthContext);

  const { logout, user } = authContext;
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("0");
  // const toggleCollapsed = () => {
  //     setCollapsed(!collapsed)
  // };

  console.log('socket', socket)
  const onLogout = () => {
    logout();
    localStorage.removeItem("token");
  };

  const handleClick = (e) => {
    setKey(e.key);
  };
  return (
    <div className="row">
      <div className="col-2" style={{ backgroundColor: '#001529' }}>
        <Menu
          defaultSelectedKeys={["0"]}
          defaultOpenKeys={["sub1", "sub2", "sub3"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          onClick={handleClick}
        >
          <Menu.Item key="0" icon={<PieChartOutlined />}>
            Danh sách tài khoản
          </Menu.Item>

          <Menu.Item key="1" icon={<DesktopOutlined />}>
            Danh sách người nhận
          </Menu.Item>

          <Menu.Item key="2" icon={<ContainerOutlined />}>
            Lịch sử giao dịch
          </Menu.Item>

          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Chuyển tiền
          </Menu.Item>

          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Danh sách">
            <Menu.Item key="5">Danh sách nợ</Menu.Item>
            <Menu.Item key="6">Danh sách người nhận</Menu.Item>

            {/* <SubMenu key="sub3" title="Tài khoản">
              <Menu.Item key="7">Đổi mật khẩu</Menu.Item>

            </SubMenu> */}
          </SubMenu>

          <Menu.Item key="7" icon={<ContainerOutlined />}>
            Đổi mật khẩu
          </Menu.Item>

        </Menu>
      </div>
      <div className="col-8 offset-1 p-5 shadow bg-white rounded border ">
        {" "}
        <h2> {comp(socket, username)[key].title}</h2>
        {/* {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.success && <span className="text-success">SUCCESS: {users.success}</span>} */}
        {comp(socket, username)[key].content}
      </div>
    </div>
  );
};

export default NavBar;
