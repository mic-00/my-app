import React from 'react';
import {Layout, PageHeader, Typography} from 'antd';

const {Header} = Layout;
const {Title} = Typography;

class MyHeader extends React.Component {
    render() {
        return <Header className="my-header">
            <PageHeader
                title={<Title className="title-2" level={2}>
                    {this.props.title ? this.props.title : 'Home'}
                </Title>}
                subTitle={<Title className="title-3" level={3}>
                    {this.props.subtitle}
                </Title>}
            />
        </Header>;
    }
}

export default MyHeader;