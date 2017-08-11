var prefix = "Hi";

function User(name) {

  this.name.en = encode(name);

  this.greeting = function () {

    return [ prefix, this.name ].join(', ')
  };

}

var user = new User('John');

var result = user.greeting();