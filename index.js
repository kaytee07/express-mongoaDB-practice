const express = require('express');
const path = require('path')
const app = express();

const PORT = 3000;

const comments = [
  {
    id: 1,
    username: "kaytee",
    comment: "lol this is crazy",
  },
  {
    id: 2,
    username: "todie",
    comment: "i dont like this",
  },
  {
    id: 3,
    username: "ebo",
    comment: "what is happening here",
  },
  {
    id: 4,
    username: "lodi",
    comment: "this is against laews",
  },
];

app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/comment',(req, res)=>{
    res.render('comment/index', {comments})
})

app.post('/comment',(req, res)=>{
    const {username, comment} = req.body;
    console.log(req.body, comment)
    comments.push({username, comment})
    res.redirect('/comment');
})

app.get('/comment/new',(req, res)=>{
    res.render('comment/new')
})

app.get('/tacos', (req, res)=>{
    res.send('GET /tacos response')
})

app.get('/comment/:id',(req, res)=>{
    const { id } = req.params;
    const comment = comments.find(comm=> comm.id === parseInt(id));
    res.render('comment/details', {comment})
})

app.post("/tacos", (req, res) => {
    const {meat, qty}=req.body;
  res.send(`here is your ${qty} ${meat} tacos`);
});


app.listen(PORT, ()=>{
    console.log(`SERVER IS UP AND RUNNING AT PORT:${PORT}`)
})


// a way to implement restful API's

// GET/comments - get all comments
// POST/comment - create a new comment
// GET/comment/:id - get one comment
// PATCH/comment/:id - update one comment
// DELETE/comment/:id - delete one comment