const fs = require("fs");
var promises = [];

function readIt(directory){
    return new Promise(function(resolve, reject){
        fs.readdir(directory, function(err, items){
            if (err) {
                reject();
            } else {
                for (var i=0; i<items.length; i++){
                    var path = directory + "/" + items[i];
                    promises.push(stats(path));
                }
                Promise.all(promises).then(function(){
                    resolve();
                });
            }
        });
    });
}

function stats(path){
    return new Promise(function(resolveS, rejectS){
        fs.stat(path, function(err, stat){
            if (err) {
                rejectS();
            } else {
                if (stat.isDirectory()){
                    console.log(path+" is a directory");
                } else {
                    console.log(path+" is not a directory");
                }
                resolveS(path);
            }
        });
    });
}

readIt("./files").then(function(){
    console.log("Done!");
}).catch(function(err){
    throw err;
});
