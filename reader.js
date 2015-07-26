var fs = require('fs');

var people = [];

exports.readFile = function(cb){
    fs.readFile("people.txt","utf8",function(err, data){
        var counter = 1;
        var info = data.replace(/\n/g," ").split(" ");
        var person = [];

        info.forEach(function(word){
            person.push(word);
            if(counter % 3 == 0){
                    people.push(person);
                    console.log(person);
                    person = [];
            }
            counter++;
        });

        cb();
    });
}

exports.people = people;
