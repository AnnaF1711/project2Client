//  שדה וכפתור להוספת פוסט חדש
//  הצגה של כל הפוסטים של היוזר עם הטיים סטאמפ
import { useState } from "react";
import "./UserPosts.css";

function UserPosts({ posts, onCreatePost }) {
    const [newPostText, setNewPostText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPostText.trim() === "") {
            return;
        }

        onCreatePost(newPostText.trim()); // שליחת הטקסט של הפוסט למתודה שמטפלת בבקשה לשרת בקומפוננטה דשבורד
        setNewPostText(""); // איפוס
    };

    return (
        <div className="user-posts-container">
            <h3 className="user-posts-title">My Posts</h3>

            <form className="new-post-form" onSubmit={handleSubmit}>
                <textarea
                    className="new-post-textarea"
                    placeholder="What's on your mind?"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                />
                <button className="new-post-button" type="submit">
                    Create Post
                </button>
            </form>

            <div className="posts-list">
                {posts.length === 0 ? (
                    <div className="no-posts-message">You have not posted anything yet</div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="post-card">
                            <div className="post-card-header">
                                <span className="post-author">{post.author}</span>
                                <span className="post-date">
                                    {post.timeStamp
                                        ? new Date(post.timeStamp).toLocaleString()
                                        : ""}
                                </span>
                            </div>

                            <div className="post-content">
                                {post.text}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UserPosts;