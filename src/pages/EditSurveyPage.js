import React from 'react';
import MyHeader from '../layout/MyHeader';
import {Layout} from 'antd';

const { Content } = Layout;

class EditSurveyPage extends React.Component {
    render() {
        return <Layout>
            <MyHeader />
            <Content>
                Provaaaaaa
            </Content>
        </Layout>
    }
}

export default EditSurveyPage;