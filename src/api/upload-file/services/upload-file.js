'use strict';

/**
 * upload-file service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::upload-file.upload-file');
