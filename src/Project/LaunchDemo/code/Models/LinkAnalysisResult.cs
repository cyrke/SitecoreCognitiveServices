﻿
using SitecoreCognitiveServices.Foundation.MSSDK.Models.Knowledge.EntityLinking;
using System.Linq;

namespace SitecoreCognitiveServices.Project.LaunchDemo.Models {
    public class LinkAnalysisResult : ILinkAnalysisResult
    {
        public string FieldName { get; set; }
        public string FieldValue { get; set; }
        public EntityLink[] EntityAnalysis { get; set; }

        public string HighlightLinks(string htmlEntity, string cssClass, double scoreThreshold)
        {
            string s = FieldValue;
            foreach (EntityLink l in EntityAnalysis.Where(a => a.Score >= scoreThreshold))
            {
                foreach (Match m in l.Matches)
                {
                    s = s.Replace(m.Text, $"<{htmlEntity} class=\"{cssClass}\">{m.Text}</{htmlEntity}>");
                }
            }

            return s;
        }
    }
}