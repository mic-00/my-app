import React from 'react';
import {Row} from 'antd';
import SurveyCard from './SurveyCard';
import NewSurvey from './NewSurvey';

class SurveyCardList extends React.Component {
    render() {
        const surveys = this.props.surveys.map((s, i) =>
            <SurveyCard
                key={i}
                category={s.category === this.props.category ? null : s.category}
                description={s.description}
                src={s.image}
                title={s.title}
                onImageChange={this.props.onImageChange}
                onTitleChange={this.props.onTitleChange}
                onRemove={this.props.onRemove}
                surveyId={s.id}
            />
        )
        return <Row
            className="surveys"
            gutter={[16, 16]}
            justify="space-evenly"
        >
            {!this.props.category && <NewSurvey onAdd={this.props.onAdd} />}
            {surveys}
        </Row>
    }
}

export default SurveyCardList;