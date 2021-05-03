"use strict";

if(userid){
    const cno =  document.querySelector("#cno"),    
        descript = document.querySelector("#descript"),
    // button
        cardCr = document.querySelector("#cardCr"),
        cardUp = document.querySelector("#cardUp"),
        cardDe = document.querySelector("#cardDe");
        cardCr.addEventListener("click", cardC);
        cardUp.addEventListener("click", cardU);
        cardDe.addEventListener("click", cardD);

    function cardC() {

        const req = {
            lno: lno.value,
            descript: descript.value
        };

        fetch("/cardCreate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                console.info(`POST / 304 "카드 등록 완료"`);
            } else {
                if (res. err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("카드 작성 중 에러 발생");
        });

    }

    function cardU() {

        const req = {
            descript: descript.value,
            cno: cno.value
        };

        fetch("/cardUpdate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                console.info(`POST / 304 "카드 수정 완료"`);
            } else {
                if (res. err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("카드 수정 중 에러 발생");
        });

    }

    function cardD() {

        const req = {
            cno: cno.value
        };

        fetch("/cardDelete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                console.info(`POST / 304 "카드 삭제 완료"`);
            } else {
                if (res. err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("카드 삭제 중 에러 발생");
        });

    }
}