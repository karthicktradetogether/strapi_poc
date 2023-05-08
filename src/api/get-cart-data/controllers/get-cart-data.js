'use strict';

const { default: axios } = require('axios');
const { createApplicant } = require('./sumsub');
const { checkEmail } = require('../../../utils/regexPattern');

/**
 * get-cart-data controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


let errorFieldsArray = [];
async function checkCreateApplicantBodyParas(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            return checkCreateApplicantBodyParas(obj[key])
        }
        if (obj[key] === "") {
            errorFieldsArray.push(`${key} => should not be empty`);
        } else if (key === 'email') {
            let validEmail = await checkEmail(obj[key]);
            if (validEmail === false) {
                errorFieldsArray.push(`${key} => invalid value`)
            }
        }
    }
}

module.exports = createCoreController('api::get-cart-data.get-cart-data', ({ strapi }) => ({
    async customAction(ctx) {
        try {
            let reqBody = ctx.request.body;

            await checkCreateApplicantBodyParas(reqBody);

            if ('email' in reqBody === false) {
                throw JSON.stringify({ status: 0, message: "Email is mandatory!" });
            }

            if (errorFieldsArray.length !== 0) {
                let errorMessage = errorFieldsArray.join(", ");

                // console.log(errorMessage);

                ctx.body = JSON.stringify({ status: 0, message: errorMessage });

                errorFieldsArray = [];
                errorMessage = "";

                return;

            }

            console.log(reqBody);

            await axios(createApplicant(reqBody)).then(response => {
                if (response.status === 201) {
                    console.log(response.data);
                    ctx.body = JSON.stringify({ status: 1, message: "applicant created successfully!" });
                    // ctx.body = response.config.data;
                } else {
                    ctx.body = JSON.stringify({ status: 0, message: "Error in creating applicant!" });
                }
            }).catch(err => {
                console.log("Error");
                console.log(err);
                ctx.body = JSON.stringify({ status: 0, message: "Error in creating applicant!" });
            })


        } catch (error) {
            ctx.body = error;
        }
    }
}));
