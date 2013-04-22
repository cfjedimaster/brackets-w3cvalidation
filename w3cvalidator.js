var W3CValidator = (function() {
    
    var W3CURL = "http://validator.w3.org/check";
        
    return {
     
        validate:function(str,cb) {
            $.post(W3CURL, {
                "fragment":str,
                "output":"json"
            }, function(res,code) {
             cb(res);
            });
        }
        
    };
    
}());