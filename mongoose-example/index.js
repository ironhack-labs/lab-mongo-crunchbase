const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/exampleMongoose');

const Cat = mongoose.model('Cat', {name:String});

const kitty = new Cat({ name : 'Java' });

kitty.save( err => {
    if(err) {
        console.log(err);
    } else {
        console.log('saved');
    }
});

Cat.find({}, (err, data) => {
    if(err) {
        console.log('err', err);
    } else {
        console.log('data', data);
    }
});
