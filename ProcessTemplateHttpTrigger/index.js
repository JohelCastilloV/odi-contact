const Handlebars = require("handlebars")
const path = require('path');
const fs = require('fs');
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var template = fs.readFileSync(path.join(__dirname,"template.txt"), "utf8")
    Handlebars.registerHelper('inc', function(number, options) {
        if(typeof(number) === 'undefined' || number === null)
            return null;
    
        // Increment by inc parameter if it exists or just by one
        return number + (options.hash.inc || 1);
    });
    Handlebars.registerHelper('isNumeric', function(number, options) {
        if(typeof(number) === 'undefined' || number === null)
            return null;
        return !isNaN(number) && !isNaN(parseFloat(number))
    });
    var templat = Handlebars.compile(template);
    var response = templat(req.body);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };
}