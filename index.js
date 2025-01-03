/* === Imports === */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; 
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; 

/* === Firebase Setup === */

const firebaseConfig = {
    apiKey: "AIzaSyD7WHLGuFIitacGPNlIhNz_r1psUdfPNPI",
    authDomain: "hot-and-cold-58ffb.firebaseapp.com",
    projectId: "hot-and-cold-58ffb",
    storageBucket: "hot-and-cold-58ffb.firebasestorage.app",
    messagingSenderId: "668991863284",
    appId: "1:668991863284:web:568bd01d2f4b0a533c21a1"
  };

const app= initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth)

console.log(app.options.projectId)


/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */

showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
    const email = emailInputEl.value
    const password= passwordInputEl.value
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => showLoggedInView())
        .catch(error => console.error(error.message));
}


/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}

//credit: coursera