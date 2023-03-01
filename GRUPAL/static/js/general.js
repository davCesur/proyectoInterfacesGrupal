{/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script> */}

// MENÚ LATERAL
var elements = document.querySelectorAll("nav div");

elements.forEach(navelement => {
  navelement.addEventListener("mouseover", function() {
  this.querySelector("i").classList.replace("fa-regular", "fa-solid");
})
  navelement.addEventListener("mouseout", function() {
  this.querySelector("i").classList.replace("fa-solid", "fa-regular");
})
});

// FUNCIÓN COLORES MENÚ LATERAL

// users.forEach(user => {
//     user.addEventListener("click", function() {
//       if (this.style.backgroundColor != "rgb(218, 218, 218)") {
//         this.style.backgroundColor = "rgb(218, 218, 218)";
//       } else {
//         this.style.backgroundColor = "white";
//       } 
//     })
//   })

function Login(){ 
  var done=0; 
  var usuario=document.getElementById("mail").value;
  var password=document.getElementById("pass").value; 
  var regis = document.getElementById("register");
  
  if (usuario=="francisco@admin.com" && password=="123456") { 
    window.location.href = ("lista_alumnos.html");
  } else if (usuario == "pepe@alumno.com" && password=="123456") {
    window.location.href =("pepe_viyuela_alumno.html");

  } else if (usuario == "amancio@alumno.com" && password=="123456") {
    window.location.href = ("amancio_ortega_alumno.html");
  
  } else if (usuario == "lucia@alumno.com" && password=="123456") {
    window.location.href = ("lucia_barbilla_alumno.html");
  }
}