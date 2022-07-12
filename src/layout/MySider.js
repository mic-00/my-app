import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Typography} from 'antd';

const { Sider } = Layout,
    { Title } = Typography;

class MySider extends React.Component {
    render() {
        return <Sider className="my-sider" width={250}>
            <Title className="title-1" id="my-sider-title">WebApp</Title>
            <Menu>
                <Menu.Item key={0}>
                    <Link to="./" />
                    Home
                </Menu.Item>
                <Menu.Item key={1}>
                    <Link to="./categories" />
                    Categorie
                </Menu.Item>
            </Menu>
        </Sider>
    }
}

export default MySider;