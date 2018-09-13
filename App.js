const express = require('express')
const app = express();
const pug = require('pug');
const bodyParser=require('body-parser');
const fs=require('fs');
let topics=[];
app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res) => {res.render('index',{topics:topics})});
app.post('/comment'),(req, res)=>{topics[parseInt(req.body.topicNum)].commentsreq.body.comment}
app.post('/', (req, res) =>{let topicObj={heading:req.body.topic};topics.push(topicObj);
console.log(topics);
res.render('index',{topics:topics})});
function savetoDisk(){ if(topics.length) {fs.writeFile('./content.json', JSON.stringify(topics), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})}}
//setInterval(savetoDisk,5000);
app.listen(3000, () => console.log('Example app listening on port 3000!'))