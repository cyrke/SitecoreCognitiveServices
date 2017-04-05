﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using Microsoft.Bot.Builder.Luis.Models;
using Sitecore.SharedSource.CognitiveServices.Foundation;
using Microsoft.SharedSource.CognitiveServices.Models.Language.Luis;
using Sitecore.Security.Accounts;

namespace Sitecore.SharedSource.CognitiveServices.Ole.Intents {
    public interface IGreetIntent : IIntent { }

    public class GreetIntent : IGreetIntent
    {
        public string Name => "greet";

        public string Respond(ITextTranslator translator, QueryResult result, Dictionary<string, string> parameters)
        {
            string fullName = Sitecore.Context.User.Profile.FullName;
            
            return $"Hi {fullName}, how can I help you?";
        }
    }
}