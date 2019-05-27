var request = require('request');
var fs = require('fs');

exports.requestJson = function () {
  
    request('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=TOKEN', function(error, response, body){
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        fs.writeFile('answer.json', body, (err) => {
            if (err) throw err;
            console.log('O arquivo foi salvo');
        });
    });
}
