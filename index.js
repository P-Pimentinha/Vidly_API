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

app.get('/api/movies/:id', (req,res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if(!movie) res.status(404).send('The movie with the give ID was not found');
    res.send(movie);
});





//PORT
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

