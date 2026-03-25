// הצגה של 20 הפוסטים האחרונים של האנשים שהיוזר המחובר עוקב אחריהם (את ה-limit ננהל מהשאילתא בדאטה בייס בשרת)
// זה יכלול את שם המשתמש , את תוכן הפוסט והטיים סטאמפ מתי העלה אותו
import "./Feed.css";

function Feed({ posts }) {
    return (
        <div className="feed-container">
            <h3 className="feed-title">Feed</h3>

            {posts.length === 0 ? (
                <div className="feed-empty-message">
                    No posts from followed users yet
                </div>
            ) : (
                <div className="feed-posts-list">
                    {posts.map((post) => (
                        <div key={post.id} className="feed-post-card">
                            <div className="feed-post-header">
                                <div className="feed-user-info">
                                    <img
                                        src={post.authorProfileImage}
                                        alt={`${post.author} profile`}
                                        className="feed-avatar"
                                    />
                                    <span className="feed-post-author">
                                        {post.author}
                                    </span>
                                </div>

                                <span className="feed-post-date">
                                    {post.timeStamp
                                        ? new Date(post.timeStamp).toLocaleString()
                                        : ""}
                                </span>
                            </div>

                            <div className="feed-post-content">
                                {post.text}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Feed;