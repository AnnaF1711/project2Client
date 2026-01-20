import { useState } from "react";
import CustomButton from "./CustomButton.jsx";
import CustomInput from "./CustomInput.jsx";
import axios from "axios";
import Dashboard from "./Dashboard.jsx";

function SignIn(){
    const [username,setUsername]=useState ("");
    const [password,setPassword]=useState ("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorCode, setErrorCode] = useState(null);
    const [signedIn, setSignedIn] = useState(false); // בשביל המעבר לדשבורד


    function handleSignIn() { // תישלח בקשה לשרת בכל לחיצת כפתור התחברות
        axios.post("http://localhost:8080/sign-in",{username:username,password:password}) // בקשת פוסט למרות שלא מפרסמים מידע חדש - כדי שהססמה לא תהיה גלויה בנתיב
            .then((response) => {
                if (response.data.success) {
                    //alert("Success");
                    setSignedIn(true); // מעבר לדשבורד שמציג את כל המידע בחשבון של היוזר אחרי ההתחברות
                } else {
                    setErrorCode(response.data.errorCode);
                    setSignedIn(false);
                }
            })
    }

    if (signedIn) {
        return <Dashboard username={username} password={password} />; // מעבר לדשבורד אם ההתחברות הצליחה
    }

    return(
        <div>

            {
                errorCode != null && (
                    <>
                        Something went wrong
                        <div>
                            error {errorCode}
                        </div>
                    </>
                )
            }

            <CustomInput
                type={"text"}
                placeholder ={"Enter your username"}
                value={username}
                onChange={(event)=>{
                    setUsername(event.target.value)
                }}
            />

            <CustomInput
                type={"password"} // הסתרה בעת הכנסת הססמה
                placeholder ={"Enter your password"}
                value={password}
                onChange={(event)=>{
                    setPassword(event.target.value)
                }}
            />

            <button onClick={() => { // כפתור להצגת הססמה שמוזנת באינפוט
                setShowPassword(!showPassword)
            }}>
                {showPassword ? "Hide" : "Show"}
            </button>

            <CustomButton
                text={"Sign In"}
                action={handleSignIn}
            />

        </div>
    )
}
export default SignIn;