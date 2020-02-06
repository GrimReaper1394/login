const express = require('express');
const path = require('path');
const app = express();

// port where server is at
const PORT = process.env.PORT || 5000


app.use('/public', express.static(path.join(__dirname, 'static')))



// targeting routes in routes folder
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname,'static',"entry.html")));



app.listen(PORT, () => {
    console.log(`Server started on ${PORT}, server is running.`);
});
