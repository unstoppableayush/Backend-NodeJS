
function add(a , b){
    return a + b
}

function sub(a , b){
    return a - b;
}

// module.exports = add;
// module.exports = sub ; // overiding the value

// we can use object to export multiple values



// multi exports
module.exports = {
    add ,
    sub,
}


//exporting anonymous function
// exports.add = (a , b) => a + b;

// exports.sub = ( a , b) => a - b;