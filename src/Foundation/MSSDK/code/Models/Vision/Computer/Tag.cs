﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitecoreCognitiveServices.Foundation.MSSDK.Models.Vision.Computer {
    public class Tag {
        public string Name { get; set; }

        public double Confidence { get; set; }

        public string Hint { get; set; }
    }
}
