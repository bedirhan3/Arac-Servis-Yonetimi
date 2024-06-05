
let isim = document.getElementById('isim');
let soyisim = document.getElementById('soyisim');
let telefon = document.getElementById('telefon');
document.getElementById('isim').focus();
console.log(document.getElementsByClassName("hataMesaji")[0].style.display);
document.getElementsByClassName("hataMesaji")[0].style.display="none";
document.getElementsByClassName("hataMesaji")[1].style.display="none";
document.getElementsByClassName("hataMesaji")[2].style.display="none";
document.getElementById("isim").addEventListener("input", function() {
  this.value = this.value.replace(/[^a-zA-ZğİÇçşŞıüÜö ÖĞ]/g, ''); 
});
document.getElementById("soyisim").addEventListener("input", function() {
  this.value = this.value.replace(/[^a-zA-ZğİÇçşŞıüÜöÖĞ]/g, ''); 
});
document.getElementById("telefon").addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9]/g, ''); 
});

document.addEventListener("keyup", function(no) {
  console.log();
  

  if (no.target!=document.getElementById('isim') &&document.getElementById('isim').value.length<2 &&document.getElementById('isim').value!="") {
    document.getElementsByClassName("hataMesaji")[0].style.display="";
    
  }
  else{
    document.getElementsByClassName("hataMesaji")[0].style.display="none";

  }
  if (no.target!=document.getElementById('soyisim') &&document.getElementById('soyisim').value.length<2 &&document.getElementById('soyisim').value!="") {
    document.getElementsByClassName("hataMesaji")[1].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[1].style.display="none";

  }
  if (no.target!=document.getElementById('telefon')  &&document.getElementById('telefon').value!=""&&document.getElementById('telefon').value.length<11) {
    document.getElementsByClassName("hataMesaji")[2].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[2].style.display="none";

  }
})

document.addEventListener("keydown",function (no) {
  // if (no.target==isim &&isim.value[isim.value.length-1].charCodeAt(0)!=32&& (isim.value[isim.value.length-1].toUpperCase().charCodeAt(0)<65 || isim.value[isim.value.length-1].toUpperCase().charCodeAt(0)>90)||(isim.value.length>1 &&isim.value[isim.value.length-2].charCodeAt(0)==32&&  isim.value[isim.value.length-1].charCodeAt(0)==32   )) {
  //   let isim2="";
  //   for (let i = 0; i < isim.value.length; i++) {
  //     if (i==isim.value.length-1) {
  //       break;
  //     }
  //     isim2+=isim.value[i];
  //   }
  //   isim.value=isim2;
  // }
  // if (no.target==soyisim &&soyisim.value[soyisim.value.length-1].charCodeAt(0)!=32&& (soyisim.value[soyisim.value.length-1].toUpperCase().charCodeAt(0)<65 || soyisim.value[soyisim.value.length-1].toUpperCase().charCodeAt(0)>90)||(soyisim.value.length>1 &&soyisim.value[soyisim.value.length-2].charCodeAt(0)==32&&  soyisim.value[soyisim.value.length-1].charCodeAt(0)==32   )) {
  //   let soyisim2="";
  //   for (let i = 0; i < soyisim.value.length; i++) {
  //     if (i==soyisim.value.length-1) {
  //       break;
  //     }
  //     soyisim2+=soyisim.value[i];
  //   }
  //   soyisim.value=soyisim2;
  // }

  // if (no.target==telefon && (telefon.value[telefon.value.length-1].charCodeAt(0)<48 || telefon.value[telefon.value.length-1].charCodeAt(0)>57)||(telefon.value.length>1 &&telefon.value[telefon.value.length-2].charCodeAt(0)==32&&  telefon.value[telefon.value.length-1].charCodeAt(0)==32   )) {
  //   let telefon2="";
  //   for (let i = 0; i < telefon.value.length; i++) {
  //     if (i==telefon.value.length-1) {
  //       break;
  //     }
  //     telefon2+=telefon.value[i];
  //   }
  //   telefon.value=telefon2;
  // }
  if (no.target!=document.getElementById('isim') &&document.getElementById('isim').value.length<2 &&document.getElementById('isim').value!="") {
    document.getElementsByClassName("hataMesaji")[0].style.display="";
    
  }
  else{
    document.getElementsByClassName("hataMesaji")[0].style.display="none";

  }
  if (no.target!=document.getElementById('soyisim') &&document.getElementById('soyisim').value.length<2 &&document.getElementById('soyisim').value!="") {
    document.getElementsByClassName("hataMesaji")[1].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[1].style.display="none";

  }
  if (no.target!=document.getElementById('telefon')  &&document.getElementById('telefon').value!=""&&document.getElementById('telefon').value.length<12) {
    document.getElementsByClassName("hataMesaji")[2].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[2].style.display="none";

  }
})


function kaydet() {

if (isim.value.length<2 ||soyisim.value.length<2 ||telefon.value.length<11|| isim.value=="") {
  if (isim.value.length<2) {
    document.getElementsByClassName("hataMesaji")[0].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[0].style.display="none";

  }
  if (soyisim.value.length<2) {
    document.getElementsByClassName("hataMesaji")[1].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[1].style.display="none";

  }
  if (telefon.value.length<11) {
    document.getElementsByClassName("hataMesaji")[2].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[2].style.display="none";

  }
}


else{
 let isimm = document.getElementById('isim').value.charAt(0).toUpperCase()+document.getElementById('isim').value.slice(1).toLowerCase();
let soyisimm = document.getElementById('soyisim').value.charAt(0).toUpperCase()+document.getElementById('soyisim').value.slice(1).toLowerCase();
let telefonn = "+"+document.getElementById('telefon').value;

 fetch('http://localhost:3000/musteriler', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ isim: isimm, soyisim: soyisimm, telefon: telefonn, toplamOdenen: 0 })
 })
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error('Hata:', error));
 console.log("başarılı");
alert("Başarıyla eklendi");
isim.value="";
soyisim.value="";
telefon.value="";
isim.focus();
}

}