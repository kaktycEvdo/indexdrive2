if (sessionStorage.getItem("activeData") == null || sessionStorage.getItem("activeData") == ""){ location.href = "register.html"; }
else{
    let d = dom.querySelector("#ac-surname");
    d.innerHTML = sessionStorage.getItem("activeData").split(";")[0];
    d = dom.querySelector("#ac-name");
    d.innerHTML = sessionStorage.getItem("activeData").split(";")[1];
    d = dom.querySelector("#ac-sec-name");
    d.innerHTML = sessionStorage.getItem("activeData").split(";")[2];
    d = dom.querySelector("#passport-id");
    d.innerHTML = sessionStorage.getItem("activeData").split(";")[3];
    d = dom.querySelector("#ac-phone");
    d.innerHTML = sessionStorage.getItem("activeData").split(";")[4];
    d = dom.querySelector("#ac-bd-date");
    d.innerHTML = sessionStorage.getItem("activeData").split(";")[5];
}