import { useState } from "react";
import "./Profile.css";
import CustomButton from "./CustomButton.jsx";
import CustomInput from "./CustomInput.jsx";

function Profile({ user, followers, following, onUpdateProfileImage, onUnfollowUser }) { // לא שולח את הבקשות אלא הדשבורד
    const [newImageUrl, setNewImageUrl] = useState("");
    const [localError,setLocalError] = useState("");
    // נציג את רשימות העוקבים/נעקבים ע״י כפתור - האם רוצים להציג אותם
    const [showFollowers,setShowFollowers] = useState(false);
    const [showFollowing,setShowFollowing] = useState(false);

    const handleUpdateImage = () => {
        setLocalError("");
        if (newImageUrl.trim() === "") {
            setLocalError("Please enter an image URL");
            return; // אם אין שום עדכון נצא - שלא תשלח בקשה סתם
        }
        onUpdateProfileImage(newImageUrl); // עדכון התמונה (זו מתודה בprops מהדשבורד ששולחת את הבקשה לשרת)
        setNewImageUrl(""); // ניקוי האינפוט אחרי עדכון התמונה
    };

    if (!user) {
        return <div>No profile data</div>;
    }

    return (
        <div className="profile-card">
            <div className="profile-header">
                {user.profileImageUrl && ( // הצגת התמונה
                    <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="profile-image"
                    />
                )}

                <div> {/*הצגת היוזרניים עם מספר עוקבים/נעקבים*/}
                    <div className="profile-username">{user.username}</div>

                    <div className="profile-stats">
                        <span>
                            <strong>{followers.length}</strong> followers
                        </span>
                        <span>
                            <strong>{following.length}</strong> following
                        </span>
                    </div>
                </div>
            </div>

            {/*מתחת לזה נציג את האפשרות לעדכן את תמונת הפרופיל עם אינפוט, כפתור והודעה מתאימה*/}
            <div className="profile-update-section">
                <CustomInput
                    type="text"
                    placeholder="New image URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="profile-input"
                />

                <CustomButton
                    text="Update"
                    action={handleUpdateImage}
                    className="profile-button"
                />
            </div>

            {localError && (
                <div className="profile-error">
                    {localError}
                </div>
            )}

            {/*מתחת לזה הכפתורים של הצגת הרשימות של העוקבים/נעקבים*/}
            <div className="profile-list-section">
                <div className="profile-toggle-buttons"> {/*הפרדה בין הכפתורים*/}
                    <CustomButton
                        text={showFollowers ? "Hide followers" : "Show followers"} // יציג לפי משתנה בוליאני שמתעדכן
                        action={() => setShowFollowers(!showFollowers)}
                        className="profile-toggle-button"
                    />

                    <CustomButton
                        text={showFollowing ? "Hide following" : "Show following"}
                        action={() => setShowFollowing(!showFollowing)}
                        className="profile-toggle-button"
                    />
                </div>

                {/*מתחת לכפתורים*/}
                {showFollowers && (
                    <div className="profile-list-box">
                        <span className="profile-label">Followers:</span>
                        {followers.length === 0 ? ( // אם אין עוקבים יציג הודעה אחרת יציג את העוקבים (שמות משתמש)
                            <div>No followers yet</div>
                        ) : (
                            followers.map((username) => (
                                <div
                                    key={username}
                                    className="profile-list-item"
                                >
                                    {username}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {showFollowing && (
                    <div className="profile-list-box">
                        <span className="profile-label">Following:</span>
                        {following.length === 0 ? (
                            <div>Not following anyone yet</div>
                        ) : (
                            following.map((username) => (
                                <div
                                    key={username}
                                    className="profile-list-item">
                                    <span>{username}</span>
                                    <button
                                        className="unfollow-button"
                                        onClick={() => onUnfollowUser(username)} // מקבל מקומפוננטת דשבורד
                                    >
                                        Unfollow
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;