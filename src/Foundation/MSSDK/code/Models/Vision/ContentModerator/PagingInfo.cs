﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MicrosoftCognitiveServices.Foundation.MSSDK.Models.Vision.ContentModerator
{
    public class PagingInfo
    {
        public int Total { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
        public int Returned { get; set; }
    }
}