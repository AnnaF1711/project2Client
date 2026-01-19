import { useState } from "react";
import CustomButton from "./CustomButton.jsx";
import CustomInput from "./CustomInput.jsx";
import axios from "axios";

function SignIn(){
    const [username,setUsername]=useState ("");
    const [password,setPassword]=useState ("");

    function handleSignIn() { // תישלח בקשת גט לשרת בכל לחיצת כפתור התחברות
        // סתם משהו בסיסי - בהמשך נכתוב כאן את הבקשה לשרת שבודקת שהיוזר אכן קיים ואם הוא קיים אז יבדוק אם הססמה נכונה (אבל זה יהיה בשרת בקונטרולר - ולידציה)
       // fetch('http://localhost:8080/sign-in') - זה יהיה הפורט 8080 וזה מה שנגדיר בשרת

        // כדי להגדיר את הפורט בצד שרת ב properties:
        // server.port=8080

        fetch("http://localhost:8080/hello")
            .then(res => res.text())
            .then(data => alert(data)) // מציג את התשובה
            .catch(err => console.error("Error:", err));
    }

    return(
        <div>
            <CustomInput
                placeholder ={"Enter your username"}
                value={username}
                onChange={(event)=>{
                    setUsername(event.target.value)
                }}
            />

            <CustomInput
                placeholder ={"Enter your password"}
                value={password}
                onChange={(event)=>{
                    setPassword(event.target.value)
                }}
            />

            <CustomButton
                text="Sign In"
                action={handleSignIn}
            />

        </div>
    )
}
export default SignIn;