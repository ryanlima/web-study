var request = require('request');
var fs = require('fs');

exports.requestJson = function () {
  
    request('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=9ce207caed5bb19435d7ddc3c188c357abe24fc7', function(error, response, body){
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        fs.writeFile('answer.json', body, (err) => {
            if (err) throw err;
            console.log('O arquivo foi salvo');
        });
    });
}