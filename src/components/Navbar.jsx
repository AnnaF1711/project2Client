import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ display: "flex", gap: 20 }}>
            {/*בכל אחד מהנתיבים (עמודים) שכאן יציג את שלושת הנתיבים האלה לניווט לכל אחד*/}
            <Link to="/">Home</Link>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
        </nav>
    );
}

export default Navbar;
