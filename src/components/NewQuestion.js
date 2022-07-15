import React from 'react';
import {Button, Checkbox, Form, Input, Radio, Select} from "antd";

const {Option} = Select;
const {Group} = Radio;
const {Item} = Form;

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            inputType: 'number',
            value: [],
            label: []
        };
    }

    createInput() {
        switch (this.state.inputType) {
            case 'number':
                return <Input type="number"/>
            case 'radio':
                return <Group>
                    {this.state.label.map((l, i) =>
                        <Radio key={i} value={i}>
                            <Input
                                type="text"
                                value={l}
                                onChange={(e) => {
                                    const label = [...this.state.label];
                                    label[i] = e.target.value;
                                    this.setState({label});
                                }}
                            />
                        </Radio>
                    )}
                </Group>;
            case 'checkbox':
                const options = [];
                this.state.label.forEach((l, i) => {
                    const v = this.state.value[i];
                    options.push({
                        value: v,
                        label: <Input
                            type="text"
                            value={l}
                            onChange={(e) => {
                                const label = [...this.state.label];
                                label[i] = e.target.value;
                                this.setState({label});
                            }}
                        />
                    });
                });
                return <Checkbox.Group options={options} />;
        }
        return null;
    }

    render() {
        return <div>
            <Item>
                <Input type="text" onChange={(e) => {
                    this.setState({
                        title: e.target.value
                    });
                }} />
            </Item>
            <Item>
                <Select
                    defaultValue="number"
                    value={this.state.inputType}
                    style={{width: 120}}
                    onSelect={(value) => {
                        this.setState({
                            inputType: value
                        });
                    }}
                >
                    <Option value="number">Number</Option>
                    <Option value="radio">Radio button</Option>
                    <Option value="checkbox">Checkbox</Option>
                    <Option value="slider">Slider</Option>
                    <Option value="time">Time</Option>
                </Select>
            </Item>
            <Item>{this.createInput()}</Item>
            <Item>
                {this.state.inputType === 'radio' || this.state.inputType === 'checkbox' ?
                    <Button onClick={() => {
                        this.setState({
                            value: [...this.state.value, this.state.value.length],
                            label: [...this.state.label, 'New option']
                        })
                    }}>
                        Add option
                    </Button> :
                    null
                }
            </Item>
            <Item>
                <Button onClick={() => {
                    this.props.onAddQuestion(this.props.title, this.state);
                    this.setState({
                        title: '',
                            inputType: 'number',
                            value: [],
                            label: []
                    });
                }}
                >
                    Confirm
                </Button>
            </Item>
        </div>;
    }
}

export default NewQuestion;