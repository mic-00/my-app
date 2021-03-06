import React from 'react';
import {Button, Card, Divider, Image, Typography, Upload} from 'antd';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";

const { Title, Text } = Typography;
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
                onChange={() => {}}
            >
                <div style={{height: '220px', padding: '30%'}}>
                    <PlusOutlined />
                    <div>Add an image</div>
                </div>
            </Dragger>;

        return <Card
            actions={[
                <Button
                    danger={true}
                    icon={<DeleteOutlined />}
                    onClick={() => this.props.onRemove(this.props.title)}
                    shape='round'
                >
                    Delete
                </Button>,
                <Link to={`/categories/${this.props.category}/${this.props.surveyId}`}>
                    <Button
                        icon={<EditOutlined />}
                        shape="round"
                    >
                        Edit
                    </Button>
                </Link>,
            ]}
            cover={cover}
            hoverable={true}
            style={{width: '300px'}}
            title={<Title
                editable={{
                    onChange: (title) => this.props.onTitleChange(this.props.title, title)
                }}
                level={3}
            >
                {this.props.title}
            </Title>}
        >
            <Text
                className="survey-cat"
                editable={{
                    onChange: (category) => this.props.onCategoryChange(this.props.title, category)
                }}
            >
                {this.props.category}
            </Text>
            <Text
                className="survey-desc"
                editable={{
                    onChange: (desc) => this.props.onDescriptionChange(this.props.title, desc)
                }}
            >
                {this.props.description}
            </Text>
            <Divider />
            <Button className="reply-btn">
                Reply
            </Button>
        </Card>
    }
}

export default SurveyCard;