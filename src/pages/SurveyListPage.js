import React from 'react'
import {Layout, Menu} from 'antd';
import SurveyCardList from "../components/SurveyCardList";
import MyHeader from "../layout/MyHeader";

const { Content } = Layout;

class SurveyListPage extends React.Component {
    render() {
        return <Layout>
            <MyHeader title={this.props.category} />
            <Content>
                <Menu mode="horizontal">
                    <Menu.SubMenu key={5} title="Visualizza">
                        <Menu.Item key={6}>Data di caricamento</Menu.Item>
                        <Menu.Item key={7}>Descrizione</Menu.Item>
                        <Menu.Item key={8}>Luogo</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
                <SurveyCardList
                    category={this.props.category}
                    surveys={this.props.surveys}
                    onImageChange={this.props.onImageChange}
                    onTitleChange={this.props.onTitleChange}
                    onRemove={this.props.onRemove}
                    onAdd={this.props.onAdd}
                />
            </Content>
        </Layout>;
    }
}

export default SurveyListPage;