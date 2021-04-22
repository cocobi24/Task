"use strict";

class UserStorage {
    static #users = {
        id: ["coco", "caca"],
        psword: ["1234", "5678"],
        name: ["코코", "카카"]
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, fields) => {
           if (users.hasOwnProperty(fields)) {
               newUsers[fields] = users[fields];
           }
           return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;