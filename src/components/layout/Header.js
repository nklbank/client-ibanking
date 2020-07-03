import React, { useContext, useEffect } from 'react'
import { PageHeader, Button, Tag, Typography, Row } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import AuthContext from "../../context/auth/authContext"


const Header = () => {
    const authContext = useContext(AuthContext);

    const { logout } = authContext;

    // console.log(user);
    // useEffect(() => {
    //     loadUser();
    // }, [])
    const onLogout = () => {

        localStorage.removeItem("token");
        logout();
        window.location.reload(true);

    }
    return (
        <ul className="nav justify-content-end bg-white p-3">
            <li className="nav-item">
                <a className="nav-link active" href="#">Active</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
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