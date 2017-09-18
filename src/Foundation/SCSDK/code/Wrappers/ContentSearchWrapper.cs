﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.ContentSearch;

namespace SitecoreCognitiveServices.Foundation.SCSDK.Wrappers
{
    public interface IContentSearchWrapper
    {
        ISearchIndex GetIndex(string indexName);
    }
    public class ContentSearchWrapper : IContentSearchWrapper
    {
        public ISearchIndex GetIndex(string indexName)
        {
            return ContentSearchManager.GetIndex(indexName);
        }
    }
}