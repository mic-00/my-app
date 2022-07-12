import {configureStore} from "@reduxjs/toolkit";
import FirebaseConnection from "./FirebaseConnection";

const firebaseConnection = new FirebaseConnection();

const storePromise = firebaseConnection.getSurveys().then(function (surveys) {
    const initialState = {
        title: surveys.title,
        description: surveys.description,
        category: surveys.category,
        image: surveys.image
    };
    const reducer = function (state = initialState, action) {
        switch (action.type) {
            case 'ADD': {
                return {
                    ...state,
                    title: [...state.title, action.payload.title],
                    description: [...state.description, action.payload.description],
                    category: [...state.category, action.payload.category],
                    image: [...state.image, null]
                };
            }
            case 'ADD_IMAGE': {
                //const survey = state.surveys.find((s) => s.title === action.payload.title);
                return {
                    ...state,
                    image: [...state.image, action.payload.url]
                };
            }
            default:
                return state;
        }
    };
    const store = configureStore({
        reducer: reducer
    });
    return store;
})

export default storePromise;