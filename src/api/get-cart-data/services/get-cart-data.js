'use strict';

/**
 * get-cart-data service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::get-cart-data.get-cart-data');
