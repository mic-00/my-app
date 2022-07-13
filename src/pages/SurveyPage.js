import React from 'react'
import {Layout} from 'antd';
import MyHeader from '../layout/MyHeader';
import Survey from '../components/Survey';

const { Content } = Layout;

class SurveyPage extends React.Component {
    render() {
        return <Layout>
            <MyHeader title={this.props.title} subtitle={this.props.category} />
            <Content>
                {this.props.description}
                <Survey questions={this.props.questions} />
            </Content>
        </Layout>
    }
}

export default SurveyPage;