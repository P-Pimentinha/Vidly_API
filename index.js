const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const movies = [
    {id: 1,name:"Saw" ,type: 'Horror'},
    {id: 2, name:"Jumanji" , type: 'Adventure'},
    {id: 3, name:"Destiny" , type: 'Sci-Fi'},
     
];

app.get('/api/movies/', (req,res) => {
    res.send(movies);
});





//PORT
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

