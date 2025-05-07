import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-app.js';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-analytics.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCBo562gI0o8z9xnPS5Q_bJGmHWYOEJuNg',
	authDomain: 'lab4-5a341.firebaseapp.com',
	projectId: 'lab4-5a341',
	storageBucket: 'lab4-5a341.firebasestorage.app',
	messagingSenderId: '180864228356',
	appId: '1:180864228356:web:de4715ff212ac1b9bfe951',
	measurementId: 'G-6DMRVWDWYZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector('#signInButton');
const signOutButton = document.querySelector('#signOutButton');
const nameInput = document.querySelector('#firstName');
const emailInput = document.querySelector('#email');
const userSignIn = async () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user;
			nameInput.value = user.displayName;
			emailInput.value = user.email;
			console.log(user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
};
const userSignOut = async () => {
	signOut(auth)
		.then(() => {
			alert('You have been signed out!');
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
};
onAuthStateChanged(auth, (user) => {
	if (user) {
		nameInput.value = user.displayName;
		emailInput.value = user.email;
		alert('You are authenticated with Google');
		console.log(user);
	}
});
signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);
