
// captcha
const captcha = document.querySelector(".captcha"),
reloadBtn = document.querySelector(".btn-captcha"),
inputField = document.querySelector(".captcha-input");

let allCharacters = ['a', 'b', 'c', 'd',
                    'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                    't', 'u', 'v', 'w', 'x', 'y', 'z'];
function getCaptcha(){
for (let i = 0; i < 6; i++) { 
    let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
    captcha.innerText += `${randomCharacter}`; 
    }
}
getCaptcha();
reloadBtn.addEventListener("click", ()=>{
    removeContent();
    getCaptcha();
    });
function removeContent(){
    inputField.value = "";
    captcha.innerText = "";
}
// 
inputField.addEventListener("focusout", function(){
    if (inputField.value === captcha.innerText) {
        console.log("true")
        captcha.style.border = "1px solid green";
    }else{
        console.log("false");
        captcha.style.border = "1px solid red";
    }
})
// /////////// التحقق من الإدخال/////////////
let allInsertionInputs = document.querySelectorAll(".Insertion-input");
allInsertionInputs.forEach(insertion => {
    insertion.addEventListener("click",function (){
        insertion.style.borderImageSource = "linear-gradient(to right ,#005a82, #0088b4)";
        insertion.style.borderWidth ="1px";
        insertion.style.borderImageSlice = 2;
        insertion.nextElementSibling.classList.remove("warn");
    })
    insertion.addEventListener("focusout" , function () {
        if (insertion.value === "") {
            insertion.style.border ="1px red solid";
            insertion.nextElementSibling.classList.add("warn");
        }else {
            insertion.style.border ="1px  solid rgba(0, 0, 0, 0.178)";
            insertion.nextElementSibling.classList.remove("warn");
        }
    })
})

//click button 
const inputs = [...allInsertionInputs];
document.querySelector(".button").addEventListener("click", function () {
    const hasEmptyString = inputs.map((inp) => inp.value).includes('');
        if (!hasEmptyString  && !document.querySelector(".warn") && document.querySelector(".captcha-input").value === document.querySelector(".captcha").innerText ){
            addUser();
        } else {
            allInsertionInputs.forEach(insertion => {
                if (insertion.value === "") {
                    insertion.style.border ="1px red solid";
                    insertion.nextElementSibling.classList.add("warn");
                }
            });
        }
    
})
//--------إضافة طالب --------------//// 
let serial = 3;
function addUser() {
    ++serial;
    const tr = document.createElement("tr");
    tr.classList.add("table-tr-mix");
    tr.classList.add("table-tr");
    tr.classList.add("mix");
    // td serial
    const tdSerial = document.createElement("td");
    tdSerial.classList.add("table-td");
    tdSerial.classList.add("Serial-killer");
    tdSerial.innerText = serial;
    tr.appendChild(tdSerial);
    // td username 
    const tdUserName = document.createElement("td");
    tdUserName.classList.add("table-td");
    tdUserName.innerText = document.querySelector("#user_name").value;
    tr.appendChild(tdUserName);
    // td student Name
    const tdStudenName = document.createElement("td");
    tdStudenName.classList.add("table-td");
    tdStudenName.innerText = document.querySelector("#student_name").value;
    tr.appendChild(tdStudenName);
    // td program 
    const tdprogram = document.createElement("td");
    tdprogram.classList.add("table-td");
    tdprogram.innerText = document.querySelector(".Insertion-select").value;
    console.log(tdprogram.innerText.toLowerCase());
    tr.setAttribute('data-program', `${tdprogram.innerText.toLowerCase()}`);
    tr.appendChild(tdprogram);
    // 
    console.log(tr);
    document.querySelector(".table").appendChild(tr);
    document.querySelectorAll(".Insertion-input").forEach(Insertion => Insertion.value="");
    removeContent();
    getCaptcha();
    mix();
}
////// الموبايل////////
const phoneNumber = document.querySelector("#insertion-mobile");


phoneNumber.addEventListener("input",(e) => {
    const   phonevalue =phoneNumber.value;
    if (phonevalue[0] === "+" && phonevalue[1] ==="9" &&  phonevalue[2] === "6" &&phonevalue[3] === "3" ){
        phoneNumber.setAttribute('maxLength',13);
    }else {
        phoneNumber.setAttribute('maxLength',10);
    }
    e.target.value = e.target.value
    .replace(/[^\dA-Z]/g, '+')
    .replace(/(.{4})/g, '$1')
    .trim();
    })
    
    

// /////dropdown//////
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.querySelector(".dropdown-icon").classList.toggle("down");
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    document.querySelector(".dropdown-icon").classList.remove("down");
        }

    }
    }
}
// /// فرز الجدول///
//https://www.w3schools.com/howto/howto_js_sort_table.asp
document.getElementById("number-user").addEventListener("click", function() {
    sortTable(0);
})
document.getElementById("name-user").addEventListener("click", function() {
    sortTable(1);
})
document.getElementById("programing-user").addEventListener("click", function() {
    sortTable(3)
})
function sortTable(g) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector(".table");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
    //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[g];
        y = rows[i + 1].getElementsByTagName("TD")[g];
        //check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
        }
    }
    if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
    }
    }
}
//==== فرز البرنامج === /// 
document.querySelectorAll(".btn-drowp").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".dropbtn-span").innerText = btn.getAttribute("data-filter").toUpperCase()
        document.querySelectorAll(".table-tr-mix").forEach(m => {
            m.style.display = "none";
            if (btn.getAttribute("data-filter") === m.getAttribute("data-program") ) {
                m.style.display = "table-row";
            };
            if (btn.getAttribute("data-filter") === "all"){
                m.style.display = "table-row";
            }
        })
    })
})
//====  فرز البرنامج بعد الإضافة====/// 
function mix(){
    document.querySelectorAll(".btn-drowp").forEach(btn => {
            document.querySelector(".dropbtn-span").innerText = btn.getAttribute("data-filter").toUpperCase()
            document.querySelectorAll(".table-tr-mix").forEach(m => {
                m.style.display = "none";
                if (btn.getAttribute("data-filter") === m.getAttribute("data-program") ) {
                    m.style.display = "table-row";
                };
                if (btn.getAttribute("data-filter") === "all"){
                    m.style.display = "table-row";
                }
            })
    })
};


