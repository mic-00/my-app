import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {addDoc, collection, deleteDoc, getDoc, getDocs, query, updateDoc, where} from 'firebase/firestore';
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
        this.setDocRefs();
    }

    setDocRefs() {
        let docRefsTemp = this.docRefs;
        getDocs(query(collection(this.db, 'surveys'))).then(function (querySnapshot) {
            querySnapshot.docs.forEach(doc => {
                const title = doc.data().title;
                docRefsTemp[title] = doc.ref;
            });
        });
    }

    getSurveys() {
        const getImage = this.getImage.bind(this);
        const querySurveys = query(collection(this.db, 'surveys'));
        return getDocs(querySurveys).then(function (querySnapshot) {
            let surveys = {
                title: [],
                description: [],
                category: [],
                image: []
            }
            //chain of promises
            const nextPromise = (promises, i) => {
                console.log(surveys);
                if (i < querySnapshot.docs.length) {
                    return promises[i].then(() => nextPromise(promises, ++i));
                } else {
                    return surveys;
                }
            };
            return nextPromise(
                querySnapshot.docs.map(function (doc) {
                    return getImage(doc.data().title).then(function(url) {
                        surveys = {
                            ...surveys,
                            title: [...surveys.title, doc.data().title],
                            description: [...surveys.description, doc.data().description],
                            category: [...surveys.category, doc.data().category],
                            image: [...surveys.image, url]
                        };
                        return surveys;
                    });
                }),
                0
            );
        });
    }

    getImage(title) {
        const storageRef = ref(this.storage, 'logo.png');
        return getDownloadURL(storageRef);
    }

    addSurvey(survey) {
        let docRefsTemp = this.docRefs;
        return addDoc(collection(this.db, 'surveys'), survey).then(function (ref) {
            docRefsTemp[survey.title] = ref;
            return ref;
        });
    }

    addImage(file, title) {
        const storageRef = ref(this.storage, `${title}.png`);
        const docRefsTemp = this.docRefs;
        return uploadBytes(storageRef, file).then(function (uploadResult) {
            return getDownloadURL(storageRef).then(function (url) {
                return updateDoc(docRefsTemp[title], {src: url}).then(url => url)
            });
        });
    }

    deleteSurvey(title, success) {
        const q = query(
            collection(this.db, 'surveys'),
            where('title', '==', title)
        );
        getDocs(q).then(function (querySnapshot) {
            querySnapshot.forEach((doc) => deleteDoc(doc.ref))
        })
    }
    /*
    updateSurvey(survey, success) {
        updateDoc(doc())
    }*/
}