(async () => {
    var express = require("express");
    var app = express();
    var request = require('request');
    const timeUrl= 'https://time.com';
    const regex = /(?<=<article class="slide">\s+<div class="content">\s+<p class="no-eyebrow"><\/p>\s+<h2\s+class="title"><a\s+href=(.*)>(.*)<\/a><\/h2>\s+<\/div>\s+<\/article>)/gmi;
    
    
    app.get("/getTimeStories", function (req, res) {
      request(timeUrl,function(error,response,body)
      {
        const output = [];
        while((data = regex.exec(String(body))) !== null) {
          if (data.index === regex.lastIndex) {
              regex.lastIndex++;
          }
          data.forEach(element => {
            if(element){
              output.push(element.trim())
            }
          });
       }
        const response_data = []
        for(let i = 0;i < output.length;i=i+2){
          const obj = {
            title : output[i+1],
        link : "https://time.com"+output[i]
          }
          response_data.push(obj)
        }
        res.json(response_data)
      })
    });
    
    app.listen(8082);
})()