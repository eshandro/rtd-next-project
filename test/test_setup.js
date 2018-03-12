const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/rtdNextTrain_test');
  mongoose.connection
    .once('open', () => { 
      console.log('successful connection to db in test_setup.js');
      done(); 
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

// beforeEach((done) => {
//   const { users, comments, blogposts } = mongoose.connection.collections;
//   users.drop(() => {
//     comments.drop(() => {
//       blogposts.drop(() => {
//         done();
//       });
//     });
//   });
// });