"use strict";

if(userid){
    
    const lno =  document.querySelector("#lno"),    
        id = userid,
        dept = userdept,
        lname = document.querySelector("#trello-list-title-input"),
    // button
        listCr = document.querySelector("#trello-list-title-submit"),
        listUp = document.querySelector("#listUp"),
        listDe = document.querySelector("#listDe");
        
        listCr.addEventListener("click", listC);
        listUp.addEventListener("click", listU);
        listDe.addEventListener("click", listD);

    function listC() {
        if (!title.value) return alert("아이디를 입력해주십시오.");

        const req = {
            id,
            dept,
            lname: lname.value
        };

        fetch("/listCreate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                console.info(`POST / 304 "리스트 등록 완료"`);
            } else {
                if (res. err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("리스트 작성 중 에러 발생");
        });

    }

    function listU() {

        const req = {
            lname: lname.value,
            lno: lno.value
        };

        fetch("/listUpdate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                console.info(`POST / 304 "리스트 수정 완료"`);
            } else {
                if (res. err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("리스트 수정 중 에러 발생");
        });

    }

    function listD() {

        const req = {
            lno: lno.value
        };

        fetch("/listDelete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                console.info(`POST / 304 "리스트 삭제 완료"`);
            } else {
                if (res. err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("리스트 삭제 중 에러 발생");
        });

    }
}