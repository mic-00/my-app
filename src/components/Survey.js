import React from 'react';
import {Form, Input} from "antd";
import NewQuestion from "./NewQuestion";

const {TextArea} = Input;

class Survey extends React.Component {
    render() {
        return <Form className="questions">
            <NewQuestion />
        </Form>;
    }
}

export default Survey;