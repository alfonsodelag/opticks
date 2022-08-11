const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const FavoriteActivity = require("./models/favoriteactivity");
const PORT = 8000;

// DB Connection
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://alfonso:Panama11@webpersonal.bxdvq.mongodb.net/opticks?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("connected to db");
    } else {
      console.log("error");
    }
  }
);

app.post("/post", async (req, res) => {
  const data = new FavoriteActivity({
    activity: req.body.activity.activity,
    accessibility: req.body.activity.accessibility,
    participants: req.body.activity.participants,
    type: req.body.activity.type,
    price: req.body.activity.price,
    // image: req.body.activity.imageUrl,
  });

  const val = await data.save();
  res.json(val);
});

app.get("/createdfavoritelist", async (req, res) => {
  const activitiesList = await FavoriteActivity.find();
  res.send(activitiesList);
});

app.delete("/remove", async (req, res) => {
  const deleteOne = await FavoriteActivity.deleteOne({ _id: req.query._id });
  console.log("req: ", req);
  res.send(deleteOne);
});

app.listen(PORT, function () {
  console.log("Server is running on PORT:", PORT);
});
