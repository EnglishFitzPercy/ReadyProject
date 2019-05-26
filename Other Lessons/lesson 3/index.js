var express = require("express");
var app = express();

app.get("/gl", function(req, res){
    
    res.redirect('http://google.com');
});
app.get("/gl/:item", function(req, res){
    var item = req.params.item;
    res.redirect('http://google.com/search?q=' + item);
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
 