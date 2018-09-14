const express = require('express')
const app = express();
const pug = require('pug');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const hdate=require('human-date')
const fs=require('fs');
let topics=[];
try{let topics=JSON.parse(fs.readFileSync('./content.json'));} catch(error){console.log("PARSING ERROR");}

app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {if(req.cookies.user){{res.render('index',{topics:topics,user:req.cookies.user})}} else{res.render('welcome')}});



app.post('/', (req, res) =>{let date='';if (req.body.date){date=hdate.relativeTime(req.body.date);}else{date=new Date().toDateString();date=hdate.relativeTime(date);}let topic={heading:req.body.heading, user:req.body.user, comments:[], date};topics.push(topic);setTimeout(savetoDisk,2000);
res.redirect('/');});

app.post('/user',(req, res)=>{console.log(req.body.user);res.cookie('user',req.body.user);res.redirect('/');});



app.post('/comment',(req, res)=>{console.log(req.body.comment);if (req.body.date){date=req.body.date;}else{date=new Date().toDateString();}
topics[parseInt(req.body.topicNum)].comments.push({comment:req.body.comment,user:req.body.user, date});setTimeout(savetoDisk,5000);res.redirect('/');});

function savetoDisk(){ if(topics.length) {fs.writeFile('./content.json', JSON.stringify(topics,null,4), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})}}
app.listen(3000, () => console.log('Example app listening on port 3000!'))