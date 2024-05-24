const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('frontend'));
// express.static() accepts a directory name that contains static file
// that we will server to the users

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); 


const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT,HOST,()=>{
    console.log(`SERVER IS LISTENING ${HOST}:${PORT}`);
});

app.get('/',(req,res)=>{
    res.status(200).sendFile('frontend/index.html');
    res.sendStatus(200);
})

app.post('/login',(req,res)=>{
    console.log(req.headers);
    res.sendStatus(200);
})
app.get('/content',(req,res)=>{
    if(!req.headers.authorization){
        res.set('WWW-Authenticate','Basic realm=<realm>');
        res.sendStatus(401);
        return;
    }
    console.log(atob(req.headers.authorization.slice(6)));
    
    res.sendStatus(200);
})