﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MicrosoftCognitiveServices.Foundation.MSSDK.Models.Language.Linguistic {
    public class NextWordCandidate
    {
        public string Word { get; set; }
        public double Probability { get; set; }
    }
}