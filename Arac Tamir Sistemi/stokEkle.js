
let malzeme = document.getElementById('isim');
let fiyat = document.getElementById('soyisim');
let adet = document.getElementById('telefon');
document.getElementById('isim').focus();

document.getElementsByClassName("hataMesaji")[0].style.display="none";
document.getElementsByClassName("hataMesaji")[1].style.display="none";
document.getElementsByClassName("hataMesaji")[2].style.display="none";
document.getElementById("isim").addEventListener("input", function() {
  this.value = this.value.replace(/[^a-zA-Z0-9ğİÇçşŞıüÜö ÖĞ]/g, ''); 
});
document.getElementById("soyisim").addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9]/g, ''); 
});
document.getElementById("telefon").addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9]/g, ''); 
});

document.addEventListener("keyup", function(no) {
  

    if (no.target!=document.getElementById('isim') &&document.getElementById('isim').value.length<2 &&document.getElementById('isim').value!="") {
        document.getElementsByClassName("hataMesaji")[0].style.display="";
        
      }
      else{
        document.getElementsByClassName("hataMesaji")[0].style.display="none";
    
      }
      if (no.target!=document.getElementById('soyisim') &&document.getElementById('soyisim').value=="") {
        document.getElementsByClassName("hataMesaji")[1].style.display="";
      }
      else{
        document.getElementsByClassName("hataMesaji")[1].style.display="none";
    
      }
      if (no.target!=document.getElementById('telefon')  &&document.getElementById('telefon').value=="") {
        document.getElementsByClassName("hataMesaji")[2].style.display="";
      }
      else{
        document.getElementsByClassName("hataMesaji")[2].style.display="none";
    
      }
})

document.addEventListener("keydown",function (no) {
 
  
    if (no.target!=document.getElementById('isim') &&document.getElementById('isim').value.length<2 &&document.getElementById('isim').value!="") {
        document.getElementsByClassName("hataMesaji")[0].style.display="";
        
      }
      else{
        document.getElementsByClassName("hataMesaji")[0].style.display="none";
    
      }
      if (no.target!=document.getElementById('soyisim') &&document.getElementById('soyisim').value=="") {
        document.getElementsByClassName("hataMesaji")[1].style.display="";
      }
      else{
        document.getElementsByClassName("hataMesaji")[1].style.display="none";
    
      }
      if (no.target!=document.getElementById('telefon')  &&document.getElementById('telefon').value=="") {
        document.getElementsByClassName("hataMesaji")[2].style.display="";
      }
      else{
        document.getElementsByClassName("hataMesaji")[2].style.display="none";
    
      }
})


function kaydet() {

if (malzeme.value.length<2 ||fiyat.value=="" ||adet.value==""|| malzeme.value=="") {
  if (malzeme.value.length<2|| malzeme.value=="") {
    document.getElementsByClassName("hataMesaji")[0].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[0].style.display="none";

  }
  if (fiyat.value=="") {
    document.getElementsByClassName("hataMesaji")[1].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[1].style.display="none";

  }
  if (telefon.value=="") {
    document.getElementsByClassName("hataMesaji")[2].style.display="";
  }
  else{
    document.getElementsByClassName("hataMesaji")[2].style.display="none";

  }
}


else{
 let malzemee = document.getElementById('isim').value.charAt(0).toUpperCase()+document.getElementById('isim').value.slice(1).toLowerCase();
let fiyatt = document.getElementById('soyisim').value;
let adett =document.getElementById('telefon').value;
console.log(malzemee);

console.log(fiyatt);
console.log(adett);
 fetch('http://localhost:3000/malzemeler', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ malzeme: malzemee, fiyat: fiyatt, adet: adett })
 })
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error('Hata:', error));
 console.log("başarılı");
alert("Başarıyla eklendi");
malzeme.value="";
fiyat.value="";
adet.value="";
malzeme.focus();
}

}