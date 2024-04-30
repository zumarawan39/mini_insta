let name = document.querySelector(".name").value;
let f_name = document.querySelector(".father_name");
let phno = document.querySelector(".phno");
let email = document.querySelector(".email");
let password = document.querySelector(".password");

function submit(event) {
  alert("submitted");
  event.preventDefault();
fetch("http://localhost:8080/sign",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    // body:JSON.stringify({
    //     name:name,
    //     f_name:f_name,
    //     phno:phno,
    //     email:email,
    //     password:password
    // })
})
  
  console.log(
    name.value,
    f_name.value,
    phno.value,
    email.value,
    password.value
  );
}
