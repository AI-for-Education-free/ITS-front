import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Button } from "semantic-ui-react";


import { useSelector, useDispatch } from 'react-redux';



import './App.css';
import "semantic-ui-css/semantic.min.css";

import { Login, SignUp, JavaProgramExercise, Home } from './pages';

import Header from "./components/Header";
import Footer from './components/Footer';
import "./components/layouts/variables.css";
import { setName, userSelector } from './redux/reducers/user';
import { globalSelector } from './redux/reducers/global';

const App = () => {
  const { name } = useSelector(userSelector);
  const { hasFooter } = useSelector(globalSelector);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <BrowserRouter>
        <Header fetchState={{ "pending": false }} user={{ "username": "dream", "isDonating": false }} />
        <main>
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />}></Route>
              <Route path="sign-up" element={<SignUp />}></Route>
              <Route path="home" element={<Home />}></Route>
              <Route path="java/exercise/detail/:exerciseId" element={<JavaProgramExercise/>}></Route>
            </Route>
          </Routes>
          {/* <Link to="/student/dream/exercise/524223040" className='button'><Button color="green"  style={{"marginTop": "100px"}}>做题界面</Button></Link> */}
          
          {/* <div>
            <button onClick={() => {
              if (name === "") {
                dispatch(setName("dream"));
              } else {
                dispatch(setName(""));
              }
            }}>
              {name === "" ? "登入" : "退出"}
            </button>
            用户：{name}
          </div> */}

        </main>

        {hasFooter && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;