import React from 'react';
import {Button, Card} from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';

class NewSurvey extends React.Component {
    render() {
        return <Card
            bordered={true}
            hoverable={true}
            style={{
                width: '300px',
                border: 'dashed'
            }}
        >
            <Button
                icon={<PlusCircleOutlined />}
                onClick={this.props.onClick}
                style={{
                    width: '100%',
                    padding: '100% 0'
                }}
            >
                Crea nuova
            </Button>
        </Card>
    }
}

export default NewSurvey;