import React from "react"
import { useNavigate } from "react-router-dom";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";
import { motion } from "framer-motion"

const Card = ({ id, title, tag, post }) => {
  const navigate = useNavigate();
  const navigateSingleThread = () => {
    navigate(`/${id}/replies`);
  };
  return (
    <motion.div
      className="card-wrapper"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      
    >
      <div
        className="card-circle"
        style={{
          borderColor: `${
            tag === "movie"
              ? "gold"
              : tag === "music"
              ? "tomato"
              : "limegreen"
          }`
        }}
      ></div>
          <h3 className="title">{title}</h3>
        <div className="react__container">
                <Likes
                  numberOfLikes={post.likes.length}
                  threadId={post.id}
                />
                <Comments
                  numberOfComments={post.replies.length}
                  threadId={post.id}
                  title={post.title}
                />
              </div>
    </motion.div>
  )
}

export default Card;
