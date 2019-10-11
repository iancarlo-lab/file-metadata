const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const html = app.use(express.static('views'));
const multer = require('multer');
   
var upload = multer({dest: '/api/fileanalyse'})

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.send(html)
});

app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
    const file = req.file
    if(!file){
        res.status(400).send('<h1>Please upload file ANYTHING!!</h1>')
    }
    const result = {
        name: file.originalname,
        type: file.mimetype,
        size: file.size
    }
    console.log(file);
    res.send(result);

});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`You are listening on port: ${port}`));
