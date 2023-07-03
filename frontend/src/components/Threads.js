import React, { useEffect, useState } from "react";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";


const Threads = () => {
  const [thread, setThread] = useState("");
  const [description, setDescription] = useState("");
  const [threadList, setThreadList] = useState([]);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        fetch("http://localhost:4000/api/all/threads")
          .then((res) => res.json())
          .then((data) => setThreadList(data.threads))
          .catch((err) => console.error(err));
      }
    };
    checkUser();
  }, [navigate]);

  const createThread = () => {
    fetch("http://localhost:4000/api/create/thread", {
      method: "POST",
      body: JSON.stringify({
        thread,
        selectedOption,
        description,
        id: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setThreadList(data.threads);
      })
      .catch((err) => console.error(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createThread();
    setThread("");
    setDescription("");
    setSelectedOption("");
  };
  return (
    <>
      <main className="home">
        <h1 className="homeTitle">Create a Thread</h1>
        <form className="homeForm" onSubmit={handleSubmit}>
          <div className="home__container">
            <h2>Title</h2>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              placeholder="Enter thread Title"
              onChange={(e) => setThread(e.target.value)}
            />
            <h2>Description</h2>
            <input
              type="text"
              name="description"
              required
              value={description}
              placeholder="Enter thread Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
            <h2>Select Thread Tag</h2>
              <select className="tagselect" name="tag" required value={selectedOption} onChange={(e)=> setSelectedOption(e.target.value)}>
                <option value="">Select Tag</option>
                <option value="music">Music</option>
                <option value="game">Game</option>
                <option value="movie">Movie</option>
              </select>
          </div>
          </div>
          <button className="homeBtn">CREATE THREAD</button>
        </form>

        <div className="thread__container ">
          {threadList.map((thread) => (
            <div className="thread__item" key={thread.id}>
              <p>{thread.title}</p>
              <div className="react__container">
                <Likes
                  numberOfLikes={thread.likes.length}
                  threadId={thread.id}
                />
                <Comments
                  numberOfComments={thread.replies.length}
                  threadId={thread.id}
                  title={thread.title}
                />
              </div>
            </div>
          ))}

        </div>
      </main>
    </>
  );
};

export default Threads;
