const dom = document;
const menu = dom.querySelector(".side-menu");
/////////Car related things/////////
function changePrice(price, cars){
    let p = 0;
    const car = cars;
    let e = dom.getElementsByClassName("car-price ".concat(car));
    let pe = dom.getElementsByClassName("progress-bar ".concat(car))[0];
    for (es of e){
        p = price;
        let days = dom.getElementsByClassName("days ".concat(car))[0].value;
        if (days <= 3){
            p *= days;
            discount = "0%";
            pe.style.backgroundPosition = "220% 0"
        }
        else if (days > 3 && days <= 6){
            p *= days-(days*0.05);
            discount = "5%";
            pe.style.backgroundPosition = "180% 0"
        }
        else if (days > 6 && days <= 9){
            p *= days-(days*0.1);
            discount = "10%";
            pe.style.backgroundPosition = "160% 0"
        }
        else if (days > 9 && days <= 12){
            p *= days-(days*0.15);
            discount = "15%";
            pe.style.backgroundPosition = "140% 0"
        }
        else if (days > 12 && days <= 15){
            p *= days-(days*0.2);
            discount = "20%";
            pe.style.backgroundPosition = "120% 0"
        }
        else if (days > 15){
            p *= days-(days*0.25);
            discount = "25%";
            pe.style.backgroundPosition = "100% 0"
        }
        es.innerHTML = p.toString().concat("₽");
        pe.innerHTML = discount;
    }
    return p;
}
async function changeCarsAmount(){
    if (sessionStorage.getItem("chosencars")){
        let b = dom.querySelectorAll(".cars-amount");
        for (bs of b){
            bs.innerHTML = sessionStorage.getItem("chosencars").split(";").length-1;
        }
        setTimeout(() => {
            changeCarsAmount();
        }, 1500);
    }
}
function generateTag(n){
    if (!sessionStorage.getItem("carTag".concat(n))){
        let res = "";
        const pool1 = "АВЕКМНОРСТУХ";
        const pool2 = "0123456789";
        res += pool1[Math.round(Math.random()*11)];
        res += pool2[Math.round(Math.random()*9)];
        res += pool2[Math.round(Math.random()*9)];
        res += pool2[Math.round(Math.random()*9)];
        res += pool1[Math.round(Math.random()*11)];
        res += pool1[Math.round(Math.random()*11)];
        sessionStorage.setItem("carTag".concat(n), res);
        return res;
    }
    else{
        return sessionStorage.getItem("carTag".concat(n))
    }
}
function make(item){
    if (item.className.match(/car\d+/)){
        let m = item.className.match(/car\d+/).toString(); // берет определенную машину
        let i = m.match(/\d+/)[0]; // берет id машины
        let o = dom.getElementsByClassName(m); // берет элементы соответствующие машине
        for (tag of o){
            let t = tag.className.match(/car-(name|mark|model|color|engine|transmission|price|image|tag)/)[1]; // берет элемент информации о машин            
            if (t == "image"){
                tag.src = "media/images/cars/sell/".concat(carsList[i-1][t]);
            }
            else if (t == "transmission" || t == "engine"){
                let y = carsList[i-1][t].split(" ");
                for (ina of y){
                    let w = ina.match(/(u-)(Дизель|Бензин|МКП|АКП|РКП)/);
                    let a = dom.createElement("i");
                    if (w !== undefined && w !== null){
                        w = w[0];
                        a.className = "disabled-text";
                        a.innerHTML = w.match(/(Дизель|Бензин|МКП|АКП|РКП)/)[0];
                        dom.querySelector(".car-".concat(t).concat(".").concat(m)).appendChild(a);
                    }
                    else{
                        a.innerHTML = ina;
                        dom.querySelector(".car-".concat(t).concat(".").concat(m)).appendChild(a);
                    }
                }
            }
            else if (t == "price"){
                tag.innerHTML = carsList[i-1][t].toString().concat("₽");
            }
            else{
                tag.innerHTML = carsList[i-1][t];
            }
        }
    }
}
dom.querySelectorAll(".carchoice").forEach( (loc) => {
    loc.addEventListener("click", (e) => {
        let targetClass = e.target.className;
        let id = targetClass.match(/c\d+/); // берет id машины
        id = id[0].toString();
        if (sessionStorage.getItem("chosencars") !== null){
            if (!sessionStorage.getItem("chosencars").includes(id)){
                sessionStorage.setItem("chosencars", sessionStorage.getItem("chosencars").concat(id).concat(";"));
            }
        }
        else{
            sessionStorage.setItem("chosencars", id.concat(";"));
        }
        changeCarsAmount();
    });
});
const carsList = [
    {
        "name": "Nissan Sentra, 2017",
        "mark": "Nissan",
        "model": "Sentra, 2017",
        "color": "Черный",
        "engine": "u-Дизель Бензин",
        "transmission": "МКП u-АКП u-РКП",
        "price": 4000,
        "image": "car1.png",
        "tag": generateTag(1)
    },
    {
        "name": "Toyota RAV4, 2018",
        "mark": "Toyota",
        "model": "RAV4, 2018",
        "color": "Синий",
        "engine": "u-Дизель Бензин",
        "transmission": "МКП u-АКП u-РКП",
        "price": 8200,
        "image": "car2.png",
        "tag": generateTag(2)
    },
    {
        "name": "Ferrari F12berlinetta, 2014",
        "mark": "Ferrari",
        "model": "F12berlinetta, 2014",
        "color": "Красный",
        "engine": "u-Дизель Бензин",
        "transmission": "u-МКП u-АКП РКП",
        "price": 56000,
        "image": "car3.png",
        "tag": generateTag(3)
    },
    {
        "name": "Volkswagen Polo, 2016",
        "mark": "Volkswagen",
        "model": "Polo, 2016",
        "color": "Красный",
        "engine": "u-Дизель Бензин",
        "transmission": "МКП АКП РКП",
        "price": 3600,
        "image": "car4.png",
        "tag": generateTag(4)
    },
    {
        "name": "Hyundai Creta, 2020",
        "mark": "Hyundai",
        "model": "Creta, 2020",
        "color": "Оранжевый",
        "engine": "u-Дизель Бензин",
        "transmission": "МКП АКП u-РКП",
        "price": 4650,
        "image": "car5.png",
        "tag": generateTag(5)
    },
    {
        "name": "Mercedes-Benz C216, 2011",
        "mark": "Mercedes-Benz",
        "model": "C216, 2011",
        "color": "Белый",
        "engine": "u-Дизель Бензин",
        "transmission": "МКП u-АКП РКП",
        "price": 12000,
        "image": "car6.png",
        "tag": generateTag(6)
    },
    {
        "name": "Jaguar F-Type Coupe, 2015",
        "mark": "Jaguar",
        "model": "F-Type, 2015",
        "color": "Белый",
        "engine": "u-Дизель Бензин",
        "transmission": "МКП АКП u-РКП",
        "price": 12500,
        "image": "car7.png",
        "tag": generateTag(7)
    },
    {
        "name": "Honda NSX, 2021",
        "mark": "Honda",
        "model": "NSX, 2021",
        "color": "Черный",
        "engine": "u-Дизель Бензин",
        "transmission": "u-МКП u-АКП РКП",
        "price": 34000,
        "image": "car8.png",
        "tag": generateTag(8)
    },
    {
        "name": "Mercedes-Benz GLK-Class, 2012",
        "mark": "Mercedes-Benz",
        "model": "GLK-Class, 2012",
        "color": "Белый",
        "engine": "u-Дизель Бензин",
        "transmission": "u-МКП АКП u-РКП",
        "price": 5800,
        "image": "car9.png",
        "tag": generateTag(9)
    },
    {
        "name": "Audi A4 B9, 2016",
        "mark": "Audi",
        "model": "A4 B9, 2016",
        "color": "Желтый",
        "engine": "u-Дизель Бензин",
        "transmission": "МКП АКП u-РКП",
        "price": 5700,
        "image": "car10.png",
        "tag": generateTag(10)
    },
    {
        "name": "Audi A6, 2013",
        "mark": "Audi",
        "model": "A6, 2013",
        "color": "Серебристый",
        "engine": "u-Дизель Бензин",
        "transmission": "МКП АКП РКП",
        "price": 3900,
        "image": "car11.png",
        "tag": generateTag(11)
    },
    {
        "name": "Buick Avista, 2018",
        "mark": "Buick",
        "model": "Avista, 2018",
        "color": "Синий",
        "engine": "u-Дизель Бензин",
        "transmission": "u-МКП АКП u-РКП",
        "price": 4700,
        "image": "car12.png",
        "tag": generateTag(12)
    }
];
const k = 324;
for (item of dom.getElementsByClassName("cars")){ // берет всю инфу о машинах
    make(item);
}
// creating pages and general info about cars in booking listing
const list = dom.getElementsByClassName("bk-list")[0];
const container = dom.getElementsByClassName("bk-list__container")[0];
if (container !== undefined){
    let total_price = 0;
    if (sessionStorage.getItem("chosencars")){
        let q = 1;
        let prices = [];
        let pry = {};
        for (item of sessionStorage.getItem("chosencars").split(";")){ // заполнить список цен чтоб был
            if (item === "") { break }
            let index = item.match(/\d+/g)[0];
            prices.push(carsList[index-1]["price"]);
        }
        for (item of sessionStorage.getItem("chosencars").split(";")){
            if (item === "") { break }
            if (!item.match(/f[1-5]/)){
                item = item.concat("f1");
            }
            let f = item.match(/f[1-5]/);
            let i = "car".concat(item.match(/\d+/g)[0]); // берет машину
            let index = item.match(/\d+/g)[0]; // берет id машины
            element = dom.createElement("a");
            element.className = "bk-car cars page-opener page".concat(q);
            container.appendChild(element);
            // создание списка
            for (v of ["image", "name"]){
                if (v == "image"){
                    item = dom.createElement("img");
                }
                else{
                    item = dom.createElement("div");
                }
                item.className = "car-".concat(v).concat(" ").concat(i).concat(" page-opener page").concat(q);
                element.appendChild(item);
                make(item);
            }
            let p = dom.createElement("div");
            p.className = "car-price ".concat(i).concat(" page-opener page").concat(q);
            p.innerHTML = prices[q-1].toString().concat("₽");
            element.appendChild(p);
            // создание страниц
            let page = dom.createElement("section");
            page.className = "page page".concat(q);

            let page__container = dom.createElement("div");
            page__container.className = "page__container";

            let closer = dom.createElement("i");
            closer.className = "fas fa-window-close page-closer page".concat(q);

            let h = dom.createElement("h2");
            page.appendChild(page__container);
            page__container.appendChild(closer);
            page__container.appendChild(h);
            h.innerHTML = carsList[index-1]["name"];

            let bkcontainer = dom.createElement("div");
            bkcontainer.className = "bk-page-content";

            let bkimage = dom.createElement("img");
            bkimage.src = "media/images/cars/sell/".concat(carsList[index-1]["image"]);
            bkimage.className = "bk-page-image";
            bkcontainer.appendChild(bkimage);

            let bkparameters = dom.createElement("div");
            bkparameters.className = "bk-page-parameters";
            bkcontainer.appendChild(bkparameters);
            page__container.appendChild(bkcontainer);
            dom.getElementsByTagName("body")[0].appendChild(page);
            for (t = 0; t < 14*2; t++){
                let bkelement = null
                if (t % 2 != 0 && t <= 8){
                    bkelement = dom.createElement("div");
                }
                else if (t == 11 || t == 13){
                    bkelement = dom.createElement("div");
                }
                else if (t % 2 != 0 && t > 8){
                    bkelement = dom.createElement("input");
                    bkelement.type = "text";
                }
                else if (t % 2 == 0){
                    bkelement = dom.createElement("div");
                }
                bkparameters.appendChild(bkelement);
                switch (t){
                    // inputs and generated text
                    case 1:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = q;
                        break;
                    }
                    case 3:{
                        bkelement.className = "bk-parameters-text car-mark ".concat(i);
                        make(bkelement);
                        break;
                    }
                    case 5:{
                        bkelement.className = "bk-parameters-text car-model ".concat(i);
                        make(bkelement);
                        break;
                    }
                    case 7:{
                        bkelement.className = "bk-parameters-text car-tag ".concat(i);
                        make(bkelement);
                        break;
                    }
                    case 9:{
                        bkelement.className = "generic-input days ".concat(i);
                        bkelement.value = 1;
                        const pr = prices[q-1];
                        bkelement.addEventListener("keyup", () => {
                            pry[i] = changePrice(pr, i);
                        });
                        break;
                    }
                    case 11:{
                        bkelement.className = "bk-parameters-text car-price ".concat(i);
                        bkelement.innerHTML = prices[q-1].toString().concat("₽");
                        break;
                    }
                    case 13:{
                        bkelement.className = "progress-bar ".concat(i);
                        bkelement.innerHTML = "0%";
                        break;
                    }
                    case 15:{
                        bkelement.className = "generic-input";
                        switch (f[0]){
                            case "f1":{
                                bkelement.value = "Первый";
                                break;
                            }
                            case "f2":{
                                bkelement.value = "Второй";
                                break;
                            }
                            case "f3":{
                                bkelement.value = "Третий";
                                break;
                            }
                            case "f4":{
                                bkelement.value = "Четвертый";
                                break;
                            }
                            case "f5":{
                                bkelement.value = "Пятый";
                                break;
                            }
                        }
                        break;
                    }
                    case 17:{
                        bkelement.className = "generic-input";
                        if (sessionStorage.getItem("activeData")){bkelement.value = sessionStorage.getItem("activeData").split(";")[0];}
                        break;
                    }
                    case 19:{
                        bkelement.className = "generic-input";
                        if (sessionStorage.getItem("activeData")){bkelement.value = sessionStorage.getItem("activeData").split(";")[1];}
                        break;
                    }
                    case 21:{
                        bkelement.className = "generic-input";
                        if (sessionStorage.getItem("activeData")){bkelement.value = sessionStorage.getItem("activeData").split(";")[2];}
                        break;
                    }
                    case 23:{
                        bkelement.className = "generic-input";
                        if (sessionStorage.getItem("activeData")){bkelement.value = sessionStorage.getItem("activeData").split(";")[3];}
                        bkelement.type = "tel";
                        break;
                    }
                    case 25:{
                        bkelement.className = "generic-input";
                        if (sessionStorage.getItem("activeData")){bkelement.value = sessionStorage.getItem("activeData").split(";")[4];}
                        break;
                    }
                    case 27:{
                        bkelement.className = "generic-input";
                        bkelement.type = "date";
                        if (sessionStorage.getItem("activeData")){bkelement.value = sessionStorage.getItem("activeData").split(";")[5];}
                        break;
                    }
                    // text
                    case 0:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Идентификатор машины: ";
                        break;
                    }
                    case 2:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Марка авто: ";
                        break;
                    }
                    case 4:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Название авто: ";
                        break;
                    }
                    case 6:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Номер машины: ";
                        break;
                    }
                    case 8:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Кол-во бронируемых дней: ";
                        break;
                    }
                    case 10:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Цена: ";
                        break;
                    }
                    case 12:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Скидка: ";
                        break;
                    }
                    case 14:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Филиал: ";
                        break;
                    }
                    case 16:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Фамилия: ";
                        break;
                    }
                    case 18:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Имя: ";
                        break;
                    }
                    case 20:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Отчество: ";
                        break;
                    }
                    case 22:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Паспортные данные: ";
                        break;
                    }
                    case 24:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Номер телефона: ";
                        break;
                    }
                    case 26:{
                        bkelement.className = "bk-parameters-text";
                        bkelement.innerHTML = "Дата рождения: ";
                        break;
                    }
                }
            }
            // чек
            let tw = dom.createElement("div");
            tw.className = "sel-element c".concat(index);
            dom.getElementById("sel-items").appendChild(tw);
            pry[i] = prices[q-1];
            setInterval(() => {
                total_price = 0;
                for (ky of Object.values(pry)){
                    total_price += ky;
                }
                dom.getElementsByClassName("sel-element c".concat(index))[0].innerHTML = carsList[index-1]["name"].concat(": ").concat(pry[i]).concat("₽");
                dom.getElementById("total-price").innerHTML = total_price.toString().concat("₽");
            }, 100);
            q++;
        }
    }
    else{
        let no = dom.createElement("a");
        no.className = "no-items";
        no.innerHTML = "У вас нет выбранных автомобилей.";
        no.href = "car-select.html";
        list.appendChild(no);
        dom.getElementsByClassName("bk-receipt")[0].style.display = "none";
    }
    dom.getElementById("submit").addEventListener("click", () => {
        let q = 0;
        let res = "";
        for (_ of dom.querySelectorAll(".bk-page-parameters")){
            for (let pr = 0; pr < dom.querySelectorAll(".bk-page-parameters div, .bk-page-parameters input").length; pr++){
                let aetww = dom.querySelectorAll(".bk-page-parameters div, .bk-page-parameters input")[pr];
                switch (pr){
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 11:{
                        res = res.concat(aetww.innerHTML).concat(";");
                        console.log(res);
                        break;
                    }
                    case 5:
                    case 7:
                    case 9:
                    case 15:
                    case 17:
                    case 19:
                    case 21:
                    case 23:
                    case 25:
                    case 27:{
                        res = res.concat(aetww.value).concat(";");
                        console.log(res);
                        break;
                    }
                }
                
            }
            res = res.concat("|");
        }
        res = res.concat("~");
        let book = sessionStorage.getItem("bookmade");
        if (book != null && book != ""){
            sessionStorage.setItem("bookmade", sessionStorage.getItem("bookmade").concat(res));
        }
        else{
            sessionStorage.setItem("bookmade", res);
        }
        sessionStorage.setItem("chosencars", "");
        location.href = "index.html";
    });
}
function reVisit(section){
    sessionStorage.setItem("bookmade", sessionStorage.getItem("bookmade").concat("~").concat(section));
    //location.href = "index.html";
}
const aclist = dom.getElementsByClassName("acbk-list")[0];
const accontainer = dom.getElementsByClassName("acbk-list__container")[0];
if (accontainer !== undefined){
    if (sessionStorage.getItem("bookmade")){
        let q = 1;
        for (section of sessionStorage.getItem("bookmade").split("~")){
            if (section === "") { break }
            let w = 1;
            let wrapper = dom.createElement("div");
            wrapper.className = "acbksc";
            let h = dom.createElement("h3");
            h.innerHTML = "Заказ ".concat(q);
            wrapper.appendChild(h);
            
            for (item of section.split("|")){
                if (item === "") { break }
                let wrec = dom.createElement("div");
                wrec.className = "acbkit";
                let h = dom.createElement("h4");
                h.innerHTML = "Машина ".concat(w)
                wrec.appendChild(h);
                let wet = 1;
                for (element of item.split(";")){
                    if (element === "") { break }
                    let present = dom.createElement("a");
                    let text = dom.createElement("div");
                    text.className = "acbktxt";
                    present.className = "acbkel";
                    switch(wet){
                        case 1:{
                            present.classList.add("acbk-id");
                            present.innerHTML = element;
                            text.innerHTML = "ID Автомобиля";
                            wrec.appendChild(text);
                            wrec.appendChild(present);
                            break;
                        }
                        case 2:{
                            present.classList.add("acbk-mark");
                            present.innerHTML = element;
                            text.innerHTML = "Марка";
                            wrec.appendChild(text);
                            wrec.appendChild(present);
                            break;
                        }
                        case 7:{
                            present.classList.add("acbk-fel");
                            present.innerHTML = element;
                            text.innerHTML = "Филиал";
                            wrec.appendChild(text);
                            wrec.appendChild(present);
                            break;
                        }
                    }
                    wet++;
                }
                w++;
                wrapper.appendChild(wrec);
            }
            accontainer.appendChild(wrapper);
            q++;
        }
    }
    else{
        let no = dom.createElement("a");
        no.className = "no-items";
        no.innerHTML = "У вас не было совершено бронирований.";
        no.href = "car-select.html";
        aclist.appendChild(no);
    }
}
const bklist = dom.getElementsByClassName("hbk-list")[0];
const bkcontainer = dom.getElementsByClassName("hbk-list__container")[0];
if (bkcontainer !== undefined){
    if (sessionStorage.getItem("bookmade")){
        let q = 1;
        for (section of sessionStorage.getItem("bookmade").split("~")){
            if (section === "") { break }
            let w = 1;
            let wrapper = dom.createElement("div");
            wrapper.className = "hbksc";
            let h = dom.createElement("h3");
            h.innerHTML = "Заказ ".concat(q);
            wrapper.appendChild(h);
            
            for (item of section.split("|")){
                if (item === "") { break }
                let wrec = dom.createElement("div");
                wrec.className = "hbkit";
                let h = dom.createElement("h4");
                h.innerHTML = "Машина ".concat(w)
                wrec.appendChild(h);
                let wet = 1;
                for (element of item.split(";")){
                    if (element === "") { break }
                    let present = dom.createElement("a");
                    let text = dom.createElement("div");
                    text.className = "hbktxt";
                    present.className = "hbkel";
                    console.log(element);
                    switch(wet){
                        case 2:{
                            present.classList.add("hbk-mark");
                            present.innerHTML = element;
                            text.innerHTML = "Марка";
                            wrec.appendChild(text);
                            wrec.appendChild(present);
                            break;
                        }
                        case 3:{
                            present.classList.add("hbk-model");
                            present.innerHTML = element;
                            text.innerHTML = "Модель";
                            wrec.appendChild(text);
                            wrec.appendChild(present);
                            break;
                        }
                        case 5:{
                            present.classList.add("acbk-days");
                            present.innerHTML = element;
                            text.innerHTML = "Дни";
                            wrec.appendChild(text);
                            wrec.appendChild(present);
                            break;
                        }
                        case 7:{
                            present.classList.add("hbk-fel");
                            present.innerHTML = element;
                            text.innerHTML = "Филиал";
                            wrec.appendChild(text);
                            wrec.appendChild(present);
                            break;
                        }
                        case 6:{
                            present.classList.add("acbk-days");
                            present.innerHTML = element;
                            text.innerHTML = "Цена";
                            wrec.appendChild(text);
                            wrec.appendChild(present);
                            break;
                        }
                    }
                    wet++;
                }
                w++;
                wrapper.appendChild(wrec);
            }
            let brthe = dom.createElement("div");
            brthe.className = "generic-button rebut";
            brthe.addEventListener("click", reVisit(section));
            brthe.innerHTML = "Повтор бронирования";
            wrapper.appendChild(brthe);
            bkcontainer.appendChild(wrapper);
            q++;
        }
    }
    else{
        let no = dom.createElement("a");
        no.className = "no-items";
        no.innerHTML = "У вас не было совершено бронирований.";
        no.href = "car-select.html";
        bklist.appendChild(no);
    }
}
let b = dom.querySelectorAll(".bro");
let i = [dom.createElement("i"), dom.createElement("i")];
for (j = 0; j < 2; j++){
    i[j].className = "cars-amount";
    b[j].appendChild(i[j]);
    if (sessionStorage.getItem("chosencars") == null || sessionStorage.getItem("chosencars") == ""){
        i[j].style.display = "none";
        changeCarsAmount();
    }
    else{
        changeCarsAmount();
    }
}
/////////Show Page//////////
dom.querySelectorAll(".page-opener").forEach(location => {
    location.addEventListener("click", (e) => {
        let targetClass = e.target.className;
        if (targetClass.search("page-opener") !== -1){
            let bridges = dom.getElementsByClassName(targetClass.split(' ').find(element => element.match(/page\d+/)));
            for (const bridge of bridges){
                bridge.classList.add("-visible");
                dom.body.style.overflow = "hidden";
            }
        }
    });
});
dom.querySelectorAll(".page-closer").forEach(location => {
    location.addEventListener("click", (e) => {
        let targetClass = e.target.className;
        if (targetClass.search("page-closer") !== -1){
            let bridges = dom.getElementsByClassName(targetClass.split(' ').find(element => element.match(/page\d+/)));
            for (const bridge of bridges){
                bridge.classList.remove("-visible");
                dom.body.style.overflow = "auto";
            }
        }
    });
});
dom.querySelectorAll(".page").forEach(location => {
    location.addEventListener("click", (e) => {
        let targetClass = e.target.className;
        if (targetClass.search("page") !== -1){
            let bridges = dom.getElementsByClassName(targetClass.split(' ').find(element => element.match(/page\d+/)));
            for (const bridge of bridges){
                bridge.classList.remove("-visible");
                dom.body.style.overflow = "auto";
            }
        }
    });
});
dom.addEventListener("keydown", (e) => {
    if (e.key === "Escape"){
        let bridges = dom.getElementsByClassName("page");
        for (const bridge of bridges){
            bridge.classList.remove("-visible");
            dom.body.style.overflow = "auto";
        }
    }
});
document.addEventListener("backbutton", () => {
    let bridges = dom.getElementsByClassName("page");
        for (const bridge of bridges){
            bridge.classList.remove("-visible");
            dom.body.style.overflow = "auto";
        }
});
/////////Show Menu//////////
function slideMenu(menu, b){
    if (b === 1){ menu.classList.add("-slided"); }
    else if(b === 2){ menu.classList.remove("-slided"); }
    else{ menu.classList.toggle("-slided"); }
}
dom.querySelector(".side-menu__trigger").addEventListener("mouseover", () => {
    if (!dom.querySelector(".-visible")){
        slideMenu(menu, 1);
    }
});
dom.querySelector(".menu-button").addEventListener("click", () => {
    if (!dom.querySelector(".-visible")){
        slideMenu(menu, 3);
    }
});
window.addEventListener('mouseover', (e) => {
    if (!menu.contains(e.target) && e.target.className !== "side-menu__trigger" && e.target.className !== "menu-button") {
        slideMenu(menu, 2);
    }
});
/////////Login/////////
function validate(){
    const f = dom.forms.reg;
    if (f.ps.value !== f.psr.value){
        let ermsg = dom.createElement("div");
        ermsg.className = "error-message";
        ermsg.innerHTML = "Несовпадающие пароли";
        dom.querySelector(".content__container").appendChild(ermsg);
        setTimeout(()=>{
            dom.querySelector(".content__container").removeChild(ermsg);
        }, 5000)
    }
    else if (!f.passport.value.match(/\d{4} \d{6}/)){
        let ermsg = dom.createElement("div");
        ermsg.className = "error-message";
        ermsg.innerHTML = "Неправильный формат паспорта";
        dom.querySelector(".content__container").appendChild(ermsg);
    }
    else{
        let result = "";
        for (item of f){
            result = result.concat(item.value).concat(";");
        }
        sessionStorage.setItem("acData", result);
        sessionStorage.setItem("activeData", result);
        location.href = "index.html";
    }
}
function lvalidate(){
    const f = dom.forms.login;
    let data = sessionStorage.getItem("acData");
    let phone = data.split(";")[4];
    let ps = data.split(";")[6];
    if (f.phone.value !== phone || f.ps.value !== ps){
        let ermsg = dom.createElement("div");
        ermsg.className = "error-message";
        ermsg.innerHTML = "Неправильный пароль или телефон";
        dom.querySelector(".content__container").appendChild(ermsg);
    }
    else{
        sessionStorage.setItem("activeData", sessionStorage.getItem("acData"));
        location.href = "index.html";
    }
}
function onlogout(){
    sessionStorage.setItem("activeData", "");
    location.href = "index.html";
}
function cvalidate(){
    const f = dom.forms.newCard;
    let data = sessionStorage.getItem("cards");
    function luhnAlgorithm(value) {
        value = value.replace(/\D/g, '');
    
        var nCheck = 0;
        var bEven = false;
    
        for (var n = value.length - 1; n >= 0; n--) {
            var nDigit = parseInt(value.charAt(n), 10);
    
            if (bEven && (nDigit *= 2) > 9) {
                nDigit -= 9;
            }
    
            nCheck += nDigit;
            bEven = !bEven;
        }
    
        return (nCheck % 10) == 0;
    }
    console.log(f.number.value.toString().length);
    if (!f.date.value.match(/\d{2}\/\d{2}/)){
        let ermsg = dom.createElement("div");
        ermsg.className = "error-message";
        ermsg.innerHTML = "Неправильный формат даты (правильный: nn/nn)";
        dom.querySelector(".content__container").appendChild(ermsg);
    }
    else if (!luhnAlgorithm(f.number.value) || f.number.value.toString().length != 16){
        let ermsg = dom.createElement("div");
        ermsg.className = "error-message";
        ermsg.innerHTML = "Неправильный номер карты";
        dom.querySelector(".content__container").appendChild(ermsg);
    }
    else{
        let wetgwetwt = f.number.value.concat(";").concat(f.date.value).concat(";").concat(f.cvc.value).concat("|");
        sessionStorage.setItem("activeCard", wetgwetwt);
        if (sessionStorage.getItem("cards")){
            sessionStorage.setItem("cards", sessionStorage.getItem("cards").concat(wetgwetwt));
        }
        else{
            sessionStorage.setItem("cards", wetgwetwt);
        }
        location.href = "profile.html";
    }
}
let cards = sessionStorage.getItem("cards");
let cafaw = dom.getElementsByClassName("cards-list__container")[0];
if (cards != null && cards != "" && cafaw != null){
    let q = 0;
    for (afafaf of cards.split("|")){
        if (afafaf == "") {break;}
        let card_container = dom.createElement("div");
        card_container.className = "card";
        let naming = dom.createElement("div");
        naming.innerHTML = "Карта ".concat(q);
        card_container.appendChild(naming);
        naming.className = "card-name";
        let bababab = afafaf.split(";")[0]
        if (sessionStorage.getItem("activeCard") != null && sessionStorage.getItem("activeCard") != "" && sessionStorage.getItem("activeCard").split(";")[0] == bababab){
            naming.innerHTML = "Карта ".concat(q).concat(" (выбранная)");
        }
        let eryery = dom.createElement("div");
        eryery.className = "card-number";
        eryery.innerHTML = "************";
        for (let i = 12; i < bababab.length; i++){
            eryery.innerHTML = eryery.innerHTML.concat(bababab[i]);
        }
        card_container.appendChild(eryery);
        let button = dom.createElement("a");
        button.className = "generic-button";
        button.innerHTML = "Выбрать карту ".concat(q);
        button.onclick = () => {
            sessionStorage.setItem("activeCard", afafaf);
        }
        card_container.appendChild(button);
        cafaw.appendChild(card_container);
        q++;
    }
}
else if (cards == null && cards == "" && cafaw != null){
    cafaw.innerHTML = "у вас нет карт";
    cafaw.className = "no-items";
}
/////// ACTIVE SESSION STUFF ////////
let nname = null;
if (sessionStorage.getItem("activeData") != null && sessionStorage.getItem("activeData") != ""){
    nname = sessionStorage.getItem("activeData").split(";")[1];
    dom.querySelector(".account a").innerHTML = nname;
}
if (sessionStorage.getItem("activeCard") != null && sessionStorage.getItem("activeCard") != "" && dom.querySelector(".ac-card .ac-card-number")){
    number = sessionStorage.getItem("activeCard").split(";")[0];
    dom.querySelector(".ac-card .ac-card-number").innerHTML = "************";
    for (let i = 12; i < number.length; i++){
        dom.querySelector(".ac-card .ac-card-number").innerHTML = dom.querySelector(".ac-card .ac-card-number").innerHTML.concat(number[i]);
    }
}