"use strict";

//모듈
const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const FileStore = require('session-file-store')(session); // 세션을 파일에 저장
const cookieParser = require('cookie-parser');

const dotenv = require("dotenv");
dotenv.config();

const app = express();

//라우팅
const home = require("./src/routes/home");
const logger = require('./src/config/logger');

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());

app.use(session({
    secret: 'DevT',
    resave: false,
    saveUninitialized: true,
    store : new FileStore()
      })
  );

//URL을 통해 전달되는 데이터에 한글,공백과 같은 문자가 포함된 경우 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended :true }));

app.use("/", home); // use = 미들웨어를 등록해주는 메서드


module.exports = app;

