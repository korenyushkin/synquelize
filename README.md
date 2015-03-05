# Synquelize

This is a synchronous wrapper using fibers for [Sequelize](http://sequelizejs.com).

It adds an additional method `yield()` to the Promise implementation used by Sequelize which returns (or synchronously yields) the result of the fulfilled promise.

The example code on the home page of Sequelize thus becomes:

```
var Fiber = require('fibers');
var Sequelize = require('synquelize');

var sequelize = new Sequelize('postgres://postgres:postgres@localhost/postgres', {
 	logging: false
});

Fiber(function() {
	var User = sequelize.define('User', {
		username: Sequelize.STRING,
		birthday: Sequelize.DATE
	});

	sequelize.sync().yield();

	var jane = User.create({
		  username: 'janedoe',
		  birthday: new Date(1980, 06, 20)
		}).yield();

  console.log(jane.values);

  sequelize.close();

}).run();
```