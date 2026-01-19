import { useState } from "react";
import CustomButton from "./CustomButton.jsx";
import CustomInput from "./CustomInput.jsx";
import axios from "axios";

function SignIn(){
    const [username,setUsername]=useState ("");
    const [password,setPassword]=useState ("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorCode, setErrorCode] = useState(null);


    function handleSignIn() { // תישלח בקשת גט לשרת בכל לחיצת כפתור התחברות
        axios.post("http://localhost:8080/sign-in",{name:username,password:password}) // בקשת פוסט למרות שלא מפרסמים מידע חדש - כדי שהססמה לא תהיה גלויה בנתיב
            .then((response) => {
                if (response.data.success) {
                    alert("Success");
                } else {
                    setErrorCode(response.data.errorCode);
                }
            })
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