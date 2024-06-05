
let hataMesaji =document.getElementsByClassName("hataMesaji");
let secenek =document.getElementById("secenek");
let input=document.querySelectorAll("input")
console.log(input);
for (let i = 0; i < hataMesaji.length; i++) {
    hataMesaji[i].style.display="none";    
}
function secenekDegisti() {
    console.log(secenek.value);
    if (secenek.value=="yeniMusteriEkle") {
        window.location.href="musteriEkle.html";
    }
}


fetch('http://localhost:3000/musteriListele')
.then(response => response.json())
.then(data => {
    console.log(data); 
    for (let i = 0; i < data.length; i++) {
        let option =document.createElement("option");
        option.innerText=data[i].isim+" "+data[i].soyisim;
        option.value=data[i].idmusteriler;
        secenek.appendChild(option);   
    }
})

document.getElementById("gelisKm").addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9]/g, ''); 
  });



  function kaydet() {
    if (secenek.value==""|| input[0].value.length<5 ||input[1].value.length<5  ||input[2].value.length<17  ||input[3].value=="") {
        if (secenek.value=="") {
            hataMesaji[0].style.display="";
        }
        if (input[0].value.length<5) {
            hataMesaji[1].style.display="";
        }
        if (input[1].value.length<5) {
            hataMesaji[2].style.display="";
        }
        if (input[2].value.length<17) {
            hataMesaji[3].style.display="";
        }
        if (input[3].value=="") {
            hataMesaji[4].style.display="";
        }
        console.log(input[1].value.split(" "));
    }



else{
   let dizi= input[1].value.split(" ");
   let MarkaModell="";
   for (let i = 0; i < dizi.length; i++) {
    if(i!=0){MarkaModell+=" "}
    MarkaModell+=(dizi[i][0].toUpperCase()+dizi[i].slice(1).toLowerCase());
   }
    fetch('http://localhost:3000/araclar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plaka: input[0].value.toLocaleUpperCase(), MarkaModel:MarkaModell, SaseNumarasi: input[2].value.toUpperCase(), GelisKm: input[3].value, idMusteri: secenek.value })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Hata:', error));
      console.log("başarılı");
     alert("Başarıyla eklendi");
     for (let i = 0; i < input.length; i++) {
        input[i].value="";        
     }
     secenek.value="sec";
  }
}










