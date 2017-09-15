jQuery.noConflict();

//ole chat
jQuery(document).ready(function () {
    //ole chat
    var chatInput = ".chat-input";
    var chatForm = ".chat-form";
    var chatConversation = ".chat-conversation";
    var chatConversationData = {};

    //initiate conversation
    SendChatRequest("Hello");

    //sends chat text on 'enter-press' on the form
    jQuery(chatForm + " .chat-submit")
        .click(function (event) {
            event.preventDefault();
            var queryValue = jQuery(chatInput).val();
            if (queryValue === "")
                return;

            jQuery(chatInput).val("");
            UpdateChatWindow(queryValue, null, "user");

            SendChatRequest(queryValue);
        });

    function SendChatRequest(queryValue)
    {
        var langValue = jQuery(".chat-lang").val();
        var dbValue = jQuery(".chat-db").val();
        var idValue = jQuery(".chat-id").val();
        
        jQuery
            .post(jQuery(chatForm).attr("action"), GenerateActivity(queryValue, langValue, dbValue, idValue))
            .done(function (r) {
                chatConversationData = r.conversation;
                UpdateChatWindow(r.Text, r.Entities, "bot");
            });
    }

    function UpdateChatWindow(text, options, type) {
        var convoBox = jQuery(chatConversation);
        convoBox.append("<div class='" + type + "'><span class='message'>" + text + "<span class='icon'></span></span></div>");
        if (options != null) {
            var optionList = "";
            for (i = 0; i < options.length; i++) 
            {
                optionList += "<div class='user-option'>" + options[i].Type + "</div>";
            }
            convoBox.append("<div class='" + type + "'><span class='message'>" + optionList + "<span class='icon'></span></span></div>");
        }
        convoBox.scrollTop(convoBox[0].scrollHeight - convoBox.height());
    }

    function GenerateActivity(query, langValue, dbValue, idValue) {

        var data = {
            language: "en",
            database: "master",
            id: "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
        };

        var activity = {
            type: "message",
            id: GenerateGuid(),
            timestamp: Date.now(),
            channelId: "ole",
            from: {
                id: "2c1c7fa3",
                name: "User1"
            },
            conversation: {
                isGroup: false,
                id: "8a684db8",
                name: "Conv1"
            },
            recipient: {
                id: "56800324",
                name: "Bot1"
            },
            text: query,
            attachments: [],
            entities: [],
            channelData: JSON.stringify(data)
        }

        return activity;
    }

    function GenerateGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});