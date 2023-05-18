if (!sessionStorage.getItem("indexCarID1") || !sessionStorage.getItem("indexCarID2")){
    let rn1 = Math.round(Math.random()*11+1);
    let rn2 = Math.round(Math.random()*11+1);
    sessionStorage.setItem("indexCarID1", rn1.toString());
    sessionStorage.setItem("indexCarID2", rn2.toString());
}
if(sessionStorage.getItem("indexCarID1") && sessionStorage.getItem("indexCarID2")){
    const cars = dom.querySelectorAll(".search-cars");
    const n1 = sessionStorage.getItem("indexCarID1");
    const n2 = sessionStorage.getItem("indexCarID2");
    cars[0].src = "media/images/cars/sell/car".concat(n1).concat(".png")
    cars[1].src = "media/images/cars/sell/car".concat(n2).concat(".png")
}
if (!sessionStorage.getItem("session_start")){
    header = dom.querySelector("header");
    banner_text = dom.querySelector(".banner__container");

    sessionStorage.setItem("session_start", "1");
    headerstyle = header.style;
    bannertextstyle = banner_text.style;
    headerstyle.top = "-10vh";
    headerstyle.animation = "1s slideintop alternate";
    bannertextstyle.visibility = "hidden";
    bannertextstyle.animation = "1s textslide alternate";

    headerstyle.top = "0";
    bannertextstyle.visibility = "visible";
}
