﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SitecoreCognitiveServices.Foundation.MSSDK.Models.Bing.WebSearch {
    public class WebSearchNews
    {
        public string Id { get; set; }
        public string ReadLink { get; set; }
        public List<WebSearchNewsResult> Value { get; set; }
    }
}