﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SitecoreCognitiveServices.Foundation.MSSDK.Models.Language.WebLanguageModel {
    public class WebLMModel
    {
        public string Corpus { get; set; }
        public string Model { get; set; }
        public int MaxOrder { get; set; }
        public List<string> SupportedOperations { get; set; }
    }
}