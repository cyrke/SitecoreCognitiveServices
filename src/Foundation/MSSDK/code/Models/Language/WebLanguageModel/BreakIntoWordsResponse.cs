﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MicrosoftCognitiveServices.Foundation.MSSDK.Models.Language.WebLanguageModel {
    public class BreakIntoWordsResponse
    {
        public List<BreakIntoWordsCandidate> Candidates { get; set; }
    }
}