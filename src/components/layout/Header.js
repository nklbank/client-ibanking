
import React, { useContext, useEffect, useState } from 'react'
import { PageHeader, Button, Tag, Typography, Row, Badge, Dropdown, Menu } from 'antd';
import { LogoutOutlined, BellOutlined } from '@ant-design/icons';
import AuthContext from "../../context/auth/authContext"
import Notification from '../user/notification'

const { Paragraph } = Typography;


const Header = ({ socket }) => {
    const authContext = useContext(AuthContext);

    const { logout, user } = authContext;

    console.log(user);

    console.log('socket', socket)

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
                <Notification socket={socket} />
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