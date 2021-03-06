﻿using System.Web.Script.Serialization;

namespace SitecoreCognitiveServices.Feature.ImageSearch.Search.ComputedFields.Image
{
    public class EmotionAnalysis : BaseComputedField
    {
        protected override object GetFieldValue(CognitiveIndexableImageItem cognitiveIndexable)
        {
            if (cognitiveIndexable.Emotions == null)
            {
                return null;
            }

            var json = new JavaScriptSerializer().Serialize(cognitiveIndexable.Emotions);
            return json;
        }
    }
}