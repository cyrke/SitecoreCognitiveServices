﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SitecoreCognitiveServices.Foundation.MSSDK.Models.Language.Linguistic;

namespace SitecoreCognitiveServices.Foundation.MSSDK.Models.Language.WebLanguageModel {
    public class GenerateNextWordsResponse
    {
        public List<NextWordCandidate> Candidates { get; set; }
    }
}