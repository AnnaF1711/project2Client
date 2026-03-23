import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import './App.css'

function App() {

  return (
    <div>
         <BrowserRouter> {/*בסה״כ דואג לניתוב של העמודים */}
             <Navbar /> {/*יוצג בכל העמודים בroutes*/}
            <Routes>
                <Route path={"/"} element={<HomePage />}/>
                <Route path={"/sign-up"} element={<SignUp />}/>
                <Route path={"/sign-in"} element={<SignIn />}/>
                <Route path={"/dashboard"} element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
