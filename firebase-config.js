// Firebase Configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-3kAk-lMT3jTny2YIs2R1_0mG-tJlmJI",
  authDomain: "puzzlesapp.firebaseapp.com",
  databaseURL: "https://puzzlesapp-default-rtdb.firebaseio.com",
  projectId: "puzzlesapp",
  storageBucket: "puzzlesapp.firebasestorage.app",
  messagingSenderId: "303461259730",
  appId: "1:303461259730:web:a1790a976b6d58d71dd00b",
  measurementId: "G-8YEJEBX0NE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code == 'unimplemented') {
            console.log('The current browser does not support persistence.');
        }
    });

// Authentication state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user);
        showMainApplication(user);
    } else {
        console.log('User is signed out');
        showAuthScreen();
    }
});

// Utility functions
function getUserData() {
    return new Promise((resolve, reject) => {
        const user = auth.currentUser;
        if (user) {
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        resolve({ ...user, ...doc.data() });
                    } else {
                        resolve(user);
                    }
                })
                .catch(reject);
        } else {
            reject(new Error('No user is currently signed in'));
        }
    });
}

function saveUserData(data) {
    const user = auth.currentUser;
    if (user) {
        return db.collection('users').doc(user.uid).set(data, { merge: true });
    }
    return Promise.reject(new Error('No user is currently signed in'));
}
