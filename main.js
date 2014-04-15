/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, W3CValidator */

define(function (require, exports, module) {
	'use strict';
	
	var CodeInspection			= brackets.getModule("language/CodeInspection"),
		AppInit                 = brackets.getModule("utils/AppInit");

	require('w3cvalidator');
	
	function _handleValidation(text, fullPath) {
		var response = new $.Deferred();
		var result = {errors:[]};
			
		W3CValidator.validate(text, function (res) {
			var messages = res.messages;
			
			if (messages.length) {
									
				messages.forEach(function (item) {
					console.log('W3CValidation messsage ',item);
					var type = CodeInspection.Type.ERROR;
					if (item.type === "warning") {
                        type = CodeInspection.Type.WARNING;
                    }
					result.errors.push({
						pos: {line:item.lastLine-1, ch:0},
						message:item.message,
						type:type
					});
					
				});
		  
			}

			response.resolve(result);        
			
		}); 

		return response.promise();

	}
		
	AppInit.appReady(function () {


		CodeInspection.register("html", {
			name: "W3CValidation",
			scanFileAsync: _handleValidation
		});
		
	});
	
	
});
