/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, W3CValidator */

define(function (require, exports, module) {
    'use strict';
    
    var Commands                = brackets.getModule("command/Commands"),
        CommandManager          = brackets.getModule("command/CommandManager"),
        EditorManager           = brackets.getModule("editor/EditorManager"),
        DocumentManager         = brackets.getModule("document/DocumentManager"),
        Menus                   = brackets.getModule("command/Menus"),
        PanelManager            = brackets.getModule("view/PanelManager"),
        AppInit                 = brackets.getModule("utils/AppInit");

    
    require('w3cvalidator');
    
    //commands
    var VIEW_HIDE_W3CVAL = "w3cvalidation.run";
    
    function _handleValidation() {
        var messages;
        
        var editor = EditorManager.getCurrentFullEditor();
        if (!editor) {
            _handleShowW3CValidation();
            return;
        }
        if (editor.document.language._id === "html") {
            
            if ($("#w3cvalidation").css('display') === "none") {
                $("#w3cvalidation").show();
                EditorManager.resizeEditor();
            }
            
            var text = editor.document.getText();
            
            $("#w3cvalidation .status").html("<p>Gathering results....</p>");
            $("#w3cvalidation .table-container").empty();
            
            W3CValidator.validate(text, function (res) {
                $("#w3cvalidation .status").html("");
                messages = res.messages;
                
                if (messages.length) {
                    
                    var $w3cTable = $("<table class='zebra-striped condensed-table' style='table-layout: fixed; width: 100%'>").append("<tbody>");
                    $("<tr><th>Line</th><th>Type</th><th>Explanation</th><th>Message</th></tr>").appendTo($w3cTable);
                    
                    var $selectedRow;
                    
                    messages.forEach(function (item) {
                        var makeCell = function (content) {
                            //second argument is a boolean to let you NOT escape html
                            if (arguments.length === 2 && !arguments[1]) {
                                return $("<td style='word-wrap: break-word'/>").html(content);
                            }
                            return $("<td style='word-wrap: break-word'/>").text(content);
                        };

                        var exp = "";
                        if(item.explanation) {
                            exp = item.explanation;
                            exp = exp.replace(/<p class="helpwanted">(.|[\r\n])+?<\/p>/m,"");
                        }

                        var $row = $("<tr/>")
                            .append(makeCell(item.lastLine))
                            .append(makeCell(item.type))
                            .append(makeCell(exp, false))
                            .append(makeCell(item.message))
                            .appendTo($w3cTable);
                        
                        $row.click(function () {
                            if ($selectedRow) {
                                $selectedRow.removeClass("selected");
                            }
                            $row.addClass("selected");
                            $selectedRow = $row;
                            
                            var editor = EditorManager.getCurrentFullEditor();
                            editor.setCursorPos(item.lastLine - 1, item.lastCol - 1);
                            EditorManager.focusEditor();
                        });
                        
                    });
                    
                    $("#w3cvalidation .table-container")
                        .empty()
                        .append($w3cTable);
                    
                } else {
                    $("#w3cvalidation .table-container")
                        .empty()
                        .append("<p>No issues.</p>");
                }
                
            });
            
        } else {
            $("#w3cvalidation").hide();
            EditorManager.resizeEditor();
        }
    }
    
    function _handleShowW3CValidation() {
        var $w3cval = $("#w3cvalidation");
        
        if ($w3cval.css("display") === "none") {
            $w3cval.show();
            CommandManager.get(VIEW_HIDE_W3CVAL).setChecked(true);
            _handleValidation();
            $(DocumentManager).on("currentDocumentChange documentSaved", _handleValidation);
        } else {
            $w3cval.hide();
            CommandManager.get(VIEW_HIDE_W3CVAL).setChecked(false);
            $(DocumentManager).off("currentDocumentChange documentSaved", null,  _handleValidation);
        }
        EditorManager.resizeEditor();
    }
    
    CommandManager.register("Enable W3CValidation", VIEW_HIDE_W3CVAL, _handleShowW3CValidation);
    
    AppInit.appReady(function () {
        
        //add the HTML UI
        var content = '  <div id="w3cvalidation" class="bottom-panel">'
                    + '  <div class="toolbar simple-toolbar-layout">'
                    + '    <div class="title">W3CValidation</div><a href="#" class="close">&times;</a>'
                    + '  </div>'
                    + '  <div class="status"></div>'
                    + '  <div class="table-container"/>'
                    + '</div>';
        
        var $content = $(content);
      
        var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
        menu.addMenuItem(VIEW_HIDE_W3CVAL, "", Menus.AFTER);
        
        $('.close', $content).click(function () {
            CommandManager.execute(VIEW_HIDE_W3CVAL);
        });
        
        PanelManager.createBottomPanel('camden.w3cvalidation.panel', $content, 200);

        //Listen for clicks
        $(document).on("click", "#w3cvalidation a", function(e) {

            if($(this).hasClass("close")) return;
            e.preventDefault();

            var baseURL = 'http://validator.w3.org/';

            /*
            For some reason, some of the links are relative and end up being file://. Sniff for it.
            */
            var url = e.currentTarget.href;
            if(url.indexOf("file://") === 0) {
                //remove up to www
                url = url.replace(/.*?www\//,"");
                var newURL = baseURL + url;
                //window.open(newURL);
                brackets.app.openURLInDefaultBrowser(function (err) {}, newURL);
            } else {
                //window.open(url);
                brackets.app.openURLInDefaultBrowser(function (err) {}, url);
            }
        });
        
    });
    
    
});
