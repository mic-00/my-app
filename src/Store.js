import {configureStore} from "@reduxjs/toolkit";
import FirebaseConnection from "./FirebaseConnection";

const firebaseConnection = new FirebaseConnection();

const storePromise = firebaseConnection.getSurveys().then(function (surveys) {
    const initialState = surveys;
    const reducer = function (state = initialState, action) {
        let surveysCopy = state.surveys.map(s => {return {...s}});
        switch (action.type) {
            case 'ADD': {
                return {
                    ...state,
                    surveys: [...state.surveys, {
                        title: action.payload.title,
                        description: action.payload.description,
                        category: action.payload.category,
                        image: null,
                        questions: []
                    }]
                };
            }
            case 'REMOVE':
                surveysCopy = surveysCopy.filter((s) => s.title !== action.payload.title);
                return {
                    ...state,
                    surveys: surveysCopy
                };
            case 'SET_TITLE':
                surveysCopy.find((s) => s.title === action.payload.oldTitle).title = action.payload.title;
                return {
                    ...state,
                    surveys: surveysCopy
                };
            case 'SET_DESC' :
                surveysCopy.find((s) => s.title === action.payload.title).description = action.payload.description;
                return {
                    ...state,
                    surveys: surveysCopy
                };
            case 'SET_IMAGE':
                surveysCopy.find((s) => s.title === action.payload.title).image = action.payload.url;
                return {
                    ...state,
                    surveys: surveysCopy
                };
            case 'SET_QUESTIONS':
                surveysCopy.find((s) => s.title === action.payload.title).questions = action.payload.questions;
                return {
                    ...state,
                    surveys: surveysCopy
                };
            default:
                return state;
        }
    };
    return configureStore({
        reducer: reducer
    });
})

export default storePromise;