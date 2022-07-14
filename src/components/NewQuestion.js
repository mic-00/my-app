import React from 'react';
import {Button, Form, Input, Radio, Select} from "antd";

const {Option} = Select;
const {Group} = Radio;
const {Item} = Form;

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputType: 'number',
            name: 'newQuestion',
            value: [],
            label: []
        };
    }
    render() {
        let input;
        switch (this.state.inputType) {
            case 'number':
                input = <Input
                    type="text"
                    value={this.state.value[0]}
                    onChange={(e) => this.setState({
                        value: [e.target.value]
                    })}
                    style={{width: 120}}
                    addonAfter={<Input
                        type="text"
                        onChange={(e) => this.setState({
                            label: [e.target.value]
                        })}
                    />}
                />;
                break;
            case 'radio' :
                const radios = this.state.value.map((v, i) => {
                    const l = this.state.label[i];
                    return <Radio key={i} value={v}>
                        <Input type="text" value={l} onChange={(e) => {
                            const stateTemp = {...this.state};
                            stateTemp.label[i] = e.target.value;
                            this.setState(stateTemp);
                        }}/>
                    </Radio>
                });
                input = <div>
                    <Item><Group value={this.state.value[0]}>
                        {radios}
                    </Group></Item>
                    <Item><Button onClick={() => this.setState({
                        value: [...this.state.value, this.state.value.length],
                        label: [...this.state.label, 'New option']
                    })}>
                        Aggiungi opzione
                    </Button></Item>
                </div>
                break;
            case 'select':
                break;
            case 'slider:':
                break;
            case 'time':
                break;
        }
        return <div>
            <Item><Input type="text" onChange={((e) => this.setState({
                title: e.target.value
            }))} /></Item>
            <Item><Select defaultValue="number"
                    style={{width: 120}}
                    onSelect={(value) => this.setState({inputType: value})}
            >
                <Option value="number">Number</Option>
                <Option value="radio">Radio button</Option>
                <Option value="select">Select</Option>
                <Option value="slider">Slider</Option>
                <Option value="time">Time</Option>
            </Select></Item>
            {input}
            <Item><Button onClick={() => this.props.onAddQuestion(this.props.title, this.state)}>Confirm</Button></Item>
        </div>;
    }
}

export default NewQuestion;