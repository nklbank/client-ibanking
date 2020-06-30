
import React, { useContext, useEffect } from 'react'
import { PageHeader, Button, Tag, Typography, Row } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import AuthContext from "../../context/auth/authContext"
const { Paragraph } = Typography;



const content = (
    <>
        <Paragraph>
            Ant Design interprets the color system into two levels: a system-level color system and a
            product-level color system.
    </Paragraph>
        <Paragraph>
            Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
            easier for designers to have a clear psychological expectation of color when adjusting colors,
            as well as facilitate communication in teams.
    </Paragraph>

    </>
);

const Content = ({ children, extraContent }) => {
    return (
        <Row>
            <div style={{ flex: 1 }}>{children}</div>
            <div className="image">{extraContent}</div>
        </Row>
    );
};



const Header = () => {
    const authContext = useContext(AuthContext);

    const { logout, user, loadUser } = authContext;

    console.log(user);
    useEffect(() => {
        loadUser();
    }, [])
    const onLogout = () => {

        localStorage.removeItem("token");
        logout();
        window.location.reload(true);

    }
    return (<PageHeader
        title={user && user[0].fullname}
        className="site-page-header"
        subTitle="Welcome to NKL Bank"
        tags={<Tag color="blue">Running</Tag>}
        extra={[
            <Button key="1" type="primary" onClick={onLogout}>
                <LogoutOutlined />
                Logout
      </Button>,
            // <DropdownMenu key="more" />,
        ]}
        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=500&v=5' }}
    // breadcrumb={{ routes }}
    >
        <Content
            extraContent={
                <img
                    src="https://blogs.sap.com/wp-content/uploads/2016/01/login_background_862563.jpg"
                    alt="content"
                    width="100px"
                />
            }
        >
            {content}
        </Content>
    </PageHeader>
    )
}
export default Header