import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Layout } from 'antd';
import SurveyListPage from './pages/SurveyListPage';
import CategoriesPage from './pages/CategoriesPage';
import MySider from './layout/MySider';
import storePromise from "./Store";
import SurveyPage from "./pages/SurveyPage";
import FirebaseConnection from './FirebaseConnection';

const firebaseConnection = new FirebaseConnection();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: []
        }
    }

    componentDidMount() {
        storePromise
            .then((store) => {
                this.setState({
                    surveys: store.getState().surveys
                });
                this.subscribe = store.subscribe(() => {
                    this.setState({
                        surveys: store.getState().surveys
                    });
                });
                this.addSurvey = () => {
                    let i = 0;
                    while (this.getById(i)) i++;
                    const survey = {
                        category: 'Other',
                        description: 'Description',
                        src: null,
                        title: `New survey #${i}`,
                        questions: [],
                        id: i
                    }
                    firebaseConnection.addSurvey(survey).then(() =>
                        store.dispatch({type: 'ADD', payload: survey})
                    );
                };
                this.removeSurvey = (title) => {
                    firebaseConnection.deleteSurvey(title).then(() =>
                        store.dispatch({type: 'REMOVE', payload: {title}})
                    );
                };
                this.setImage = (file, title) => {
                    firebaseConnection.setImage(file, title).then((url) =>
                        store.dispatch({type: 'SET_IMAGE', payload: {title, url}})
                    );
                };
                this.setTitle = (oldTitle, title) => {
                    firebaseConnection.setTitle(oldTitle, title).then(() =>
                        store.dispatch({type: 'SET_TITLE', payload: {oldTitle, title}})
                    );
                };
                this.setCategory = (title, category) => {
                    firebaseConnection.setCategory(title, category).then(() =>
                        store.dispatch({type: 'SET_DESC', payload: {title, category}})
                    );
                };
                this.setQuestions = (title, question) => {
                    const questions = [...this.getByTitle(title).questions, question];
                    firebaseConnection.setQuestions(title, questions).then(() =>
                        store.dispatch({type: 'SET_QUESTIONS', payload: {title, questions}})
                    );
                };
            });
    }
    getByTitle(title) {
        return this.state.surveys.find((s) => s.title === title);
    }
    getById(id) {
        return this.state.surveys.find((s) => s.id === id);
    };
    getCategories() {
        let categories = [];
        this.state.surveys.forEach((s) => {
            if (!categories.find((cat) => cat === s.category))
                categories.push(s.category);
        });
        return categories;
    }

    render() {
        console.log(this.state.surveys);
        const routeCategories = this.getCategories().map((c, i) =>
            <Route key={i}
                   path={`/categories/${c}`}
                   element={
                        <SurveyListPage
                            category={c}
                            surveys={this.state.surveys.filter((s) => s.category === c)}
                            onImageChange={this.setImage}
                            onTitleChange={this.setTitle}
                            onCategoryChange={this.setCategory}
                            onRemove={this.removeSurvey}
                            onAdd={this.addSurvey}
                            onAddQuestion={this.setQuestions}
                        />
                   }
            />
        )
        const routeSurveys = this.state.surveys.map((s, i) =>
            <Route key={i}
                   path={`/categories/${s.category}/${s.id}`}
                   element={<SurveyPage
                       title={s.title}
                       category={s.category}
                       description={s.description}
                       questions={s.questions}
                       onAddQuestion={this.setQuestions}
                   />}
            />
        );
        return <BrowserRouter>
            <Layout>
                <MySider />
                <Routes>
                    <Route
                        path="/"
                        element={<SurveyListPage
                            surveys={this.state.surveys}
                            onImageChange={this.setImage}
                            onTitleChange={this.setTitle}
                            onRemove={this.removeSurvey}
                            onAdd={this.addSurvey}
                        />}
                    />
                    <Route path="/categories" element={<CategoriesPage categories={this.getCategories()} />} />
                    {routeCategories}
                    {routeSurveys}
                </Routes>
            </Layout>
        </BrowserRouter>;
    }
}

export default App;