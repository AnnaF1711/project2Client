import CustomButton from "./CustomButton.jsx";
import CustomInput from "./CustomInput.jsx";

function SignUp(){
    const [username,setUsername]=useState ("");
    const [password,setPassword]=useState ("");

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
            Sign up
            />

        </div>
    )
}
export default SignUp;