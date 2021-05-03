"use strict";

const db = require('../config/db');

class TrelloStorage {

    static listR(dept) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM list WHERE dept = ?;";
            db.query(query, [dept], (err, data) => {
               if (err) reject(`${err}`);
               else resolve(data[0]);
            });
        });
    }

    static async listC(listCInfo){
        return new Promise((resolve, reject) => {
            const query = "INSERT list (id,lname) VALUES (?, ?);";
            db.query(query, [listCInfo.id, listCInfo.lname], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async listU(listUInfo){
        return new Promise((resolve, reject) => {
            const query = "UPDATE list SET lname = ? WHERE lno = ?; ";
            db.query(query, [listUInfo.lname, listUInfo.lno], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async listD(listDInfo){
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM list WHERE lno = ?;";
            db.query(query, [listDInfo.lno], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static cardR(lno) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM card WHERE lno = ?;";
            db.query(query, [lno], (err, data) => {
               if (err) reject(`${err}`);
               else resolve(data[0]);
            });
        });
    }

    static async cardC(cardCInfo){
        return new Promise((resolve, reject) => {
            const query = "INSERT card (lno,descript) VALUES (?, ?);";
            db.query(query, [cardCInfo.lno, cardCInfo.descript], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async cardU(cardUInfo){
        return new Promise((resolve, reject) => {
            const query = "UPDATE card SET descript = ? WHERE cno = ?;";
            db.query(query, [cardUInfo.descript, cardUInfo.cno], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async cardD(cardDInfo){
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM card WHERE cno = ?;";
            db.query(query, [cardDInfo.cno], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

}

module.exports = TrelloStorage;