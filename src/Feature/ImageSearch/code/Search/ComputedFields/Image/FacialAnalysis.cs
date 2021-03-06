﻿using System.Web.Script.Serialization;

namespace SitecoreCognitiveServices.Feature.ImageSearch.Search.ComputedFields.Image
{
    public class FacialAnalysis : BaseComputedField
    {
        protected override object GetFieldValue(CognitiveIndexableImageItem cognitiveIndexable)
        {
            if (cognitiveIndexable.Faces == null)
            {
                return null;
            }

            var json = new JavaScriptSerializer().Serialize(cognitiveIndexable.Faces);
            return json;
        }
    }
}