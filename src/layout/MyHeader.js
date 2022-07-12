import React from 'react';
import {Layout, PageHeader, Typography} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

const {Header} = Layout;
const {Title} = Typography;

class MyHeader extends React.Component {
    render() {
        return <Header className="my-header">
            <PageHeader
                title={<Title className="title-2" level={2}>
                    {this.props.title ? this.props.title : 'Home'}
                </Title>}
                onBack={() => null}
                backIcon={this.props.title ?
                    <ArrowLeftOutlined
                        height={'2em'}
                        width={'2em'}
                        style={{
                            color: 'white'
                        }} /> :
                    false
                }
            />
        </Header>;
    }
}

export default MyHeader;