﻿using System;
using SitecoreCognitiveServices.Foundation.SCSDK.Wrappers;
using SitecoreCognitiveServices.Foundation.MSSDK.Repositories.Knowledge;
using SitecoreCognitiveServices.Foundation.MSSDK.Models.Knowledge.EntityLinking;

namespace SitecoreCognitiveServices.Foundation.SCSDK.Services.MSSDK.Knowledge
{
    public class EntityLinkingService : IEntityLinkingService
    {
        protected IEntityLinkingRepository EntityLinkingRepository;
        protected ILogWrapper Logger;

        public EntityLinkingService(
            IEntityLinkingRepository entityLinkingRepository,
            ILogWrapper logger) 
        {
            EntityLinkingRepository = entityLinkingRepository;
            Logger = logger;
        }

        public virtual EntityLink[] Link(string text, string selection = "", int offset = 0) {
            try {
                var result = EntityLinkingRepository.Link(text, selection, offset);

                return result;
            } catch (Exception ex) {
                Logger.Error("EntityLinkingService.Link failed", this, ex);
            }

            return null;
        }
    }
}