 
var arraystudant=[
    {
    id:25,
    Name:"SalwaYehya",
    Task:18,
    absent:2,
    totalTask: 20,
    
    },
    {
    id:12,
    Name:"mohammad Almaslmane",
    Task:20,
    absent:1,
    totalTask: 20,
         
    },
    {
    id:08,
    Name:"ahmad Zytoon",
    Task:15,
    absent:5,
    totalTask: 20,
    
    },
    {
    id:28,
    Name:"Bayan ALriyati",
    Task:13,
    absent:0,
    totalTask: 20,
    
    },
    {
    id:18,
    Name:"obaida",
    Task:18,
    absent:7,
    totalTask: 20,

    },
    {
    id:21,
    Name:"abdelmajied abusuliman",
    Task:20,
    absent:1,
    totalTask: 20,
    
    },
    {
    id:10,
    Name:"Mohammad Alnuqeiti",
    Task:18,
    absent:7,
    totalTask: 20,

    },
    {
    id:22,
    Name:"Amroo",
    Task:14,
    absent:1,
    totalTask: 20,

    },
    {
    id:23,
    Name:"abrar_alhillawi",
    Task:13,
    absent:0,
    totalTask: 20,

    },
    {
    id:01,
    Name:"AsemYassen",
    Task:15,
    absent:0,
    totalTask: 20,

    }

    ];

    var feedback=[
        {trainer:'mona',Student:'SalwaYehya',feedback:'Excelent', Date:'2022-11-18 0:43'},
        {trainer:"ala'a",Student:'SalwaYehya',feedback:'Good', Date:'2022-11-20 0:43'}
        ];

        localStorage.setItem("arraystudant",JSON.stringify(arraystudant));
        localStorage.setItem("feedback",JSON.stringify(feedback));



arr = [];
function func() {

let fn,ln,eu,pu;
    
let fName =document.getElementById("signin1").value;
let lName =document.getElementById("signin2").value;
let email =document.getElementById("signin3").value;
let password =document.getElementById("signin4").value;
let repassword =document.getElementById("signin5").value;

let x = /\d/;
let y = /\w+/;
let re1 = /\w+@\w{4,6}.[a-zA-Z]{2,3}/;
let z = /\d{10}/;

if (fName == "" || x.test(fName)) {

document.getElementById("sigh1").innerHTML="name should not contain numbers";

document.getElementById("sigh1").style.color ="red";
document.getElementById("sigh1").style.fontSize = "16px";
}
else if (y.test(fName)){
document.getElementById("sigh1").innerHTML="";
fn=fName;
}



if(lName ==  "" || x.test(lName)) {

document.getElementById("sigh2").innerHTML = "name should not contain numbers";

document.getElementById("sigh2").style.color ="red";
document.getElementById("sigh2").style.fontSize = "16px";
}
else if (y.test(lName)){
document.getElementById("sigh2").innerHTML=""
ln=lName
}



if(re1.test(email)) {
    
document.getElementById("sigh3").innerHTML = ""
eu = email
}
else{
document.getElementById("sigh3").innerHTML = "email should not contain special charachters"

document.getElementById("sigh3").style.color ="red"
document.getElementById("sigh3").style.fontSize = "16px"
   
}



if (password.match(z)){
document.getElementById("sigh4").innerHTML = "";
pu = password;
}

else {
document.getElementById("sigh4").innerHTML = "please enter 10 numbers at least";

document.getElementById("sigh4").style.color ="red";
document.getElementById("sigh4").style.fontSize = "16px";
}


if (password == repassword){
document.getElementById("sigh5").innerHTML = "";

}

else {
document.getElementById("sigh5").innerHTML = "please enter correct password";

document.getElementById("sigh5").style.color ="red";
document.getElementById("sigh5").style.fontSize = "16px";
}


let obj = {
    Firstname:fn,
    LastName:ln,
    Email:eu,
    Password:pu,
    note:[]
    }
    
   
 if((y.test(fName)) && (y.test(lName)) && (re1.test(email))
     && (password.match(z)) && (password == repassword) ){

    arr.push(obj)

    localStorage.setItem("user", JSON.stringify(arr));
    // document.getElementById("form").style.display="none"
    // document.getElementById("loginForm").style.display="block"

    window.location.replace("login.html");

}


event.preventDefault()
}

//............................................................................




function check() {

let email2 =document.getElementById("inputLoginText").value
let password2 =document.getElementById("inputLoginPassword").value
let re2 = /\w+@\w{4,6}.[a-zA-Z]{2,3}/
let z2 = /\d{10}/
//let r = (JSON.parse (localStorage.jomoTeacher))
// Retrieve the JSON string from localStorage
const storedData = localStorage.getItem('jomoTeacher');

// Parse the JSON string back into an object
const r = JSON.parse(storedData);

//console.log(r)

if (email2 === 'admin') {
    window.location.replace("main.html");
} else {
    let authenticated = false;
    
    for (let i = 0; i < r.length; i++) {
        if (email2 === r[i].email && password2 === r[i].password) {
            authenticated = true;
            console.log(r[i].students)
            const currentTeacherIndex = i
            localStorage.setItem('currentTeacherIndex', JSON.stringify(currentTeacherIndex));
            // Redirect to the teacher page or perform other actions here
            window.location.replace("teacher-page.html");
            break; // Exit the loop since authentication succeeded
        }
    }
    
    if (!authenticated) {
        alert('Username/Password is incorrect');
    }
}









// else if (re2.test(email2)){

// for(i=0 ; i<r.length ; i++){
// if (email2 == (r[i].email)){
// document.getElementById("p1").innerHTML = ""
// document.getElementById("p1").style.color ="red"
// document.getElementById("p1").style.fontSize = "16px"
// }
// }

// }
// else{
// document.getElementById("p1").innerHTML = "please enter correct email"
// document.getElementById("p1").style.color ="red"
// document.getElementById("p1").style.fontSize = "16px"

// }
// if (email2.match(re2) != email2){
// document.getElementById("p1").innerHTML = "please enter correct email"
// document.getElementById("p1").style.color ="red"
// document.getElementById("p1").style.fontSize = "16px"
// }



// if (password2.match(z2)){

// for(i=0 ; i<r.length ; i++){
// if (password2 == (r[i].password)){
// document.getElementById("p2").innerHTML = ""
// document.getElementById("p2").style.color ="red"
// document.getElementById("p2").style.fontSize = "16px"
// }
// }

// }
// else{
// document.getElementById("p2").innerHTML = "please enter correct password"
// document.getElementById("p2").style.color ="red"
// document.getElementById("p2").style.fontSize = "16px"

// }

// if (
// document.getElementById("p1").innerHTML == "" &&
// document.getElementById("p2").innerHTML == ""
// ){
// // document.getElementById("text7").innerHTML = "coorrect action"
// // document.getElementById("text7").style.fontSize = "16px"
// // document.getElementById("text7").style.color ="yellow"

// // هذا الشرط بحولني على صفحة الهوم
// window.location.replace("teacher-page.html")
// }

}
// onload = function(){
// let t = (JSON.parse (localStorage.jomoTeacher))
// for (i=0 ; i<t.length ; i++){
//  arr.push(t[i])
// }

// }


function signUpPage(){
    window.location.replace("signup.html")
}





// ---- CONNECT LOGIN DATA TO POPULATE TEACHER PAGE WITH SPECIFIC DATA
// ---- WHEN CREATING NEW TEACHER, SAVE TO LOCAL STORAGE DATA
// ---- SAVE TEACHERS ATTENDANCE RECORDS TO LOCAL STORAGE DATA

//  ---WHEN CLICKING THE 'SAVE TEACHER' BUTTON, GOTO SINGLE COLUMN WITH TEACHER ROSTER STATS


//  ---- FIGURING OUT LOCALSTORAGE & CONNECTING INFO TO LOGIN
//  CONNECT THE SIGN UP TO SIGNING UP A NEW TEACHER
//  FIX VISUAL ELEMENTS OF ADMIN PAGE
//  CREATE STUDENT LIST CLICKABLE TO DISPLAY STUDENT FACTS


//   ---------------------
//  FINAL BIG THING TO TRY AND FIX
//  IF STUDENTS CLASS DAY CHANGES: 
// HOW DO I MAKE SURE ALL THE PREVIOUS DATES DON'T CHANGE


