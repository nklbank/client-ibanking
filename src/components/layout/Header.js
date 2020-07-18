
import React, { useContext, useEffect, useState } from 'react'
import { PageHeader, Button, Tag, Typography, Row, Badge, Dropdown, Menu } from 'antd';
import { LogoutOutlined, BellOutlined } from '@ant-design/icons';
import AuthContext from "../../context/auth/authContext"
import Notification from '../user/notification'

// import UserContext from '../../context/user/userContext'
const { Paragraph } = Typography;


// const menu = () => (
//     <Menu>
//         <Menu.Item>
//             <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
//                 1st menu item
//       </a>
//         </Menu.Item>
//         <Menu.Item>
//             <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
//                 2nd menu item
//       </a>
//         </Menu.Item>
//         <Menu.Item>
//             <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
//                 3rd menu item
//       </a>
//         </Menu.Item>
//         <Menu.Item danger>a danger item</Menu.Item>
//     </Menu>
// )

const Header = () => {
    const authContext = useContext(AuthContext);

    const { logout, user } = authContext;

    console.log(user);



    const onLogout = () => {

        localStorage.removeItem("token");
        logout();
        window.location.reload(true);

    }
    return (
        <ul className="nav justify-content-end p-1 mb-2 bg-white">
            <li className="nav-item">
                <a className="nav-link active" href="#">Active</a>
            </li>
            <li className="nav-item">
                <Notification />
            </li>
            <li className="nav-item">
                <Button key="1" type="primary" onClick={onLogout}>
                    <LogoutOutlined />
                    Logout
       </Button>
            </li>
        </ul>
    )
}
export default Header