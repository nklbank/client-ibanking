import React, { useContext, useState, useEffect } from 'react'
import { Dropdown, Badge, Menu, Typography } from 'antd'
import { BellOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import UserContext from '../../context/user/userContext';
import io from 'socket.io-client'

const { Text } = Typography

// const { proxy } = require('../../../../package.json');
// let socket

function Notification({ socket }) {

    const userContext = useContext(UserContext);
    const { notifs, getNotifs, getCustomerInfo, addNotif, getDebts } = userContext;
    const [menu, setMenu] = useState(<Menu><Menu.Item></Menu.Item></Menu>)
    const [username, setUsername] = useState(null);
    (async () => { const res = await getCustomerInfo(); const { username } = res[0]; setUsername(username) })();

    useEffect(() => {
        getNotifs(username)
        if (username) {
            // socket = io(proxy)
            console.log('socket', socket)
            console.log('username', username)

            socket.emit('join', { username }, (error) => console.log('error', error))

            socket.on('getNotif', ({ message }) => {
                // "message": {"id":6,"sender":"54321","receiver":"444749419483","type":"createdebt","timestamp":"2020-07-18T12:28:33.000Z","amount":"200000","unread":1,"fullname":"NGUYEN THI NGAN KHANH"}
                console.log('message :>> ', message);
                addNotif(message)
                console.log('notifs :>> ', notifs);
                const { type } = message
                if (type === "createdebt")
                    getDebts()
            })
        }
    }, [username])

    useEffect(() => {

        const items = notifs.map(notif => {
            const { fullname, type, timestamp, amount } = notif
            var _timestamp = new Date(timestamp)
            var timestring = `${_timestamp.getDate()}/${_timestamp.getMonth() + 1}/${_timestamp.getFullYear()} ${_timestamp.getHours()}:${_timestamp.getMinutes()}`
            var description, icon
            switch (type) {
                case 'transfer':
                    description = "đã chuyển khoản"
                    icon = (<CheckCircleTwoTone twoToneColor="#52c41a" />)
                    break;
                case 'paydebt':
                    description = "đã thanh toán khoản nợ"
                    icon = (<CheckCircleTwoTone twoToneColor="#52c41a" />)
                    break;
                case 'createdebt':
                    description = "đã tạo nhắc nợ"
                    icon = (<ExclamationCircleTwoTone />)
                    break;
                case 'hidedebt':
                    description = "đã ẩn khoản nợ"
                    icon = (<CloseCircleTwoTone twoToneColor="#fa7d09" />)
                    break;
                default:
                    break;
            }
            var ret = `${fullname} ${description} ${amount !== null ? amount : ""}<br>${timestring}`
            return <Menu.Item>{icon} <Text strong>{fullname}</Text> {description} {amount !== null ? amount + "VND" : ""}<br /><div style={{ fontSize: "small", color: "gray" }}>{timestring}</div></Menu.Item>
        })
        setMenu(<Menu>{items}</Menu>)
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

