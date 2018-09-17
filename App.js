const express = require('express')
const app = express();
const pug = require('pug');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const hdate=require('human-date')
const fs=require('fs');
let topics=JSON.parse(fs.readFileSync('./content.json'));
app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {console.log('incoming');if(req.cookies.user){console.log(req.cookies);res.render('index',{topics:topics, user:req.cookies.user})} else{res.render('welcome')}});



app.post('/', (req, res) =>{let date=new Date().toUTCString();let topic={heading:req.body.heading,user:req.cookies.user, comments:[], date};topics.push(topic);setTimeout(savetoDisk,2000);
res.redirect('/');});

app.post('/user',(req, res)=>{console.log(req.body.user);res.cookie('user',req.body.user,{maxAge:9000000000});res.redirect('/');});



app.post('/comment',(req, res)=>{let date=new Date().toUTCString();
topics[parseInt(req.body.topicNum)].comments.push({comment:req.body.comment,user:req.cookies.user, date});setTimeout(savetoDisk,5000);res.redirect('/');});

function savetoDisk(){ if(JSON.parse(JSON.stringify(topics,null,4))) {fs.writeFile('./content.json', JSON.stringify(topics,null,4), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})}}
app.listen(3000, () => console.log('Example app listening on port 3000!'))