function CustomButton(props) {

    return (
        <span>
            <button
                style={{
                    backgroundColor: 'WHITE',
                    color:'black',//הצבע של הכפתור עצמו כהה, שינינו את הצבע של התוכן ללבן על מנת שנוכל לראות
                    border: '0px',
                    paddingTop: '3px',
                    paddingBottom: '3px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    borderRadius: '5px',

                }}
                text={props.text}
                disabled={props.disabled}
                onClick={props.action}>{/*גם פה מקבל disable מבחוץ*/}
            </button>
        </span>
    )
}

export default CustomButton;