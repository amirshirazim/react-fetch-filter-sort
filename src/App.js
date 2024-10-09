import './App.css';
import React from 'react';
import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {BrowserRouter,Route,Routes,NavLink} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App Container">
     {/* <h3 className="d-flex jusity-content-center md-3">React JS Frontend</h3>    */}
    <nav className="navbar  navbar-expand-md bg-body-tertiary justify-content-center">
      <ul className='navbar nav mb-2'>
        <li className='nav-item m-1'>
          <NavLink className="btn btn-light btn-outline-primary" to={"/home"}>
           Home
          </NavLink>
        </li>
        <li className='nav-item m-1'>
          <NavLink className="btn btn-light btn-outline-primary" to="/department">
              Department
          </NavLink>
        </li>
        <li className='nav-item m-1'>
          <NavLink className="btn btn-light btn-outline-primary" to="/employee">
            Employee
          </NavLink>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path='/home'  element={<Home/>}/>
      <Route path='/department'  element={<Department/>}/>
      <Route path='/employee'  element={<Employee/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
