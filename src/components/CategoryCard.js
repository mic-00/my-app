import React from 'react';
import {Link} from 'react-router-dom';
import {Card} from 'antd';
import 'antd/dist/antd.css';

class CategoryCard extends React.Component {
    render() {
        return <Link to={`./${this.props.title}`}>
            <Card
                hoverable={true}
                title={this.props.title}
            >
            </Card>
        </Link>;
    }
}

export default CategoryCard;