import React from 'react';
import {Select} from "antd";

const {Option} = Select;

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputType: ''
        };
    }
    render() {
        return <div>
            <Select defaultValue="number" style={{width: 120}}>
                <Option value="number">Numero</Option>
                <Option value="radio">Radio button</Option>
                <Option value="select">Select</Option>
                <Option value="slider">Slider</Option>
                <Option value="time">Time</Option>
            </Select>
        </div>;
    }
}

export default NewQuestion;