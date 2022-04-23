const mongoose = require('mongoose');

// Tell mongoose what database we want to connect to
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndexes: true
});

// use to log mongo queries being executed
mongoose.set('debug',true);

module.exports = mongoose.connection;