import { useState } from "react";
import CustomButton from "./CustomButton.jsx";
import CustomInput from "./CustomInput.jsx";
import axios from "axios";

function SignUp(){
    const [username,setUsername]=useState ("");
    const [password,setPassword]=useState ("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [errorCode, setErrorCode] = useState(null);


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
                type="text"
                placeholder ={"Choose a username"}
                value={username}
                onChange={(event)=>{
                    setUsername(event.target.value)
                }}
            />

            <CustomInput
                type="password"
                placeholder={"Choose a password"}
                value={password}
                onChange={(event)=>{
                    setPassword(event.target.value)
                }}
            />

            <CustomButton
                text="Sign Up"
                disabled={username.length === 0 || password.length === 0 || buttonDisabled} // מתי הכפתור לא יהיה לחיץ
                action={() => {
                    setButtonDisabled(true); // לא יהיה לחיץ כל עוד שולח בקשה (הזין כבר פרטים)
                    axios.post("http://localhost:8080/register-user",{name:username,password:password}).
                    then((response)=>{
                        console.log(response.data)
                        setButtonDisabled(false) // אחרי שחזרה תגובה הכפתור יהיה לחיץ (ניתן להירשם)
                        if (response.data.success) { // אם ההרשמה הצליחה נרוקן את תוכן האינפוטים כדי לאפשר להכניס ערכים חדשים
                            setUsername("");
                            setPassword("")
                        } else {
                            setErrorCode(response.data.errorCode); // אחרת נעדכן את השגיאה (שמוצגת בעמוד אם היא קיימת)
                        }
                    })
                }}
            />

        </div>
    )
}
export default SignUp;