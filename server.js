const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '/views')));

// Define a route to render the chat interface
app.get('/', (req, res) => {
    res.render('chat.ejs');
});

// Listen for Socket.IO connections
io.on('connection', (socket) => {
    console.log('New user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log(`Received message: ${msg}`);
        io.emit('chat message', msg);
    });

    // Listen for disconnections
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});