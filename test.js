var Synquelize = require('./index');

var synquelize = new Synquelize('test.db', '', '', {dialect: 'sqlite'});
var User = synquelize.define('user', {
  name: {
    type: Synquelize.STRING,
    field: 'name'
  }
});

Synquelize.run(function () {
  User.sync({force: true});
  User.create({name: 'John'});
  User.create({name: 'Bill'});
  var users = User.findAll();
  for (var i = 0; i < users.length; ++i) {
    var user = users[i];
    console.log(user.name);
    user.name = user.name + ' Jackson';
    user.save();
    console.log(user.name);
  }
});
