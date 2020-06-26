var fs = require('fs'); 
var woff2 = require('woff2');

try
{
    var input = fs.readFileSync('input.woff2');
    var output = 'output.ttf';
    fs.writeFileSync(output, woff2.decode(input));
    console.log("The file has been converted.");
}
catch(e)
{
   console.log("There is a problem");
}
