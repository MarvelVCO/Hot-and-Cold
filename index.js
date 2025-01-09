/* === Imports === */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; 
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; 
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"

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

const db = getFirestore(app);
console.log(db)

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

const signOutButtonEl = document.getElementById("sign-out-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")

const textareaEl = document.getElementById("post-input")
const postButtonEl = document.getElementById("post-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)

postButtonEl.addEventListener("click", postButtonPressed)

/* === Main Code === */

showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")
    const email = emailInputEl.value
    const password= passwordInputEl.value
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => showLoggedInView())
        .catch(error => console.error(error.message));
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
    const email = emailInputEl.value
    const password= passwordInputEl.value
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => showLoggedInView())
        .catch(error => console.error(error.message));
}

async function authSignOut() {
    console.log("Sign out")
    try {
        await signOut(auth)
        console.log("User signed out successfully")
        showLoggedOutView()
    } catch (error) {
        console.error("Error signing out: ", error.message)
    }
}

onAuthStateChanged(auth, user => {
    if (user) {
        showLoggedInView();
        const userGreetingEl = document.getElementById("user-greeting");

        showProfilePicture(userProfilePictureEl, user);
        showUserGreeting(userGreetingEl, user);
    } 
    else {
        showLoggedOutView();
    }
});


function showUserGreeting(element, user) {
    if (user.displayName) {
        const firstName = user.displayName.split(" ")[0];
        element.textContent = `Hi ${firstName}`;
    } 
    else {
        element.textContent = "Hi Guest";
    }
}


function showProfilePicture(imgElement, user) {
    if (user.photoURL) {
        imgElement.src = user.photoURL;
    } 
    else {
        imgElement.src = "assets/images/defaultPic.jpg";
    }
}

 

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
 }
 
 
 function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
 }
 
 
 function showView(view) {
    view.style.display = "flex"
 }
 
 
 function hideView(view) {
    view.style.display = "none"
 }

 function postButtonPressed() {
    const postBody = textareaEl.value
   
    if (postBody) {
        // addPostToDB(postBody)
        clearInputField(textareaEl)
    }
 }

//credit: coursera