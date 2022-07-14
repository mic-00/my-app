import React from 'react';
import {Divider, Form, Radio} from "antd";
import NewQuestion from "./NewQuestion";

const {Item} = Form;
const {Group} = Radio;

class Survey extends React.Component {
    render() {
        const questions = this.props.questions.map((q, i) => {
            const radios = q.value.map((v, i) => {
                const l = q.label[i];
                return <Radio key={i} value={v}>{l}</Radio>
            });
            return <Item>
                <Divider>{q.title}</Divider>
                <Group key={i} value={q.value[0]} className="question">
                    {radios}
                </Group>
            </Item>
        });
        return <>
            <Form className="questions" layout="vertical" labelCol={{
                span: 8,
            }}
                  wrapperCol={{
                      span: 16,
                  }}>
                {questions}
            </Form>
            <Form className="questions" layout="vertical" labelCol={{
                span: 8,
            }}
                  wrapperCol={{
                      span: 16,
                  }}>
                <NewQuestion title={this.props.title} onAddQuestion={this.props.onAddQuestion} />
            </Form>
        </>;
    }
}

export default Survey;