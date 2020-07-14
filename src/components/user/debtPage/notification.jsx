import React from 'react'

import { Button, notification } from 'antd';

const openNotification = (message, type) => {
    const delBtn = (<Button size="small" danger></Button>)

    notification[type]({
        message: 'Notification Title',
        description: JSON.stringify(message),
        delBtn,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
}

export default openNotification
