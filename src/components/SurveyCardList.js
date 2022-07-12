import React from 'react';
import {Row} from 'antd';
import SurveyCard from './SurveyCard';
import NewSurvey from './NewSurvey';
import storePromise from '../Store';
import FirebaseConnection from "../FirebaseConnection";

const firebaseConnection = new FirebaseConnection();

class SurveyCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: []
        }
    }

    componentDidMount() {
        storePromise.then(function (store) {
            let surveys = [];
            store.getState().title.forEach(function (x, i) {
                surveys.push({
                    title: store.getState().title[i],
                    description: store.getState().description[i],
                    category: store.getState().category[i],
                    image: store.getState().image[i]
                });
            });
            this.setState({
                surveys: surveys
            });
            this.subscribe = store.subscribe(() => {
                let surveys = [];
                store.getState().title.forEach(function (x, i) {
                    surveys.push({
                        title: store.getState().title[i],
                        description: store.getState().description[i],
                        category: store.getState().category[i],
                        image: store.getState().image[i]
                    });
                });
                this.setState({
                    surveys: surveys
                });
            });
            this.newSurvey = function () {
                let i = 0;
                while (this.getByTitle(`New survey #${i}`).length !== 0) i++;
                const survey = {
                    category: this.props.category,
                    description: 'Descrizione',
                    src: null,
                    title: `New survey #${i}`
                }
                firebaseConnection.addSurvey(survey).then((docRef) =>
                    store.dispatch({type: 'ADD', payload: survey})
                );
            }
            this.setImage = function (file, title) {
                firebaseConnection.addImage(file, title).then((url) =>
                    store.dispatch({type: 'ADD_IMAGE', payload: {url: url}})
                );
            }
        }.bind(this));
    }

    getByTitle(title) {
        return this.state.surveys.filter((s) => s.title === title);
    }

    removeSurvey(title) {

    }

    render() {
        const surveys = this.state.surveys.map((s) =>
            <SurveyCard
                category={this.props.category}
                description={s.description}
                key={s.title}
                onImageDrop={(file) => {this.setImage(file, s.title)}}
                onRemove={() => {this.removeSurvey(s.title);}}
                onTitleChange={(title) => {
                    if (this.getByTitle(title).length === 0) {
                        s.title = title;
                    } else {
                        alert('Scegli un nome diverso.');
                    }
                }}
                src={s.src}
                title={s.title}
            />
        )
        return <Row
            className="surveys"
            gutter={[16, 16]}
            justify="space-evenly"
        >
            {this.props.category && <NewSurvey onClick={() => this.newSurvey()}/>}
            {surveys}
        </Row>
    }
}

export default SurveyCardList;