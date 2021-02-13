function createInfo(data) {
  if (data.h3) {
    return `
    <h3>${data.h3}</h3>
    `;
  } else if (data.h1) {
    return `
    <h1>${data.h1}</h1>
    <hr>
    `;
  } else if (data.span) {
    return `
  <span>${data.span}</span><br>
  `;
  } else if (data.img) {
    return `<div class="img_hobby">
    ${data.img
      .map((element) => {
        return `<div class="img_hobby">
      <img src="${element.image}" alt="${element.text}"/>
      <span class="img_text">${element.text.toUpperCase()}</span><br>
      </div>
      `;
      })
      .join("")} 
</div>
    `;
  }
}

const leftCol = document.querySelector(".col_left");
const rightCol = document.querySelector(".col_right");
const language = document.getElementById("languages");

const templatesEN = dataEN.map((data) => createInfo(data)).join(" ");
const templatesRU = dataRU.map((data) => createInfo(data)).join(" ");
const templatesUA = dataUA.map((data) => createInfo(data)).join(" ");
const rTemplatesUA = dataRightUA.map((data) => createInfo(data)).join(" ");
const rTemplatesEN = dataRightEN.map((data) => createInfo(data)).join(" ");
const rTemplatesRU = dataRightRU.map((data) => createInfo(data)).join(" ");

// certificate
const opeN = document.getElementById("open");
const certificate = document.getElementById("wrap_certificate");

const openPRO = document.getElementById("openPRO");
const certificatePRO = document.getElementById("wrap_certificatePRO");

const doc = document.getElementById("doc");
const docPRO = document.getElementById("docPRO");
const contacts = document.querySelector(".contacts");
const myName = document.querySelector(".name");

//default render
leftCol.innerHTML = templatesEN;
rightCol.innerHTML = rTemplatesEN;

//choose lang
language.addEventListener("change", changeLanguage);

function changeLanguage() {
  if (this.value == "ua") {
    leftCol.innerHTML = templatesUA;
    rightCol.innerHTML = rTemplatesUA;
    docPRO.style.backgroundImage = "url('./images/pro_ua.png')";
    doc.style.backgroundImage = "url('./images/basic_ua.png')";
    opeN.childNodes[0].nodeValue = "Сертифікат Бейсік";
    openPRO.childNodes[0].nodeValue = "Сертифікат ПРО";
    contacts.childNodes[0].nodeValue = "Контакти:";
    myName.innerHTML = "євгеній ланг";
  } else if (this.value == "ru") {
    leftCol.innerHTML = templatesRU;
    rightCol.innerHTML = rTemplatesRU;
    docPRO.style.backgroundImage = "url('./images/pro_ru.png')";
    doc.style.backgroundImage = "url('./images/basic_ru.png')";
    opeN.childNodes[0].nodeValue = "Сертификат Бейсик";
    openPRO.childNodes[0].nodeValue = "Сертификат ПРО";
    contacts.childNodes[0].nodeValue = "Контакты:";
    myName.innerHTML = "евгений ланг";
  } else if (this.value == "en") {
    leftCol.innerHTML = templatesEN;
    rightCol.innerHTML = rTemplatesEN;
    docPRO.style.backgroundImage = "url('./images/pro_en.png')";
    doc.style.backgroundImage = "url('./images/basic_en.png')";
    opeN.childNodes[0].nodeValue = "Certificate basic";
    openPRO.childNodes[0].nodeValue = "Certificate PRO";
    contacts.childNodes[0].nodeValue = "Contacts:";
    myName.innerHTML = "eugen lang";
  }
}

openPRO.addEventListener("click", openCertificate(certificatePRO, certificate));
opeN.addEventListener("click", openCertificate(certificate, certificatePRO));

let close = function () {
  this.style.display = "none";
};

certificate.addEventListener("click", close);
certificatePRO.addEventListener("click", close);

//animation
let wWidth = window.innerWidth;
let hWidth = window.innerHeight;
const hi = document.querySelector(".hi");

setInterval(() => {
  let f = wWidth - hi.offsetWidth;
  let q = hWidth - hi.offsetHeight;
  hi.style.left = getRand(f) + "px";
  hi.style.top = getRand(q) + "px";
}, Math.floor(Math.random() * 200 + 2000));

function getRand(max) {
  return Math.floor(Math.random() * max);
}

function openCertificate(a, b) {
  return function () {
    if (!b.style.display.includes("none")) {
      b.style.display = "none";
    }
    a.style.display = "inline-block";
  };
}