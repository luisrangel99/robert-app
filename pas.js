const b = require('bcrypt');

let pass = b.hashSync('12345678', 10);
console.log(pass);1602022200603
