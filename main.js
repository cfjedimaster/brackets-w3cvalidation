/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, W3CValidator */

define(function (require, exports, module) {
    'use strict';

    var CodeInspection          = brackets.getModule("language/CodeInspection"),
        AppInit                 = brackets.getModule("utils/AppInit"),
        Menus                   = brackets.getModule("command/Menus"),
        CommandManager          = brackets.getModule("command/CommandManager"),
        DocumentManager         = brackets.getModule("document/DocumentManager");
    
    var COMMAND_ID              = "w3cvalidator_refresh",
        PROVIDER_ID             = "W3CValidation";
        
    var Strings                 = require("strings");
    
    
    require('w3cvalidator');
    
    function _handleValidation(text, fullPath) {
        var response = new $.Deferred();
        var result = {errors:[]};
        
        W3CValidator.validate(text, function (res) {
            var messages = res.messages;
            
            if (messages.length) {
                messages.forEach(function (item) {
                    //console.log('W3CValidation messsage ',item);
                    var type = CodeInspection.Type.ERROR;
                    
                    if (item.type === "warning")
                        type = CodeInspection.Type.WARNING;
                    
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
    
    function _refreshValidation() {
        var currentDoc = DocumentManager.getCurrentDocument();
        currentDoc.notifySaved();
    }
    
    AppInit.appReady(function () {
        CodeInspection.register("html", {
            //name: "W3CValidation",
            name: PROVIDER_ID,
            scanFileAsync: _handleValidation
        });
    });
    
    
    // Command
    CommandManager.register(Strings.REFRESH_W3C_VALIDATION, COMMAND_ID, _refreshValidation);
    
    // Menu
    var editMenu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    editMenu.addMenuItem(COMMAND_ID, "F9");
});
