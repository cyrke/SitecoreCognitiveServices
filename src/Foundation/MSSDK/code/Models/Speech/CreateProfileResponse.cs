﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitecoreCognitiveServices.Foundation.MSSDK.Models.Speech {
    public class CreateProfileResponse {
        [JsonProperty("identificationProfileId")]
        public Guid ProfileId { get; set; }
    }
}
