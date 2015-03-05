var Fiber = require('fibers');

// horrible hack involving wrapping around Node's require 
// to replace bluebird promises used by "sequelize"
var proto = require('module').prototype;
var protoRequire = proto.require;
proto.require = function(name) {
  if(name == 'bluebird/js/main/promise') {
    return function() {
      var Promise = require('sequelize/node_modules/bluebird/js/main/promise')();
		  Promise.prototype.yield = function() {
				return yop(this);
			}  
      return Promise;
    };
  } else {
    return protoRequire.call(this, name);
  }
};

function when(value, fulfilled, rejected, progressed) {
    return value.then(fulfilled, rejected, progressed);
}

function yop(promiseOrValue) {
	var currentFiber = Fiber.current;
	when(promiseOrValue, function(value) {
		currentFiber.run(value);
	}, function(reason) {
		currentFiber.throwInto(reason);
	}).done();
	return Fiber.yield();
}

module.exports = require('sequelize');


