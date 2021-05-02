"use strict";

const TrelloStorage = require("./TrelloStorage");

class Trello {
    constructor(body) {
        this.body = body;
    }

    async listRead() {
        const client = this.body;
        try {
            const response = await TrelloStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err};
        }
    }

    async listCreate() {
        const client = this.body;
        try {
            const response = await TrelloStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err};
        }
    }

    async listUpdate() {
        const client = this.body;
        try {
            const response = await TrelloStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err};
        }
    }

    async listDelete() {
        const client = this.body;
        try {
            const response = await TrelloStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err};
        }
    }

    async cardRead() {
        const client = this.body;
        try {
            const response = await TrelloStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err};
        }
    }

    async cardCreate() {
        const client = this.body;
        try {
            const response = await TrelloStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err};
        }
    }

    async cardUpdate() {
        const client = this.body;
        try {
            const response = await TrelloStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err};
        }
    }

    async cardDelete() {
        const client = this.body;
        try {
            const response = await TrelloStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err};
        }
    }

}

module.exports = Trello;
