import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "../styles/Comments.css";


const Comments = ({ campaignId }) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "campaigns", campaignId, "comments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetched);
    });

    return () => unsubscribe();
  }, [campaignId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await addDoc(collection(db, "campaigns", campaignId, "comments"), {
        text: commentText,
        createdAt: serverTimestamp(),
        user: {
          uid: user.uid,
          name: user.displayName || "Anonymous",
          photo: user.photoURL || "",
        },
      });
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="comments-title">Comments</h3>

      {user && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="current-comment-input"
            rows={3}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type="submit"
            className="comment-submit-button"
          >
            Post Comment
          </button>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="all-comments">
            <div className="comment-user">
              {c.user.photo && (
                <img
                  src={c.user.photo}
                  alt={c.user.name}
                  className="comment-user-photo"
                />
              )}
              <span className="font-semibold">{c.user.name}</span>
            </div>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
