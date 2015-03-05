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

## Future work

Ideally one could have a sync wrapper that wouldn't need for `yield` to be called at all. There are a few ways to do this:

* one could write sync wrappers around the existing classes in Sequelize, much like what was done in [mongo-sync](https://github.com/olegp/mongo-sync); this is a fair bit of work and will require additional work every time the Sequelize APIs are updated
* ES6 proxies could be used to yield the promise and delegate the lookup to the result of the yield for all attributes; the problem here is that proxies in Node are available only via a command line flag, they are however available in Io.js by default so this may be an option in the future; implementing this would be pretty easy on top of the existing code and no changes to the code would be needed if the Sequelize API were to change; a partial solution would be to include an ES6 proxy implementation as an optional dependency which is only used in the case that Proxies are not available in the runtime
