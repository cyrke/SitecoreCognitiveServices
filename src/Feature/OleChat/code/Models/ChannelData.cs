﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SitecoreCognitiveServices.Foundation.MSSDK.Models.Language.Luis.Connector;

namespace SitecoreCognitiveServices.Feature.OleChat.Models
{
    public class ChannelData
    {
        public IntentOptionSet OptionSet { get; set; }
        public string Action { get; set; }
    }
}