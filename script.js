
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNedVI0vh5peqy5adW3naIIPAb-25WN8w",
  authDomain: "fs-ride-dd811.firebaseapp.com",
  projectId: "fs-ride-dd811",
  storageBucket: "fs-ride-dd811.firebasestorage.app",
  messagingSenderId: "151101089031",
  appId: "1:151101089031:web:5352d0d15fc1edd7a151a2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let currentUser = null;
const usdToInrRate = 83.2;

window.register = async function () {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert('Registration successful!');
  } catch (error) {
    alert(error.message);
  }
};

window.login = async function () {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Login successful!');
  } catch (error) {
    alert(error.message);
  }
};

window.logout = async function () {
  await signOut(auth);
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('app-section').style.display = 'none';
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    loadExpenses();
  } else {
    currentUser = null;
  }
});

window.addExpense = async function () {
  const date = document.getElementById('exp-date').value;
  const type = document.getElementById('exp-type').value;
  const usd = parseFloat(document.getElementById('exp-usd').value);
  const notes = document.getElementById('exp-notes').value;
  const inr = usd * usdToInrRate;

  await addDoc(collection(db, 'expenses'), {
    uid: currentUser.uid,
    date, type, usd, inr, notes
  });

  alert('Expense added!');
  loadExpenses();
};

async function loadExpenses() {
  const q = query(collection(db, 'expenses'), where('uid', '==', currentUser.uid));
  const querySnapshot = await getDocs(q);
  const list = document.getElementById('expenses-list');
  list.innerHTML = '';
  let totalUSD = 0;
  let totalINR = 0;
  querySnapshot.forEach((doc) => {
    const e = doc.data();
    totalUSD += e.usd;
    totalINR += e.inr;
    const li = document.createElement('li');
    li.textContent = `${e.date}: ${e.type} - $${e.usd} (~₹${e.inr.toFixed(2)}) [${e.notes}]`;
    list.appendChild(li);
  });
  document.getElementById('total-usd').textContent = `Total (USD): $${totalUSD.toFixed(2)}`;
  document.getElementById('total-inr').textContent = `Total (INR): ₹${totalINR.toFixed(2)}`;
}
