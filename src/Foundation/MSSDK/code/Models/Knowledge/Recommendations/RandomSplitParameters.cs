﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SitecoreCognitiveServices.Foundation.MSSDK.Models.Knowledge.Recommendations
{
    public class RandomSplitParameters
    {
        public int TestPercent { get; set; }
        public int RandomSeed { get; set; }
    }
}