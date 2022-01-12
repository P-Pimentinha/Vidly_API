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

app.post('/api/movies/', (req, res) => {
    //Validation	
    const { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Posting a course
    const movie = {
        id:movies.length +1,
        name: req.body.name,
        type: req.body.type,
    };

    movies.push(movie);
    res.send(movie);

});




function validateMovie(movie) {
    const schema = {
        name: Joi.string().min(3).required(),
        type: Joi.string().min(3).required()
    };
    return Joi.validate(movie, schema);
}

//PORT
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

