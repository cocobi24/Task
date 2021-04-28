"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");
const session = require('express-session');
const client = require('../../config/db');

const output = {
    home: (req, res) => {
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        if(req.session.is_logined == true){
            res.render('home/index',{
                is_logined : req.session.is_logined,
                name : req.session.name
            });
        }else{
            res.render('home/index',{
                is_logined : false
            });
        }
    
        // res.render("home/index");
    },

    login: (req, res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login");
    },

    register: (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register");
    },

    logout: (req, res) => {
        logger.info(`GET /logout 304 "로그아웃 화면으로 이동"`);
        console.log(req.session);
   
        req.session.destroy(function(err){
            res.redirect('/');
          });
    }
};

const process = {
    login: async (req, res) => {
        const user =  new User(req.body);
        const response = await user.login();

        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200
        };

        const body = req.body;
        const id = body.id;
        const pw = body.pw;
        const name = body.name

        client.query('select * from users where id=?',[id],(err,data)=>{
            // 로그인 확인
            console.log(data[0]);
            console.log(id);
            console.log(data[0].id);
            console.log(data[0].psword);
            console.log(id == data[0].id);
            console.log(pw == data[0].psword);
            if(id == data[0].id || pw == data[0].psword){
                console.log('로그인 성공');
                // 세션에 추가
                req.session.is_logined = true;
                req.session.name = data.name;
                // req.session.id = data.id;
                req.session.pw = data.psword;
                req.session.save(function(){ // 세션 스토어에 적용하는 작업
                    res.render('home/index',{ // 정보전달
                        name : data[0].name,
                        id : data[0].id,
                        is_logined : true
                    });
                });
            }else{
                console.log('로그인 실패');
                res.render('login');
            }
        });

        log(response, url);
        return res.status(url.status).json(response);
    },

    register: async (req, res) => {
        const user =  new User(req.body);
        const response = await user.register();

        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 409 : 201
        };

        log(response, url);
        return res.status(url.status).json(response);
    }
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