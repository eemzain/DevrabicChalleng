import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersPage from './UsersPage';
import ProductsPage from './ProductsPage';

const App = () => {
  return (
    // "text-white text-2xl font-bold"
    <Router>
      <header className="bg-black py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">Devrabic Web Site</h1>
          <ul className="flex space-x-4">
            <li>
              <a className="text-white hover:text-2xl" href="/">Home</a>
            </li>
            <li>
              <a className="text-white hover:text-2xl" href="/users">Users</a>
            </li>
            <li>
              <a className="text-white hover:text-2xl" href="/products">Products</a>
            </li>
          </ul>
        </nav>

      </header>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>

    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/users">Users</Link>
    //         </li>
    //         <li>
    //           <Link to="/products">Products</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //     <Routes>
    //       <Route path="/users" element={<UsersPage />}/>
    //       <Route path="/products" element={<ProductsPage />}/>

    //     </Routes>
    //   </div>
    // </Router>
  );
};


export default App;













// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js2</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
