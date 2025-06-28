
// Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyA-yTblkfcR8alCkGo2pV4dCZfQZB9ca5A",
  authDomain: "spark-tune.firebaseapp.com",
  projectId: "spark-tune",
  storageBucket: "spark-tune.appspot.com",
  messagingSenderId: "374476044903",
  appId: "1:374476044903:web:e2a0373692cb763e50f2c2"
};
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();

function signUp() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("message").textContent = "✅ Account created!";
    })
    .catch(err => {
      document.getElementById("message").textContent = "❌ " + err.message;
    });
}

function logIn() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("message").textContent = "✅ Logged in!";
      window.location.href = "upload.html";
    })
    .catch(err => {
      document.getElementById("message").textContent = "❌ " + err.message;
    });
}

async function uploadToUploadThing() {
  const fileInput = document.getElementById("uploadFile");
  const file = fileInput.files[0];
  if (!file) {
    document.getElementById("uploadThingMessage").textContent = "❌ No file selected.";
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch("https://uploadthing.com/api/v1/upload", {
      method: "POST",
      body: formData
    });
    const result = await response.json();
    if (result?.url) {
      document.getElementById("uploadThingMessage").innerHTML =
        `✅ Uploaded! <a href="${result.url}" target="_blank">${result.url}</a>`;
      setTimeout(() => {
        window.location.href = "success.html";
      }, 2000);
    } else {
      document.getElementById("uploadThingMessage").textContent = "❌ Upload failed.";
    }
  } catch (err) {
    console.error("UploadThing error:", err);
    document.getElementById("uploadThingMessage").textContent = "❌ Error during upload.";
  }
}
