var W3CValidator = (function() {
    var W3CURL = "http://html5.validator.nu/?out=json";
      
    return {
        validate:function(str,cb) {

            $.ajax({
                url:W3CURL,
                data:str,
                cache:false,
                contentType:"text/html; charset=utf-8",
                processData:false,
                type:"POST",
                success:function(data) {
                    cb(data);
                }
            });

        }

    };
}());
