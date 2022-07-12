import React from 'react';
import {Button, Card, Image, Typography, Upload} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";

const { Title } = Typography;
const { Dragger } = Upload;

class SurveyCard extends React.Component {
    render() {
        const cover = this.props.src ?
            <Image
                alt={this.props.description}
                src={this.props.src}
                preview={true}
                width={'100%'}
                height={'100%'}
            /> :
            <Dragger
                accept="image/*"
                listType="picture-card"
                maxCount={1}
                multiple={false}
                onChange={(file) => {
                    const reader = new FileReader();
                    reader.readAsText(file.file.originFileObj);
                    reader.onload = (e) => this.props.onImageDrop(e.target.result);
                }}
            >
                <div style={{height: '220px', padding: '30%'}}>
                    <PlusOutlined />
                    <div>Aggiungi un'immagine</div>
                </div>
            </Dragger>;
        return <Card
            actions={[
                <Button
                    danger={true}
                    icon={<DeleteOutlined />}
                    onClick={this.props.onRemove}
                    shape='round'
                >
                    Elimina
                </Button>,
                <Link to={`../edit/${this.props.title}`}><Button>Modifica</Button></Link>
            ]}
            cover={cover}
            hoverable={true}
            onClick={() => {}}
            style={{
                width: '300px'
            }}
            title={<Title
                editable={{
                    onChange: (title) => {this.props.onTitleChange(title)}
                }}
                level={3}
            >
                {this.props.title}
            </Title>}
        >
            <Typography.Text className="survey-cat">{this.props.category}</Typography.Text>
            <Typography.Text className="survey-desc">{this.props.description}</Typography.Text>
        </Card>
    }
}

export default SurveyCard;