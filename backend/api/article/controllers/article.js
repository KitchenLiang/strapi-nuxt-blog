'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
module.exports = {
  updateLikes: async ctx=> {
    let entity = await strapi.services.article.findOne({id:ctx.params.id});
    let entity2 = await strapi.services.article.update({id:ctx.params.id}, {likes:entity.likes+1});
    return sanitizeEntity(entity2.likes, { model: strapi.models.article });
  },
  updateVisits: async ctx=> {
    let entity = await strapi.services.article.findOne({id:ctx.params.id});
    let entity2 = await strapi.services.article.update({id:ctx.params.id}, {visits:entity.visits+1});
    return sanitizeEntity(entity2.visits, { model: strapi.models.article });
  },
  searchCount: async ctx=> {
    return strapi.services.article.count(ctx.query);
  },
};
