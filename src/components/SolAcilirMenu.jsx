import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined, CaretRightOutlined, LineChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import "../styles/solacilirmenu.css"

const SolAcilirMenu = () => {
    const onClick = e => {
        console.log('click ', e);
    };


    const items = [
        {
            key: 'atesyol',
            label: 'YOL ÇALIŞMASI',
            icon: <CaretRightOutlined />,
            children: [
                {
                    key: 'ats_yol_genel',
                    label: 'GENEL TABLO',
                    icon: <LineChartOutlined />,
                },
                { key: '7', label: 'TOPRAK - ASFALT' },
                { key: '8', label: 'BORDUR-KALDIRIM' },

            ],
        },
        {
            key: 'atesaltyapi',
            label: 'ALTYAPI ÇALIŞMASI',
            icon: <CaretRightOutlined />,
            children: [
                {
                    key: 'ats_altyapi_genel',
                    label: 'GENEL TABLO',
                    icon: <LineChartOutlined />,
                },
                { key: '99', label: 'AS-YS ' },
                { key: '98', label: 'İÇMESUYU' },
                { key: '97', label: 'TELEKOM' },
                { key: '96', label: 'ELEKTRİK' },
                { key: '95', label: 'AYDINLATMA' },

            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'sub4',
            label: 'Navigation Three',
            icon: <SettingOutlined />,
            children: [
                { key: '9', label: 'Option 9', },
                { key: '10', label: 'Option 10' },
                { key: '11', label: 'Option 11' },
                { key: '12', label: 'Option 12' },
            ],
        },
        {
            key: 'grp',
            label: 'Group',
            type: 'group',
            children: [
                { key: '13', label: 'Option 13' },
                { key: '14', label: 'Option 14' },
            ],
        },
    ];

    return (
        <div className='solaacilir' >

            <Menu
                onClick={onClick}
                style={{ width: 256, height: 'calc(100vh - 66px)' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </div>
    );
};

export default SolAcilirMenu