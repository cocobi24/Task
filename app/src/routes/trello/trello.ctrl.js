"use strict";

const logger = require("../../config/logger");
const Trello = require("../../models/Trello");
// const session = require('express-session');
// const client = require('../../config/db');

const output = {

    listRead: (req, res) => {
        logger.info(`GET /listRead 304 "리스트 읽기"`);
        res.redirect('/');
    },

    listCreate: (req, res) => {
        logger.info(`GET /listCreate 304 "리스트 추가"`);
        res.redirect('/');
    },

    listUpdate: (req, res) => {
        logger.info(`GET /listUpdate 304 "리스트 수정"`);
        res.redirect('/');
    },

    listDelete: (req, res) => {
        logger.info(`GET /listDelete 304 "리스트 제거"`);
        res.redirect('/');
    },

    cardRead: (req, res) => {
        logger.info(`GET /cardRead 304 "카드 읽기"`);
        res.redirect('/');
    },

    cardCreate: (req, res) => {
        logger.info(`GET /cardCreate 304 "카드 추가"`);
        res.redirect('/');
    },

    cardUpdate: (req, res) => {
        logger.info(`GET /cardUpdate 304 "카드 수정"`);
        res.redirect('/');
    },

    cardDelete: (req, res) => {
        logger.info(`GET /cardDelete 304 "카드 제거"`);
        res.redirect('/');
    },
    
};

const process = {

    listRead: async (req, res) => {
        const trello =  new Trello(req.body);
        const response = await trello.listRead();

        const url = {
            method: "POST",
            path: "/",
            status: response.err ? 400 : 201
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

    listCreate: async (req, res) => {
        const trello =  new Trello(req.body);
        const response = await trello.listCreate();

        const url = {
            method: "POST",
            path: "/",
            status: response.err ? 400 : 201
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

    listUpdate: async (req, res) => {
        const trello =  new Trello(req.body);
        const response = await trello.listUpdate();

        const url = {
            method: "POST",
            path: "/",
            status: response.err ? 400 : 201
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

    listDelete: async (req, res) => {
        const trello =  new Trello(req.body);
        const response = await trello.listDelete();

        const url = {
            method: "POST",
            path: "/",
            status: response.err ? 400 : 201
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

    cardRead: async (req, res) => {
        const trello =  new Trello(req.body);
        const response = await trello.cardRead();

        const url = {
            method: "POST",
            path: "/",
            status: response.err ? 400 : 201
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

    cardCreate: async (req, res) => {
        const trello =  new Trello(req.body);
        const response = await trello.cardCreate();

        const url = {
            method: "POST",
            path: "/",
            status: response.err ? 400 : 201
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

    cardUpdate: async (req, res) => {
        const trello =  new Trello(req.body);
        const response = await trello.cardUpdate();

        const url = {
            method: "POST",
            path: "/",
            status: response.err ? 400 : 201
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

    cardDelete: async (req, res) => {
        const trello =  new Trello(req.body);
        const response = await trello.cardDelete();

        const url = {
            method: "POST",
            path: "/",
            status: response.err ? 400 : 201
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

};

module.exports = {
    output,
    process
};

const log = (response, url) => {
    if(response.err) {
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
            );
    } else {
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${
                response.msg || ""}`
        );
    }
};