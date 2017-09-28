jQuery.noConflict();

//nav
jQuery(document).ready(function () {
    //toggles tabs based on nav clicks
    jQuery(".nav-btn")
        .click(function () {
            var selected = "selected";
            var tab = jQuery(this).attr("rel");
            jQuery(".nav-btn").removeClass(selected);
            jQuery(".tab-content").removeClass(selected);
            jQuery(".tab-content." + tab).addClass(selected);
            jQuery(this).addClass(selected);
        });
});

//reanalyze
jQuery(document).ready(function () {
    //handles reanalyze all form
    var reanlyzeAllForm = ".reanalyze-all-form";
    jQuery(reanlyzeAllForm + " button")
        .click(function (event) {
            event.preventDefault();

            var idValue = jQuery(reanlyzeAllForm + " #id").attr("value");
            var langValue = jQuery(reanlyzeAllForm + " #language").attr("value");
            var dbValue = jQuery(reanlyzeAllForm + " #database").attr("value");

            jQuery(".form").hide();
            jQuery(".progress-indicator").show();

            jQuery.post(
                jQuery(reanlyzeAllForm).attr("action"),
                {
                    id: idValue,
                    language: langValue,
                    db: dbValue
                }
            ).done(function (r) {
                jQuery(".result-count").text(r.ItemCount);
                jQuery(".progress-indicator").hide();
                jQuery(".result-display").show();
            });
        });
});

//set alt tags
jQuery(document).ready(function () {
    //handles the submit on the set all alts form
    var setAltsAllForm = ".set-alt-all-form";
    jQuery(setAltsAllForm + " button")
        .click(function (event) {
            event.preventDefault();

            var idValue = jQuery(setAltsAllForm + " #id").attr("value");
            var langValue = jQuery(setAltsAllForm + " #language").attr("value");
            var dbValue = jQuery(setAltsAllForm + " #database").attr("value");
            var thresholdValue = jQuery(setAltsAllForm + " #threshold").val();
            var overwriteValue = jQuery(setAltsAllForm + " #overwrite").is(':checked');

            jQuery(".form").hide();
            jQuery(".progress-indicator").show();

            jQuery.post(
                jQuery(setAltsAllForm).attr("action"),
                {
                    id: idValue,
                    language: langValue,
                    db: dbValue,
                    threshold: thresholdValue,
                    overwrite: overwriteValue
                }
            ).done(function (r) {
                jQuery(".result-modified").text(r.ItemsModified);
                jQuery(".result-count").text(r.ItemCount);
                jQuery(".progress-indicator").hide();
                jQuery(".result-display").show();
            }).always(function () {
                jQuery(".progress-indicator").hide();
            });
        });
});

//image search
jQuery(document).ready(function () {
    var config = {
        '.chosen-select': { width: "100%" }
    }
    var results = [];
    for (var selector in config) {
        var elements = jQuery(selector);
        for (var i = 0; i < elements.length; i++) {
            results.push(new Chosen(elements[i], config[selector]));
        }
    }

    jQuery(".slider-range").each(function () {
        jQuery(this).slider({
            range: true,
            min: 0,
            max: 100,
            values: [0, 100],
            slide: function (event, ui) {
                var parent = jQuery(this).parent('.emotion-item');
                var filterValue = jQuery(parent).find(".filter-value");
                var rangeVal = ui.values[0] + " - " + ui.values[1];
                rangeVal += (filterValue.data("field") == "age") ? "" : "%";
                filterValue.html(rangeVal);
                filterValue.data('min', ui.values[0]);
                filterValue.data('max', ui.values[1]);
            }
        });

        var parent = jQuery(this).parent('.emotion-item');
        var filterValue = jQuery(parent).find(".filter-value");
        var htmlVal = "0 - 100";
        htmlVal += (filterValue.data("field") == "age") ? "" : "%";
        filterValue.html(htmlVal);
        filterValue.data('min', 0);
        filterValue.data('max', 100);
    });

    //closes modal and send selected image back to RTE
    var imageSearchForm = ".image-search-form";
    var rteSearchForm = ".rte-search-form";
    jQuery(imageSearchForm + " .form-submit")
        .click(function (event) {
            event.preventDefault();

            var img = jQuery(".result-items .selected");
            if (img.length)
                CloseRadWindow(jQuery(".result-items .selected").html());
            else
                alert("You need to select an image.");
        });

    //closes modal on cancel press
    jQuery(imageSearchForm + " .form-cancel")
        .click(function (event) {
            event.preventDefault();

            CloseRadWindow();
        });

    function RefreshQuery(){
        pageNum = 1;
        RunQuery();
    }

    var imageSearchSelect = ".filter-section select";
    jQuery(imageSearchSelect).change(function () {
        RefreshQuery();
    });
    
    jQuery(".slider-range, .chosen-results").mouseup(function (e) {
        if(e.which != 1) 
            return;
        
        RefreshQuery();
    });
    
    //performs search on 'enter-press' on the form
    jQuery(imageSearchForm + " .search-submit, " + imageSearchForm + " .cognitiveSearchButton")
        .click(function (event) {
            event.preventDefault();
                 
            RefreshQuery()
        });

    //performs image search
    var pageNum = 1;
    var pageSize = 35;
    var pageCount = 1;
    var searchResults;
    function RunQuery() {
        var textValue = jQuery(imageSearchForm + " .rte-search-input").val();
        var langValue = jQuery(imageSearchForm + " #language").attr("value");
        var dbValue = jQuery(imageSearchForm + " #database").attr("value");
        var gender = jQuery(imageSearchForm + " #gender").val();
        var glasses = jQuery(imageSearchForm + " #glasses").val();
        var size = jQuery(imageSearchForm + " #size").val();

        jQuery(rteSearchForm + " .progress-indicator").show();
        jQuery(".result-items").hide();

        var tags = GetTagParameters();
        var ranges = GetRangeParameters();

        jQuery.post(
            jQuery(imageSearchForm).attr("action"),
                {
                    formParameters: [],
                    tagParameters: tags,
                    rangeParameters: ranges,
                    gender: gender,
                    glasses: glasses,
                    size: size,
                    language: langValue,
                    db: dbValue,
                    page: pageNum,
                    pageLength: pageSize
                }
            ).done(function (r) {
                searchResults = r;

                jQuery(".pagenum").text(pageNum);
                pageCount = Math.ceil(r.ResultCount / pageSize);
                jQuery(".pagecount").text(pageCount);

                jQuery(".result-count").text(r.ResultCount);
                jQuery(".result-items").text("");
                jQuery(".result-items").show();

                for (var i = 0; i < r.Results.length; i++) {
                    var d = r.Results[i];
                    if (d.Url != undefined) {
                        jQuery(".result-items").append("<div class='result-img-wrap'><img src=\"" + d.Url + "\" alt=\"" + d.Alt + "\" title=\"" + d.Alt + "\" /></div>");
                    }
                }

                jQuery(".result-img-wrap")
                    .on("click", function () {
                        jQuery(".result-items .selected").removeClass("selected");
                        jQuery(this).addClass("selected");
                    });

                jQuery(".search-choice-close")
                    .on('click', function () {
                        setTimeout(RefreshQuery, 100);
                });
            }).always(function () {
                jQuery(rteSearchForm + " .progress-indicator").hide();
            });
    }

    //changes the current page
    var prevBtn = ".result-nav-prev";
    var nextBtn = ".result-nav-next";
    jQuery(prevBtn).click(function (e) {
        if (pageNum < 2)
            return;

        pageNum--;
        RunQuery();
    });

    jQuery(nextBtn).click(function (e) {
        if ((pageNum+1) > pageCount)
            return;

        pageNum++;
        RunQuery();
    });

    function GetRangeParameters() {
        var params = [];

        //tags
        var filterElements = jQuery('.filter-value');
        if (filterElements.length > 0) {

            filterElements.each(function () {
                var values = [];
                values.push(jQuery(this).data('min'));
                values.push(jQuery(this).data('max'));

                params.push({
                    key: jQuery(this).data('field'),
                    value: values
                });
            });
        }

        return params;
    }

    function GetTagParameters() {
        var params = [];
        params.push({
            key: "tags",
            value: [""]
        });

        //tags
        var tagElements = jQuery('.search-choice span');
        if (tagElements.length > 0) {

            var values = [];

            tagElements.each(function () {
                var text = jQuery(this).text();
                text = text.substring(0, text.indexOf(' ('));
                text = text.toLowerCase();
                values.push(text);
            });

            params.push({
                key: "tags",
                value: values
            });
        }

        return params;
    }

    //get results for the first load
    if (jQuery(imageSearchForm).length)
        RunQuery();
});

//closes the search modal and passes value back to the RTE
function CloseRadWindow(value) {
    
    var radWindow;

    if (window.radWindow)
        radWindow = window.radWindow;
    else if (window.frameElement && window.frameElement.radWindow)
        radWindow = window.frameElement.radWindow;
    else
        window.close();

    radWindow.Close(value);
}

/* Webedit Image Field response from insert click

Request URL:https://sc90u0.local/sitecore/shell/Applications/WebEdit/WebEditRibbon.aspx?sc_content=master&ribbonId=%7B570A52B6-6755-461A-8052-5B95EF766F74%7D&id=%7B110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9%7D&dev=%7BFE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3%7D&db=master&mode=edit&url=%2F%3Fsc_mode%3Dedit%26sc_itemid%3D%257b110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9%257d%26sc_version%3D1%26sc_lang%3Den%26sc_site%3Dwebsite&la=en&pageSite=website&version=1&sc_speakribbon=1
Request Method:POST
__RESULT:{4B48D87B-E463-42DD-B0F2-F45C382F6204}
scHtmlValue:{"commands":[{"click":"chrome:field:editcontrol({command:\"cognitive:chooseimage\"})","header":"Choose Cognitive Image","icon":"/temp/iconcache/office/16x16/photo_portrait.png","disabledIcon":"/temp/photo_portrait_disabled16x16.png","isDivider":false,"tooltip":"Choose an image using cognitive image search.","type":""},{"click":"chrome:field:editcontrol({command:\"webedit:chooseimage\"})","header":"Choose Image","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2.png","disabledIcon":"/temp/photo_landscape2_disabled16x16.png","isDivider":false,"tooltip":"Choose an image.","type":""},{"click":"chrome:field:editcontrol({command:\"webedit:editimage\"})","header":"Properties","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_edit.png","disabledIcon":"/temp/photo_landscape2_edit_disabled16x16.png","isDivider":false,"tooltip":"Modify image appearance.","type":""},{"click":"chrome:field:editcontrol({command:\"webedit:clearimage\"})","header":"Clear","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_delete.png","disabledIcon":"/temp/photo_landscape2_delete_disabled16x16.png","isDivider":false,"tooltip":"Remove the image.","type":""},{"click":"chrome:common:edititem({command:\"webedit:open\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\"webedit:personalize\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\"webedit:editvariations\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}?lang=en&amp;ver=1","custom":{},"displayName":"Image","expandedDisplayName":null}
scPlainValue:
scLayout: {
    "r": {
        "@xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
            "d": [
                {
                    "@id": "{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}",
                    "@l": "{14030E9F-CE92-49C6-AD87-7D49B50E42EA}",
                    "r": [
                        {
                            "@ds": "",
                            "@id": "{885B8314-7D8C-4CBB-8000-01421EA8F406}",
                            "@par": "",
                            "@ph": "main",
                            "@uid": "{43222D12-08C9-453B-AE96-D406EBB95126}"
                        },
                        {
                            "@ds": "",
                            "@id": "{CE4ADCFB-7990-4980-83FB-A00C1E3673DB}",
                            "@par": "",
                            "@ph": "/main/centercolumn",
                            "@uid": "{CF044AD9-0332-407A-ABDE-587214A2C808}"
                        },
                        {
                            "@ds": "",
                            "@id": "{493B3A83-0FA7-4484-8FC9-4680991CF743}",
                            "@par": "",
                            "@ph": "/main/centercolumn/content",
                            "@uid": "{B343725A-3A93-446E-A9C8-3A2CBD3DB489}"
                        }
                    ]
                },
                {
                    "@id": "{46D2F427-4CE5-4E1F-BA10-EF3636F43534}",
                    "@l": "{14030E9F-CE92-49C6-AD87-7D49B50E42EA}",
                    "r": {
                        "@ds": "",
                        "@id": "{493B3A83-0FA7-4484-8FC9-4680991CF743}",
                        "@par": "",
                        "@ph": "content",
                        "@uid": "{A08C9132-DBD1-474F-A2CA-6CA26A4AA650}"
                    }
                }
            ]
    }
}
scDeviceID: FE5D7FDF89C04D999AA3B5FBD009C9F3
scItemID: 110D559FDEA542EA9C1C8A5DF7E70EF9
scLanguage: en
scSite: website
scCapabilities: design | edit | personalization | testing
*/

/* Webedit RTE Field response from insert click

Request URL:https://sc90u0.local/sitecore/shell/default.aspx?xmlcontrol=RichText.InsertImage&mo=webedit&la=en
Request Method:POST
__PARAMETERS:
__EVENTTARGET:OK
__EVENTARGUMENT:
__SOURCE:OK
__EVENTTYPE:click
__CONTEXTMENU:
__MODIFIED:
__ISEVENT:1
__SHIFTKEY:
__CTRLKEY:
__ALTKEY:
__BUTTON:0
__KEYCODE:undefined
__X:1056
__Y:663
__URL:https://sc90u0.local/sitecore/shell/default.aspx?xmlcontrol=RichText.InsertImage&mo=webedit&la=en
__CSRFTOKEN:/wEFJDFkZmZjYjE2LWZmNTgtNGExYS1iODZhLWVlMjg4M2ViYzhjZg==
__VIEWSTATE:A0BED8D0263C4E2D96C5246E67BA7EB6
__VIEWSTATE:
Treeview_Selected:04DAD0FDDB664070881F17264CA257E1
Treeview_Database:master
Treeview_Parameters:?dv=Master&fi
Treeview_Language:en
AlternateText:
Width:1600
Height:550
Filename:/Default Website/cover
*/