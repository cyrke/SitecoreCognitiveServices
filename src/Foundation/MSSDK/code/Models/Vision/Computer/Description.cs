﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitecoreCognitiveServices.Foundation.MSSDK.Models.Vision.Computer {
    public class Description {
        public string[] Tags { get; set; }

        public Caption[] Captions { get; set; }
    }
}
