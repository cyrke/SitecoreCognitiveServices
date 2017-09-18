﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MicrosoftCognitiveServices.Foundation.MSSDK.Models.Speech {
    public class Enrollment : EnrollmentBase {
        public double RemainingEnrollmentSpeechTime { get; set; }

        public double SpeechTime { get; set; }

        public double EnrollmentSpeechTime { get; set; }
    }
}
