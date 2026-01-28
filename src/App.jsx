import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import SolAcilirMenu from './components/SolAcilirMenu';
import GenelPage from './pages/GenelPage';
import telekomData from "./data/telekom.json";
import AnaLayout from './layout/AnaLayout.jsx';
import TelekomPage from './pages/altyapi/TelekomPage.jsx';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../src/firebase.js"


function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  console.log(telekomData)
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const docRef = await addDoc(collection(db, "users"), telekomData);

  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }   
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnaLayout />}>
           <Route index element={<GenelPage />} />
           <Route path="telekom" element={<TelekomPage />} />
        {/*  <Route path="altyapi" element={<AltyapiPage />} />
          <Route path="elektrik" element={<ElektrikPage />} />
          <Route path="yol/:id" element={<YolDetayPage />} /> */ }
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
