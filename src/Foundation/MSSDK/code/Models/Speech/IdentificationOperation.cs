﻿using MicrosoftCognitiveServices.Foundation.MSSDK.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MicrosoftCognitiveServices.Foundation.MSSDK.Models.Speech {
    public class IdentificationOperation : Operation {
        public Identification ProcessingResult { get; set; }
    }
}
