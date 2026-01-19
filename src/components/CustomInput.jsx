function CustomInput(props){
    return (
        <input
            style={{
                margin:3,
                border:0,
                borderBottom:"10x solid black",
                backgroundColor:"transparent",
                color:"black"
            }}
            type={props.typ}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
        />
    )

}

export default CustomInput;