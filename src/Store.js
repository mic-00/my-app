import {configureStore} from "@reduxjs/toolkit";
import FirebaseConnection from "./FirebaseConnection";

const firebaseConnection = new FirebaseConnection();

const storePromise = firebaseConnection.getSurveys().then(function (surveys) {
    const initialState = surveys;
    const reducer = function (state = initialState, action) {
        switch (action.type) {
            case 'ADD': {
                return {
                    ...state,
                    surveys: [...state.surveys, {
                        title: action.payload.title,
                        description: action.payload.description,
                        category: action.payload.category,
                        image: null
                    }]
                };
            }
            case 'REMOVE': {
                const surveysCopy = state.surveys
                    .map(s => {return {...s}})
                    .filter((s) => s.title !== action.payload.title);
                return {
                    ...state,
                    surveys: surveysCopy
                };
            }
            case 'SET_TITLE': {
                const surveysCopy = state.surveys.map(s => {return {...s}});
                surveysCopy.find((s) => s.title === action.payload.oldTitle).title = action.payload.title;
                return {
                    ...state,
                    surveys: surveysCopy
                };
            }
            case 'SET_DESC' : {
                const surveysCopy = state.surveys.map(s => {return {...s}});
                surveysCopy.find((s) => s.title === action.payload.title).description= action.payload.description;
                return {
                    ...state,
                    surveys: surveysCopy
                };
            }
            case 'SET_IMAGE': {
                const surveysCopy = state.surveys.map(s => {return {...s}});
                surveysCopy.find((s) => s.title === action.payload.title).image = action.payload.url;
                return {
                    ...state,
                    surveys: surveysCopy
                };
            }
            default:
                return state;
        }
    };
    return configureStore({
        reducer: reducer
    });
})

export default storePromise;