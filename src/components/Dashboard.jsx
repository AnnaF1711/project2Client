// נציג את הדשבורד אחרי המסך של SignIn
// מכאן ננהל את כל הבקשות שיהיו לשרת שבאות אחרי ההתחברות
// כאן נציג את תתי הקומפוננטות פיד, יוזר-פוסטס, פרופיל שזה יהיה נטו ui והן יקבלו בפרופס מהדשבורד את מה שצריך להציג בהן
// את הcallbacks של הבקשות עבור כל קומפוננטה ננהל מהדשבורד
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile.jsx";
import UserPosts from "./UserPosts.jsx";
import Feed from "./Feed.jsx";

function Dashboard({ username, password }) {

    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [following, setFollowing] = useState([]); //  שמות משתמש של יוזרים שהיוזר המחובר (אני) עוקב אחריהם
    const [myPosts, setMyPosts] = useState([]);  // הפוסטים של היוזר המחובר
    const [feedPosts, setFeedPosts] = useState([]); // פיד נעקבים - 20 פוסטים אחרונים
    const [loading, setLoading] = useState(true); // כל לא חזרו תגובות את כל הבקשות מהשרת של מה שצריך להציג בדשבורד - יציג loading לפי משתנה בוליאני


    // =======================================================
    // פונקציות שטוענות את כל החלקים של הדשבורד ע״י שליחת הבקשות לשרת (יוצגו רק כאשר התקבלו תגובות ל*כל* הבקשות)
    const loadProfile = (onRequestFinished) => {
        axios
            .post("http://localhost:8080/dashboard/profile", null, {
                params: { username, password },
            })
            .then((res) => {
                if (res.data.success) {
                    setProfileImageUrl(res.data.user?.profileImageUrl || null);
                }
            })
            .catch(() => {
                alert("Failed to load profile");
            })
            .then(() => {
                onRequestFinished();
            });
    };

    const loadFollowing = (onRequestFinished) => {
        axios
            .post("http://localhost:8080/dashboard/following", null, {
                params: { username, password },
            })
            .then((res) => {
                if (res.data.success) {
                    setFollowing(res.data.data || []);
                }
            })
            .catch(() => {
                alert("Failed to load following");
            })
            .then(() => {
                onRequestFinished();
            });
    };

    const loadMyPosts = (onRequestFinished) => {
        axios
            .post("http://localhost:8080/dashboard/my-posts", null, {
                params: { username, password },
            })
            .then((res) => {
                if (res.data.success) {
                    setMyPosts(res.data.data || []);
                }
            })
            .catch(() => {
                alert("Failed to load my posts");
            })
            .then(() => {
                onRequestFinished();
            });
    };

    const loadFeed = (onRequestFinished) => {
        axios
            .post("http://localhost:8080/dashboard/feed", null, {
                params: { username, password },
            })
            .then((res) => {
                if (res.data.success) {
                    setFeedPosts(res.data.data || []);
                }
            })
            .catch(() => {
                alert("Failed to load feed");
            })
            .then(() => {
                onRequestFinished();
            });
    };

    // =======================================================
    // פעולות שהמשתמש יעשה - עדכונים בפרופיל

    const updateProfileImage = (newImageUrl) => {
        axios
            .post("http://localhost:8080/dashboard/profile-image", null, {
                params: { username, password, imageUrl: newImageUrl },
            })
            .then((res) => {
                if (res.data.success) {
                    setProfileImageUrl(newImageUrl);
                } else {
                    alert("Error: " + res.data.errorCode);
                }
            })
            .catch(() => {
                alert("Failed to update profile image");
            });
    };

    const followUser = (targetUsername) => {
        axios
            .post("http://localhost:8080/dashboard/follow", null, {
                params: { username, password, targetUsername },
            })
            .then((res) => {
                if (res.data.success) {
                    setFollowing((prev) => [...prev, targetUsername]); // עדכון רשימת הנעקבים שהייתה עד כה יחד עם המשתנה הנעקב החדש
                    loadFeed(() => {}); // רענון הפיד כי היה שינוי בנעקבים של היוזר ולכן יכול להיות שינוי בפוסטים שיציג לו בפיד (רק במקרה הזה יש שינוי כזה שצריך לעשות שוב load לרכיב אחר)
                } else {
                    alert("Error: " + res.data.errorCode);
                }
            })
            .catch(() => {
                alert("Failed to follow user");
            });
    };

    const createPost = (text) => {
        axios
            .post("http://localhost:8080/dashboard/new-post", null, {
                params: { username, password, content: text },
            })
            .then((res) => {
                if (res.data.success) {
                    setMyPosts((prev) => [res.data.data, ...prev]); // יביא את כל הפוסטים שהיו עד כה כולל החדש
                } else {
                    alert("Error: " + res.data.errorCode);
                }
            })
            .catch(() => {
                alert("Failed to create post");
            });
    };

    // =======================================================
    // טעינה ראשונית של הדשבורד - נמצא אחרי המתודות של הבקשות לשרת כדי שנוכל לגשת אליהן כאן
    useEffect(() => {
       // loading=true תזכורת ש
        let requestsLeft = 4; // כמה בקשות עוד לא הסתיימו
        const onRequestFinished = () => { // מה שנעביר לכל בקשה לשרת של רכיבי הדשבורד כדי שנוכל לעקוב כמה בקשות עוד נותרו, רק כאשר אחרי הבקשה האחרונה נקבל 0 אז bשנה את הערך של לואדינג לפולס ונוכל להציג את רכיבי הדשבורד
            requestsLeft = requestsLeft - 1;
            if (requestsLeft === 0) {
                setLoading(false); // רק כשכולן הסתיימו נוכל להציג את מה שחזר (את רכיבי הדשבורד)
            }
        };
        // שליחת הבקשות להצגת רכיבי הדשבורד:
        loadProfile(onRequestFinished);
        loadFollowing(onRequestFinished);
        loadMyPosts(onRequestFinished);
        loadFeed(onRequestFinished);
    }, []);

    // =======================================================

    return (
        <div>
            {loading ? ( // כל עוד loadin=true יציג הודעה שבטעינה
                <div>
                    Loading dashboard...
                </div>
            ) : ( // כאשר חזרו תדובות לכל הבקשות לשרת להצגת כל פרטי הדשבורד ו- loading=false:
                <>
                    <h2>Dashboard</h2>

                    <Profile
                        username={username}
                        profileImageUrl={profileImageUrl}
                        following={following}
                        onUpdateProfileImage={updateProfileImage}
                        onFollowUser={followUser}
                    />

                    <UserPosts
                        posts={myPosts}
                        onCreatePost={createPost}
                    />

                    <Feed
                        posts={feedPosts}
                    />
                </>
            )}
        </div>
    );

}

export default Dashboard;
