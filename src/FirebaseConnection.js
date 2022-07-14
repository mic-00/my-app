import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {addDoc, collection, deleteDoc, getDocs, query, updateDoc} from 'firebase/firestore';
import {getStorage, getDownloadURL, ref, uploadBytes} from 'firebase/storage';

export default class FirebaseConnection {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyACxNl6WE-P0sSCKJeK-c8cj9OpRYYp3S4",
            authDomain: "my-app-f614f.firebaseapp.com",
            projectId: "my-app-f614f",
            storageBucket: "my-app-f614f.appspot.com",
            messagingSenderId: "853772854799",
            appId: "1:853772854799:web:a4d662790a2178dcf4657a",
            measurementId: "G-GL29VLGV1V"
        };
        const app = firebase.initializeApp(this.firebaseConfig);
        this.db = firebase.firestore();
        this.storage = getStorage();

        this.docRefs = {};
        this.initDocRefs();
    }

    initDocRefs() {
        getDocs(query(collection(this.db, 'surveys'))).then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
                const title = doc.data().title;
                this.docRefs[title] = doc.ref;
            });
        });
    }

    getSurveys() {
        const getImage = this.getImage.bind(this);
        const querySurveys = query(collection(this.db, 'surveys'));
        return getDocs(querySurveys).then(function (querySnapshot) {
            let surveys = {
                surveys: []
            }
            //chain of promises
            const nextPromise = (promises, i) => {
                if (i < querySnapshot.docs.length) {
                    return promises[i].then(() => nextPromise(promises, ++i));
                } else {
                    return surveys;
                }
            };
            return nextPromise(
                querySnapshot.docs.map(function (doc, i) {
                    return getImage(doc.data().title).then(function(url) {
                        surveys.surveys.push({
                                id: i,
                                title: doc.data().title,
                                description: doc.data().description,
                                category: doc.data().category,
                                image: url,
                                questions: doc.data().questions
                            });
                        return surveys;
                    });
                }),
                0
            );
        });
    }

    getImage(title) {
        const storageRef = ref(this.storage, `${title}.png`);
        return getDownloadURL(storageRef).catch(() => null);
    }

    addSurvey(survey) {
        return addDoc(collection(this.db, 'surveys'), survey)
            .then((ref) => {
                this.docRefs[survey.title] = ref;
                return ref;
            });
    }

    setImage(file, title) {
        const storageRef = ref(this.storage, `images/${title}.png`);
        return uploadBytes(storageRef, file)
            .then(() =>
                this.getImage(title)
                    .then((url) => {
                        updateDoc(this.docRefs[title], {image: url});
                        return url;
                    })
            );
    }

    deleteSurvey(title) {
        return deleteDoc(this.docRefs[title])
            .then(() => delete this.docRefs[title]);
    }

    setTitle(oldTitle, title) {
        return updateDoc(this.docRefs[oldTitle], {title});
    }

    setCategory(title, category) {
        return updateDoc(this.docRefs[title], {category});
    }

    setDescription(title, description) {
        return updateDoc(this.docRefs[title], {description});
    }

    setQuestions(title, questions) {
        return updateDoc(this.docRefs[title], {questions});
    }

}