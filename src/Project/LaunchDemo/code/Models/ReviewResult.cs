﻿using System.Collections.Generic;
using SitecoreCognitiveServices.Foundation.MSSDK.Models.Vision.ContentModerator;

namespace SitecoreCognitiveServices.Project.LaunchDemo.Models
{
    public class ReviewResult
    {
        public GetReviewResponse Review { get; set; }
        public List<string> CreateReviews { get; set; }
    }
}