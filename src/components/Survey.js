import React from 'react';
import {Checkbox, Divider, Form, Input, Radio} from "antd";
import NewQuestion from "./NewQuestion";

const {Item} = Form;
const {Group} = Radio;

class Survey extends React.Component {
    createInput(question) {
        switch(question.inputType) {
            case 'number':
                return <Input type="number"/>;
            case 'radio':
                return <Group>
                    {question.label.map((l, i) =>
                        <Radio key={i} value={i}>
                            {l}
                        </Radio>
                    )}
                </Group>;
            case 'checkbox':
                const options = [];
                question.label.forEach((l, i) => {
                    const v = question.value[i];
                    options.push({value: v, label: l});
                });
                return <Checkbox.Group options={options} />
        }
        return null;
    }
    render() {
        return <>
            <Form
                className="questions"
                layout="vertical"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                {this.props.questions.map(q =>
                    <Item>
                        <Divider>{q.title}</Divider>
                        {this.createInput(q)}
                    </Item>
                )}
            </Form>
            <Form
                className="questions"
                layout="vertical"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                <NewQuestion title={this.props.title} onAddQuestion={this.props.onAddQuestion} />
            </Form>
        </>;
    }
}

export default Survey;