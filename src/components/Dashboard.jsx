// נציג את הדשבורד אחרי המסך של SignIn
// מכאן ננהל את כל הבקשות שיהיו לשרת שבאות אחרי ההתחברות
// כאן נציג את תתי הקומפוננטות פיד, יוזר-פוסטס, חיפוש משתמשים, פרופיל שזה התמונה והפוסטים שלי - יהיה נטו ui והן יקבלו בפרופס מהדשבורד את מה שצריך להציג בהן
// את הcallbacks של הבקשות עבור כל קומפוננטה ננהל מהדשבורד
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Profile from "./Profile.jsx"; // שם משתמש+תמונה
import UserPosts from "./UserPosts.jsx"; // הפוסטים שלי
import Feed from "./Feed.jsx"; // פוסטים של מי שאני עוקבת אחריהם
import UserSearch from "./UserSearch.jsx"; // חיפוש משתמשים למעקב

function Dashboard() {
    const [user, setUser] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [feedPosts, setFeedPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [followers, setFollowers] = useState([]); // נעקים שלי (בפרופיל)
    const [following, setFollowing] = useState([]); // עוקבים שלי (בפרופיל)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = Cookies.get("token");

    useEffect(() => {
        if (!token) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }
        // הבקשות שנשלחות מיד כדי להציג את רכיבי הדשבורד:
        Promise.all([
            axios.get("http://localhost:8080/dashboard/profile", {
                headers: { Authorization: token }
            }),
            axios.get("http://localhost:8080/dashboard/my-posts", {
                headers: { Authorization: token }
            }),
            axios.get("http://localhost:8080/dashboard/feed", {
                headers: { Authorization: token }
            }),
            axios.get("http://localhost:8080/dashboard/followers", {
                headers: { Authorization: token }
            }),
            axios.get("http://localhost:8080/dashboard/following", {
                headers: { Authorization: token }
            })
        ])
            .then(([profileRes, myPostsRes, feedRes, followersRes, followingRes]) => {
                if (profileRes.data.success) {
                    setUser(profileRes.data.data); // בכל בקשה בדשבורד קונטרולר חוזר object response אם זה תקין שהשדה שלו data זה האובייקט שמחזירים
                }
                if (myPostsRes.data.success) {
                    setMyPosts(myPostsRes.data.data || []);
                }
                if (feedRes.data.success) {
                    setFeedPosts(feedRes.data.data || []);
                }
                if (followersRes.data.success) {
                    setFollowers(followersRes.data.data || []);
                }
                if (followingRes.data.success) {
                    setFollowing(followingRes.data.data || []);
                }
            })
            .catch(() => {
                setError("Failed to load dashboard");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    const updateProfileImage = (imageUrl) => {
        axios.post(
            "http://localhost:8080/dashboard/profile-image",
            null,
            {
                headers: { Authorization: token },
                params: { imageUrl }
            }
        )
            .then((res) => {
                if (res.data.success) {
                    setUser((prev) => ({
                        ...prev,
                        profileImageUrl: imageUrl
                    }));
                }
            })
            .catch(() => alert("Failed to update image"));
    };

    const createPost = (text) => {
        axios.post(
            "http://localhost:8080/dashboard/new-post",
            null,
            {
                headers: { Authorization: token },
                params: { content: text }
            }
        )
            .then((res) => {
                if (res.data.success) {
                    setMyPosts((prev) => [res.data.data, ...prev]);
                }
            })
            .catch(() => alert("Failed to create post"));
    };

    const followUser = (targetUsername) => {
        axios.post(
            "http://localhost:8080/dashboard/follow",
            null,
            {
                headers: { Authorization: token },
                params: { targetUsername }
            }
        )
            .then((res) => {
                if (res.data.success) {
                    // רענון פיד אחרי follow
                    return axios.get("http://localhost:8080/dashboard/feed", {
                        headers: { Authorization: token }
                    });
                }
            })
            .then((feedRes) => {
                if (feedRes?.data?.success) {
                    setFeedPosts(feedRes.data.data || []);
                }
            })
            .catch(() => alert("Failed to follow user"));
    };

    const searchUsers = (query) => {
        if (query.trim() === "") {
            setSearchResults([]);
            return;
        }

        axios.get("http://localhost:8080/dashboard/search-users", {
            headers: { Authorization: token },
            params: { query }
        })
            .then((res) => {
                if (res.data.success) {
                    setSearchResults(res.data.data || []);
                }
            })
            .catch(() => alert("Failed to search users"));
    };


    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Dashboard</h2>

            <Profile // כל מה שיציג בחלק של הפרופיל: (שם יציג מה שחוזר מהבקשות של הרכיבים האלה)
                user={user}
                followers={followers}
                following={following}
                onUpdateProfileImage={updateProfileImage}  // עדכון התמונה מתבצע דרך הפרופיל
            />

            <UserSearch // חיפוש משתמשים למעקב (בתוך הקומפוננטה שמים להם עוקב, הבקשה כמו כולן בדשבורד אבל מנוהלת מיוזר סרץ׳)
                results={searchResults}
                onSearch={searchUsers} // הערך שהיוזר יחפש ששולחים בבקשה למציאת היוזר
                onFollowUser={followUser} // למעקב אחרי היוזר/ים שמציג בתוצאת חיפוש
            />

            <UserPosts
                posts={myPosts}
                onCreatePost={createPost}
            />

            <Feed // הפוסטים של מי שאני עוקבת אחריהם
                posts={feedPosts}
            />
        </div>
    );
}

export default Dashboard;