import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKSpg6rEK-DJ0_XNmvxj_DAwfmeDE5XkE",
    authDomain: "trial-6c107.firebaseapp.com",
    projectId: "trial-6c107",
    storageBucket: "trial-6c107.appspot.com",
    messagingSenderId: "883705435651",
    appId: "1:883705435651:web:f653819835e7c2f46fe036"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get the authentication object
const auth = getAuth(firebaseApp);

// Get references to the HTML elements
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Add an event listener to the login form
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    // Sign in with Firebase authentication
    await signInWithEmailAndPassword(auth, username, password);
    // User is signed in, redirect to the index.html page
    window.location.href = "index.html";
  } catch (error) {
    // Handle errors (e.g., display an error message)
    alert("Error: " + error.message);
  }
});

  


