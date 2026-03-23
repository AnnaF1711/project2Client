function CustomInput(props) {
    return (
        <input
            className={props.className} // מקבל מחלקה מבחוץ כדי לשייך בקובץ ה-css
            style={{
                margin: 3,
                border: 0,
                borderBottom: "1px solid black",
                backgroundColor: "transparent",
                color: "black",
                ...props.style // למקרה שיהיו עוד הגדרות סטייל ששולחים מהקומפוננטה לכפתור
            }}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
        />
    );
}

export default CustomInput;