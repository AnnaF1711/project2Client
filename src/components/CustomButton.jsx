function CustomButton(props) {
    return (
        <button
            className={props.className} // מקבל מחלקה מבחוץ כדי לשייך בקובץ ה-css
            style={{
                backgroundColor: "white",
                color: "black",
                textAlign: "center",
                border: "0px",
                paddingTop: "3px",
                paddingBottom: "3px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                ...props.style // למקרה שיהיו עוד הגדרות סטייל ששולחים מהקומפוננטה לכפתור
            }}
            disabled={props.disabled}
            onClick={props.action}
            type={props.type || "button"}
        >
            {props.text} {/*מה שכתוב כל הכפתור שלחים מבחוץ*/}
        </button>
    );
}

export default CustomButton;