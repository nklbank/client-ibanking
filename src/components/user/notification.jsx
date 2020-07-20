import React, { useContext, useState, useEffect } from 'react'
import { Dropdown, Badge, Menu, Typography } from 'antd'
import { BellOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone, CloseCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons'
import UserContext from '../../context/user/userContext';

const { Text } = Typography

function Notification({ socket }) {

    const userContext = useContext(UserContext);
    const { notifs, getNotifs, getCustomerInfo, addNotif, getDebts } = userContext;
    const [menu, setMenu] = useState(<Menu><Menu.Item></Menu.Item></Menu>)
    const [username, setUsername] = useState(null);
    (async () => { const res = await getCustomerInfo(); const { username } = res[0]; setUsername(username) })();

    useEffect(() => {
        getNotifs(username)
        if (username) {
            console.log('socket', socket)
            console.log('username', username)

            socket.emit('join', { username }, (error) => console.log('error', error))

            socket.on('getNotif', ({ message }) => {
                // "message": {"id":6,"sender":"54321","receiver":"444749419483","type":"createdebt","timestamp":"2020-07-18T12:28:33.000Z","amount":"200000","unread":1,"fullname":"NGUYEN THI NGAN KHANH"}
                console.log('message :>> ', message);
                addNotif(message)
                console.log('notifs :>> ', notifs);
                // const { type } = message
                // // if (type === "createdebt")
                getDebts()
            })
        }
    }, [username])

    useEffect(() => {

        const items = notifs.map(notif => {
            const { fullname, type, timestamp, amount, description } = notif
            var _timestamp = new Date(timestamp)
            var timestring = `${_timestamp.getDate()}/${_timestamp.getMonth() + 1}/${_timestamp.getFullYear()} ${_timestamp.getHours()}:${_timestamp.getMinutes()}`
            var action, icon
            switch (type) {
                case 'transfer':
                    action = "đã chuyển khoản"
                    icon = <CheckCircleTwoTone twoToneColor="#52c41a" />
                    break;
                case 'paydebt':
                    action = "đã thanh toán khoản nợ"
                    icon = <CheckCircleTwoTone twoToneColor="#52c41a" />
                    break;
                case 'createdebt':
                    action = "đã tạo nhắc nợ"
                    icon = <ExclamationCircleTwoTone />
                    break;
                case 'hidedebt':
                    action = "đã ẩn khoản nợ"
                    icon = <CloseCircleTwoTone twoToneColor="#fa7d09" />
                    break;
                case 'deldebt':
                    action = "đã xóa khoản nợ"
                    icon = <MinusCircleTwoTone twoToneColor="#52c41a" />
                    break;
                default:
                    break;
            }
            return <Menu.Item style={{ whiteSpace: 'normal', height: 'auto' }} icon={icon}>
                <strong>{fullname}</strong>
                {` ${action}`}
                {amount !== null ? ` ${amount} VND` : ""}
                <br />{description ? `"${description}"` : ""}
                <div style={{ fontSize: "x-small", color: "gray" }}>{timestring}</div>
            </Menu.Item >
        })
        setMenu(<Menu style={{ width: 350, overflowX: "auto", height: 500 }}>{items}</Menu>)
    }, [notifs])

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <a className="nav-link active ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Badge count={notifs.length}>
                    <BellOutlined />
                </Badge>
            </a>
        </Dropdown>
    )
}

Notification.propTypes = {

}

export default Notification

