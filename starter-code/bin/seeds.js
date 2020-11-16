const mongoose = require('mongoose');

const Celebrity = require('../models/celebrity');

mongoose.connect('mongodb://localhost/starter-code', {
  useNewUrlParser: true
});

const celebrities = [
    {
        name: 'Brad Pitt', 
        occupation: 'Actor', 
        catchPhrase: 'My ex is called Angelina Jolie',
    }, 
    {
        name: 'Angelina Jolie', 
        occupation: 'Actor', 
        catchPhrase: 'My ex is Brad Pitt',
    },
    {
        name: 'George Clooney', 
        occupation: 'Actor', 
        catchPhrase: 'I have a tequila brand',
    }

];

Celebrity.insertMany(celebrities)
  .then(data => {
    console.log(`Success! ${data.length} books added to the collection`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
