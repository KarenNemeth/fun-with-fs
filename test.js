(function() {
    function getMultipliers(length) {
        var array = []
        for (var i = 0; i < length; i++) {
            function hello(i) {
                array.push(function(n) {
                    return n*i
                });
            };
            hello(i);
        }
        return array
    }

    var multipliers = getMultipliers(3);

    console.log(multipliers[0](1)); //0
    console.log(multipliers[1](1)); //1
    console.log(multipliers[2](1)); //2

})();

// (function() {
//     function getMultipliers(length) {
//         var array = [];
//         for (var i = 0; i < length; i++) {
//             array.push(function me(m) {
//                 return array.indexOf(me) * m;
//             });
//         }
//         return array;
//     }
//
//     var multipliers = getMultipliers(3);
//
//     console.log(multipliers[0](1)); //0
//     console.log(multipliers[1](1)); //1
//     console.log(multipliers[2](1)); //2
//
// })();
