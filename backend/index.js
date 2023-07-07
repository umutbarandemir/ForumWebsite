const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(`mongodb://0.0.0.0:27017/forum`, {
    //   useNewUrlParser: true,
    // });
    const conn = await mongoose.connect(`mongodb+srv://<username:password>@cluster0.waqvr7w.mongodb.net/`, {
      dbName:'Cluster0',
      useNewUrlParser: true,
      useUnifiedTopology: true,});
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
connectDB();
const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
  username: String,
});
const user1 = mongoose.model("User", userSchema);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const users = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;
  const id = generateID();

  const result = (await user1.find()).filter(
    (user) => user.email === email && user.password === password
  );

  if (result.length === 0) {
    const newUser = { id, email, password, username };
    const deneme = new user1({
      id: newUser.id,
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
    });
    deneme.save().then(
      () => console.log("added"),
      (err) => console.log(err)
    );
    users.push(newUser);

    return res.json({
      message: "Account created successfully!",
    });
  }

  res.json({
    error_message: "User already exists",
  });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  let result = await user1.find({ email: email, password: password }).exec();
  //   let result = users.filter(
  //     (user) => user.email === email && user.password === password
  //   );

  if (result.length !== 1) {
    return res.json({
      error_message: "Incorrect credentials",
    });
  }

  res.json({
    message: "Login successfully",
    id: result[0].id,
  });
});

const threadSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  userId: String,
  tag: String,
  replies: [],
  likes: [],
});
const Thread = mongoose.model("Thread", threadSchema);

app.post("/api/create/thread", async (req, res) => {
  const { thread, id, selectedOption, description  } = req.body;
  const threadId = generateID();
  const newThread = Thread({
    id: threadId,
    title: thread,
    userId: id,
    tag: selectedOption,
    description: description,
    replies: [],
    likes: [],
  });
  newThread.save().then(
    () => console.log("added new thread."),
    (err) => console.log(err)
  );
  const threadList = await Thread.find().exec();


  res.json({
    message: "Thread created successfully!",
    threads: threadList,
  });
});

app.get("/api/all/threads", async (req, res) => {
  const threadList = await Thread.find().exec();
  res.json({
    threads: threadList,
  });
});
app.post("/api/thread/like", async (req, res) => {
  const { threadId, userId } = req.body;
  const result = await Thread.find({ id: threadId }).exec();
  const threadLikes = result[0].likes;
  const authenticateReaction = threadLikes.filter((user) => user === userId);

  if (authenticateReaction.length === 0) {
    result[0].updateOne({ $push: { likes: userId } }).exec();
    return res.json({
      message: "You've reacted to the post!",
    });
  }

  res.json({
    error_message: "You can only react once!",
  });
});
app.post("/api/thread/replies", async (req, res) => {
  const { id } = req.body;
  const result = await Thread.find({ id: id }).exec();

  res.json({
    replies: result[0].replies,
    title: result[0].title,
    description: result[0].description,
  });
});

app.post("/api/create/reply", async (req, res) => {
  const { id, userId, reply } = req.body;
  const result = await Thread.find({ id: id }).exec();

  const user = await user1.find({ id: userId }).exec();
  result[0]
    .updateOne({
      $push: {
        replies: { userId: user[0].id, name: user[0].username, text: reply },
      },
    })
    .exec();

  //   result[0].replies.unshift({
  //     userId: user[0].id,
  //     name: user[0].username,
  //     text: reply,
  //   });

  res.json({
    message: "Response added successfully!",
  });
});
