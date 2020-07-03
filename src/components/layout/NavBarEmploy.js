import React, { useState } from 'react'
import { Menu } from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
} from '@ant-design/icons';

import CreateAccount from '../employee/CreateAccount'
import AddMoney from '../employee/AddMoney'
import CustomerHistory from '../employee/CustomerHistory'

const comp = {
    0: {
        title: "Tạo tài khoản khách hàng",
        content: <CreateAccount />,
    },
    1: {
        title: "Nạp tiền vào tài khoản",
        content: <AddMoney />,
    },
    2: {
        title: "Lịch sử giao dịch",
        content: <CustomerHistory />,
    }
};


const NavBarEmploy = props => {
    const [key, setKey] = useState("0");

    const handleClick = (e) => {
        setKey(e.key);
    };

    return (
        <div className="row">
            <div className="col-3">
                <Menu
                    defaultSelectedKeys={['0']}
                    // defaultOpenKeys={['sub0']}
                    mode="inline"
                    theme="dark"
                    onClick={handleClick}
                >
                    <Menu.Item key="0" icon={<PieChartOutlined />}>
                        Tạo tài khoản khách hàng
          </Menu.Item>
                    <Menu.Item key="1" icon={<DesktopOutlined />}>
                        Nạp tiền vào tài khoản
          </Menu.Item>
                    <Menu.Item key="2" icon={<ContainerOutlined />}>
                        Lịch sử giao dịch
          </Menu.Item>
                </Menu>
            </div>
            <div className="col-8 p-5 shadow bg-white rounded border ">
                {" "}
                <h2> {comp[key].title}</h2>
                {comp[key].content}
            </div>
        </div>
    )
}

export default NavBarEmploy
