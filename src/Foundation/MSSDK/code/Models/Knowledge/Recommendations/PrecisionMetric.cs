﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MicrosoftCognitiveServices.Foundation.MSSDK.Models.Knowledge.Recommendations
{
    public class PrecisionMetric
    {
        public int K { get; set; }
        public float Percentage { get; set; }
        public int UsersInTest { get; set; }
        public int UsersConsidered { get; set; }
        public int UsersNotConsidered { get; set; }
    }
}