// // App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Deadstock from './Pages/Deadstock';
import HomePage from './Pages/HomePage';
import Histroycard from './Pages/Historycard';
import Check from './Pages/Check'; // Import the Check component 
import AllHistoryCards from './Pages/AllHistoryCards' ; 
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Deadstock />}>
          <Route path='check' element={<Check />} />
        </Route>
        <Route path='/history_card' element={<Histroycard />} />
        <Route path='/specific_history_card' element={<AllHistoryCards></AllHistoryCards>} />
      </Routes>
    </Router>
  );
}

export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Deadstock from './Pages/Deadstock';
// import HomePage from './Pages/HomePage';
// import Historycard from './Pages/Historycard';
// import Check from './Pages/Check';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Function to set login status
//   const handleLogin = () => {
//     // Perform login logic here (e.g., authenticate user)
//     setIsLoggedIn(true);
//   };

//   // Function to set logout status
//   const handleLogout = () => {
//     // Perform logout logic here
//     setIsLoggedIn(false);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<HomePage onLogin={handleLogin} />} />
//         {/* Use Navigate to redirect if user tries to access protected routes without logging in */}
//         {!isLoggedIn ? <Navigate to="/" /> : null}

//         {/* Protected routes */}
//         {isLoggedIn && (
//           <>
//             <Route path='/dashboard' element={<Deadstock />} />
//             <Route path='/dashboard/check' element={<Check />} />
//             <Route path='/history_card' element={<Historycard />} />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
