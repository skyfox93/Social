const express = require('express')
const app = express();
const pug = require('pug');
const bodyParser=require('body-parser');
const fs=require('fs');
let topics=[];
app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {res.render('index',{topics:topics})});



app.post('/', (req, res) =>{let topic={heading:req.body.heading, comments:[]};topics.push(topic);res.redirect('/');});

app.post('/comment',(req, res)=>{console.log(req.body.comment);
topics[parseInt(req.body.topicNum)].comments.push(req.body.comment);
res.redirect('/');});


function savetoDisk(){ if(topics.length) {fs.writeFile('./content.json', JSON.stringify(topics), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})}}
//setInterval(savetoDisk,5000);
app.listen(3000, () => console.log('Example app listening on port 3000!'))