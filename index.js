import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "My first Blog Entry",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus in ornare quam viverra orci sagittis eu volutpat. Nibh nisl condimentum id venenatis a. Volutpat diam ut venenatis tellus in. Eu ultrices vitae auctor eu augue ut lectus. Mi quis hendrerit dolor magna eget est lorem. Tincidunt augue interdum velit euismod in pellentesque massa placerat. Blandit turpis cursus in hac. Sit amet purus gravida quis blandit turpis. Orci dapibus ultrices in iaculis nunc sed. Elementum eu facilisis sed odio morbi quis commodo odio aenean.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//GET a specific post by id
function findPost(arr, key, value){
  return arr.find(function(o){ return o[key] === value });
}

app.get("/posts/:id", (req, res) => {
  var reqID = parseInt(req.params.id);
  res.json(findPost(posts, "id", reqID));
});

//POST a new post
app.post("/posts", (req, res) => {
  const num = posts.length + 1;
  posts.push({
    id: num,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  })
  res.json(posts[posts.length - 1]);
});

//PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  var reqID = parseInt(req.params.id);
  let post = findPost(posts, "id", reqID);
  if(req.body.title){
    post["title"] = req.body.title;
  };
  if(req.body.content){
    post["content"] = req.body.content;
  };
  if(req.body.author){
    post["author"] = req.body.author;
  };
  res.json(findPost(posts, "id", reqID));
});

// DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  var reqID = parseInt(req.params.id);
  let index = posts.findIndex(function(o){ return o["id"] === reqID });
  if(index >=0 ){
    posts.splice(index,1);
    res.sendStatus(200);
  }
  else{
    res.sendStatus(400).json({error: `can't delete post with ID: ${reqID}`})
  }
  
});



app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
