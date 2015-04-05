var assert = require('assert');
var Synquelize = require('./index');

var userNames = ['John', 'Bill'];
var surname = ' Jackson';

describe('Synquelize', function () {
  var synquelize, User;

  beforeEach(function () {
    synquelize = new Synquelize('test.db', '', '', {dialect: 'sqlite'});
    User = synquelize.define('user', {
      name: {
        type: Synquelize.STRING,
        field: 'name'
      }
    });
  });

  it('must create and update instances', function () {
    Synquelize.run(function () {
      User.sync({force: true});
      userNames.forEach(function (name) { User.create({name: name}); });
      var users = User.findAll();
      assert.equal(users.length, userNames.length);
      for (var i = 0; i < users.length; ++i) {
        assert.equal(users[i].name, userNames[i]);
        user[i].name += surname;
        user.save();
        assert.equal(user[i].name, userNames[i] + surname);
      }
    });
  });
});
