import { useEffect, useState } from "react";
import CustomInput from "./CustomInput.jsx";
import CustomButton from "./CustomButton.jsx";
import "./UserSearch.css";

function UserSearch({ results, onSearch, onFollowUser }) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query.trim() === "") { // אם לא הוכנס תו שהוא לא רווחה לא ישלח בקשה
            onSearch(""); // אין מה לחפש
            return;
        }
        onSearch(query.trim()); // מה שישלח לבקשה (תווים לחיפוש שם משתמש) ללא רווחים (ערך תקין)
    }, [query, onSearch]); // מתעדכן בכל שינוי שלהם

    return (
        <div className="user-search-card">
            <h3 className="user-search-title">Search other users</h3>

            <div className="user-search-input-wrapper">
                <CustomInput
                    type="text"
                    placeholder="Enter a username"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="user-search-input"
                />
            </div>

            {query.trim() !== "" && ( // אם האינפוט לא ריק
                <div className="user-search-dropdown">
                    {results.length === 0 ? ( // אם אין יוזר כזה
                        <div className="user-search-empty">No users found</div>
                    ) : ( // אם יש יוזר כזה יציג אותו ולידו כפתור למעקב
                        results.map((username) => (
                            <div key={username} className="user-search-item">
                                <span className="user-search-name">
                                    {username}
                                </span>

                                <CustomButton
                                    text="Follow"
                                    action={() => onFollowUser(username)}
                                    className="user-search-follow-button"
                                />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default UserSearch;