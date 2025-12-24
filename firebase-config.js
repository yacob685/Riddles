// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDemoKeyForDevelopmentEnvironment",
    authDomain: "monday-work-os.firebaseapp.com",
    projectId: "monday-work-os",
    storageBucket: "monday-work-os.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcdef"
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