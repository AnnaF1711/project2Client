import { useState } from "react";
import CustomButton from "./CustomButton.jsx";
import CustomInput from "./CustomInput.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";


function SignIn(){
    const [username,setUsername]=useState ("");
    const [password,setPassword]=useState ("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorCode, setErrorCode] = useState(null);
    const navigate = useNavigate() // בשבביל המעבר לדשבורד (נתיב אחר)


    const handleSignIn = () => {
        setErrorCode("");

        if (username.trim() === "") {
            setErrorCode("Please enter a username");
            return;
        }
        if (password.trim() === "") {
            setErrorCode("Please enter a password");
            return;
        }

        axios.post("http://localhost:8080/sign-in", {username, password,})
            .then((response) => {
                if (response.data.success) {
                    if (response.data.token) {
                        Cookies.set("token", response.data.token); // שמירת טוקן עבור המשתמש
                    }
                    navigate("/dashboard", { replace: true }); // מעבר לדשבורד
                } else {
                    setErrorCode("Invalid username or password");
                }
            })
            .catch(() => {
                setErrorCode("Server error. Please try again.");
            });
    };

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
                type={showPassword ? "text" : "password"} // הסתרה בעת הכנסת הססמה
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