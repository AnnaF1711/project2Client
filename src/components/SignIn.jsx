import { useState } from "react";
import CustomButton from "./CustomButton.jsx";
import CustomInput from "./CustomInput.jsx";

function SignIn(){
    const [username,setUsername]=useState ("");
    const [password,setPassword]=useState ("");

    function handleSignIn() {
        // סתם משהו בסיסי - בהמשך נכתוב כאן את הבקשה לשרת שבודקת שהיוזר אכן קיים ואם הוא קיים אז יבדוק אם הססמה נכונה (אבל זה יהיה בשרת בקונטרולר - ולידציה)
       // fetch('http://localhost:8081/sign-in') - זה יהיה הפורט 8081 וזה מה שנגדיר בשרת

        // כדי להגדיר את הפורט בצד שרת ב properties:
        // server.port=8081

        if (username === "" || password === "") {
            alert("Please fill all fields");
            return;
        }
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