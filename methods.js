const express = require('express');

const app = express();

app.listen(3000);

app.get('', (req, res) => {
    res.send('Hello express!')
})

app.get('/about', (req, res) => {
    res.sendFile('./view/about.html',{root:__dirname});
});

// redirect
 app.get('/about-me',(req,res) =>{
    res.redirect('/about')
 })
//404 error
app.get('/404', (req, res) => {
    res.status(404).sendFile('./view/404.html',{root:__dirname});
});

// CRUD: get post fetch del