"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./trello.ctrl");

// GET
router.get("/listRead", ctrl.output.listRead);
router.get("/listCreate", ctrl.output.listCreate);
router.get("/listUpdate", ctrl.output.listUpdate);
router.get("/listDelete", ctrl.output.listDelete);
router.get("/cardRead", ctrl.output.cardRead);
router.get("/cardCreate", ctrl.output.cardCreate);
router.get("/cardUpdate", ctrl.output.cardUpdate);
router.get("/cardDelete", ctrl.output.cardDelete);


// POST
router.post("/listRead", ctrl.process.listRead);
router.post("/listCreate", ctrl.process.listCreate);
router.post("/listUpdate", ctrl.process.listUpdate);
router.post("/listDelete", ctrl.process.listDelete);
router.post("/cardRead", ctrl.process.cardRead);
router.post("/cardCreate", ctrl.process.cardCreate);
router.post("/cardUpdate", ctrl.process.cardUpdate);
router.post("/cardDelete", ctrl.process.cardDelete);

module.exports = router;