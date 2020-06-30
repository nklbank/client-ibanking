import React, { useState, useContext, useEffect } from "react";
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
import DebtPage from "../user/debtPage/DebtPage";
import ReceiveMoney from "../user/transferHistoryPage/ReceiveMoney"

const { SubMenu } = Menu;

const comp = {
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
    content: <DebtPage />,
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
    title: "Lich su giao dich",
    content: <ReceiveMoney />,
  },
  admin0: {
    title: "Danh sách nhân viên",
    content: "Danh sách nhân viên",
  },
  admin1: {
    title: "Thông tin",
    content: "Thông tin",
  },
  admin2: {
    title: "Lịch sử giao dịch",
    content: "abc",
  },
  admin3: {
    title: "change password",
    content: <ChangePasswordPage />,
  },
};

const NavBar = () => {
  const authContext = useContext(AuthContext);

  const { logout, user, loadPersonnel } = authContext;
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("0");
  const [userState, setUser] = useState(user);
  // const toggleCollapsed = () => {
  //     setCollapsed(!collapsed)
  // };
  useEffect(() => {
    loadPersonnel();
  }, [userState]);
  // const onLogout = () => {
  //   logout();
  //   localStorage.removeItem("token");
  // };

  const handleClick = (e) => {
    setKey(e.key);
  };

  const switchNavBar = () => {
    console.log("user", user);
    if (user) {
      switch (user.admin) {
        case 1:
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
              {/* <Menu.Item onClick={onLogout}>
                <LogoutOutlined />
                Logout
              </Menu.Item> */}
            </Menu>
          );
        default:
          return (
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
                Thông tin
              </Menu.Item>
              <Menu.Item key="2" icon={<ContainerOutlined />}>
                Lịch sử giao dịch
              </Menu.Item>
              <SubMenu key="sub1" icon={<MailOutlined />} title="Chuyển tiền">
                <Menu.Item key="3">Ngân hàng nội địa</Menu.Item>
                <Menu.Item key="4">Ngân hàng khác</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Danh sách">
                <Menu.Item key="5">Danh sách nợ</Menu.Item>
                <Menu.Item key="6">Danh sách người nhận</Menu.Item>
                <SubMenu key="sub3" title="Tài khoản">
                  <Menu.Item key="7">Đổi mật khẩu</Menu.Item>
                  {/* <Menu.Item onClick={onLogout}>
                    <LogoutOutlined />
                    Logout
                  </Menu.Item> */}
                </SubMenu>
              </SubMenu>
            </Menu>
          );
      }
    }
    return (
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

        <SubMenu key="sub1" icon={<MailOutlined />} title="Chuyển tiền">
          <Menu.Item key="3">Ngân hàng nội địa</Menu.Item>
          {/* <Menu.Item key="4">Ngân hàng khác</Menu.Item> */}
        </SubMenu>

        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Danh sách">
          <Menu.Item key="5">Danh sách nợ</Menu.Item>
          <Menu.Item key="6">Danh sách người nhận</Menu.Item>

          <SubMenu key="sub3" title="Tài khoản">
            <Menu.Item key="7">Đổi mật khẩu</Menu.Item>
            {/* <Menu.Item onClick={onLogout}>
              <LogoutOutlined />
              Logout
            </Menu.Item> */}
          </SubMenu>
        </SubMenu>

        {/* <SubMenu key="sub4" icon={<MailOutlined />} title="Lịch sử giao dịch">
          <Menu.Item key="8">Thông tin lịch sử giao dịch</Menu.Item>
        </SubMenu> */}
      </Menu>
    );
  };
  return (
    <div className="row">
      <div className="col-3">{switchNavBar()}</div>
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

export default NavBar;
