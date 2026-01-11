import {Link, Route} from "react-router-dom";

function Navbar (){
    return(
        <nav style ={{display :"flex", gap:20}}>
            <Link to ={"/"} > Home Page</Link>
            <Link to ={"/"} > Sign Up</Link>
            {/*<Link to ={"/"} > Home Page</Link>*/}


        </nav>
    )

}
export default Navbar;
