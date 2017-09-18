﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using MicrosoftCognitiveServices.Foundation.MSSDK.Enums;

namespace MicrosoftCognitiveServices.Foundation.MSSDK.Models.Speech {
    public class Verification {
        [JsonConverter(typeof(StringEnumConverter))]
        public Result Result { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Confidence Confidence { get; set; }

        public string Phrase { get; set; }
    }
}
