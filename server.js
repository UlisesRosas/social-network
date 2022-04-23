// Importing packages
const express = require('express');
const db = require('./config/connection')

const app = express();
// Port number options
const PORT = process.env.PORT || 3001;

// middlewear 
app.use(express.json)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.use(require('./routes'))


db.once('open',() => {
    app.listen(PORT, ()=> console.log(`🛸 Mothership connected on localhost:${PORT}`));
})


