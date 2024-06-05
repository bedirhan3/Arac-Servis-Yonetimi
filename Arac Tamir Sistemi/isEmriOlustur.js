let hataMesaji = document.getElementsByClassName("hataMesaji");

let secenek = document.getElementById("secenek");
let secenek2 = document.getElementById("secenek2");
let input = document.querySelectorAll("input");
let hangiMaliyet, hangiAdet;
let tumUrunlerinMaliyeti = document.getElementById("tumUrunlerinMaliyeti");
let urunToplamTutar,eklemesizMaliyet;
let plaka=[]
console.log(secenek.value);


console.log(hataMesaji);
document.querySelector("table").style.paddingBottom = "25px";
document.getElementsByClassName("mouseOver")[0].style.display = "none"
document.getElementsByClassName("mouseOver")[1].style.display = "none"

for (let i = 0; i < hataMesaji.length; i++) {
    hataMesaji[i].style.position = "absolute";
    hataMesaji[i].style.marginLeft = "480px"
    if (i == 5) {
        continue;
    }
        hataMesaji[i].style.display = "none";
}




function secenekDegisti() {
    if (secenek.value == "yeniAracEkle") {
        window.location.href = "aracEkle.html";
    }
}

document.getElementById("gelisKm").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});
document.getElementById("tutar").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});



document.getElementsByClassName("adetSayisi")[0].addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    hangiAdet.innerText = "Adet Sayısı: " + document.getElementsByClassName("adetSayisi")[0].value;
    if (this.value == "") {
        hangiAdet.innerText = "Adet Sayısı: " + 1;
    }
    
    let eklemeliMaliyet=eklemesizMaliyet+(Number(hangiAdet.innerText.slice(13))*Number(hangiAdet.parentNode.children[2].innerText.slice(9)));
    tumUrunlerinMaliyeti.innerText=eklemeliMaliyet;
    


    document.getElementsByClassName("adetSayisi")[0].addEventListener("keyup", function (params) {
        console.log(params.key);
        if (params.key == "Enter") {
            cik(1);
        }
        if (params.key == "ArrowUp") {
            atama(1)
        }
        if (params.key == "ArrowDown") {
            atama(0)
        }
    })

});



document.getElementsByClassName("adetSayisi")[1].addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    
    let eklemeliMaliyet=eklemesizMaliyet+(Number(document.getElementsByClassName("adetSayisi")[1].value)*Number(hangiMaliyet.parentNode.children[1].innerText.slice(13)));
    tumUrunlerinMaliyeti.innerText=eklemeliMaliyet;

    let maliyet = document.getElementsByClassName("adetSayisi")[1].value;
    if (maliyet == "") {
        maliyet = 0;
    }
    hangiMaliyet.innerHTML = 'Maliyet: ' + maliyet + '<i style="width: 9px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i>'


    if (Number(maliyet) > 100) {
        document.getElementsByClassName("adetSayisi")[1].style.width = "100px";
    }


    document.getElementsByClassName("adetSayisi")[1].addEventListener("keyup", function (params) {
        console.log(params.key);
        if (params.key == "Enter") {
            cik(2);
        }
        if (params.key == "ArrowUp") {
            atama(3);
        }
        if (params.key == "ArrowDown") {
            atama(2);

        }
    })


});

document.addEventListener("click", function (params) {
    console.log(params.target);
    if (params.target.className == "urunListele maliyet") {

        hangiMaliyet = params.target
        document.getElementsByClassName("adetSayisi")[1].value = hangiMaliyet.innerText.slice(9);

        let tumMaliyetButonları = document.getElementsByClassName("urunListele maliyet");
        for (let i = 0; i < tumMaliyetButonları.length; i++) {
            if (tumMaliyetButonları[i] == hangiMaliyet) {
                document.getElementsByClassName("mouseOver")[1].style.marginTop = 440 + ((i) * 34.1) + "px"
            }
        }

        document.getElementsByClassName("adetSayisi")[1].focus();
        document.getElementsByClassName("adetSayisi")[1].select();
        console.log(hangiMaliyet.innerText.slice(9));
        console.log(hangiMaliyet.parentNode.children[1].innerText.slice(13));

        urunToplamTutar=Number(hangiMaliyet.innerText.slice(9))*Number(hangiMaliyet.parentNode.children[1].innerText.slice(13))
        eklemesizMaliyet=Number(tumUrunlerinMaliyeti.innerText)-urunToplamTutar;

    }


    if (params.target.className == "urunListele adet") {
        hangiAdet = params.target
        document.getElementsByClassName("adetSayisi")[0].value = hangiAdet.innerText.slice(13);


        let tumAdetButonları = document.getElementsByClassName("urunListele adet");
        for (let i = 0; i < tumAdetButonları.length; i++) {
            if (tumAdetButonları[i] == hangiAdet) {
                document.getElementsByClassName("mouseOver")[0].style.marginTop = 440 + ((i) * 34.1) + "px"
            }
        }

        document.getElementsByClassName("adetSayisi")[0].focus();
        document.getElementsByClassName("adetSayisi")[0].select();

        urunToplamTutar=Number(hangiAdet.parentNode.children[2].innerText.slice(9))*Number(hangiAdet.innerText.slice(13))
        eklemesizMaliyet=Number(tumUrunlerinMaliyeti.innerText)-urunToplamTutar;
        
    }

    if (params.target.className == "urunListele isim") {
        urunSil(params.target);

    }



})



fetch('http://localhost:3000/aracListele')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            let option = document.createElement("option");
            option.innerText = data[i].plaka;
            option.value = data[i].idmusteriler;
            secenek.appendChild(option);
            plaka.push({key:data[i].plaka,value:data[i].idaraclar,key1:data[i].MarkaModel,key2:data[i].SaseNumarasi})
        }
        console.log(plaka);

    })

fetch('http://localhost:3000/stokListele')
    .then(responese => responese.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let option = document.createElement("option");
            option.innerText = data[i].malzeme;
            option.value = data[i].fiyat
            option.id=data[i].idstokListesi;
            option.adet=data[i].adet;
            secenek2.appendChild(option);
        }
    })



function urunEkle() {
    secenek2 = document.getElementById("secenek2");
    if (secenek2.value=="yeniUrunEkle") {
        window.location.href="stokEkle.html"
    }
    let span = document.createElement("span");
    span.value=secenek2.options[secenek2.selectedIndex].id+" "+secenek2.options[secenek2.selectedIndex].adet;
    
    
    span.className = "silinecekUrunler";
    let secilenUrun = secenek2.options[secenek2.selectedIndex].text;
    let secilenUrunMaliyet = secenek2.options[secenek2.selectedIndex].value;
    span.innerHTML = '<span class="urunListele isim"> ' + secilenUrun + ' </span><span class="urunListele adet"  onclick="adetSayisiAyarla(0)"  > Adet Sayısı: 1 </span><span class="urunListele maliyet"onclick="maliyetAyarla(0)" > Maliyet: ' + secilenUrunMaliyet + '<i style="width: 9px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i></span><br>'
    tumUrunlerinMaliyeti.innerText = Number(tumUrunlerinMaliyeti.innerText) + Number(secilenUrunMaliyet);
    hataMesaji[5].appendChild(span);  
    








    let urunSayisi = document.getElementsByClassName("urunListele maliyet").length;
    if (urunSayisi > 2) {
        let tablo = document.querySelector("table");
        let padding = Number(tablo.style.paddingBottom.split("p")[0]);
        tablo.style.paddingBottom = (padding + 34.1) + "px";
    }

}


function urunSil(params) {
    console.log(params);
    console.log(params.parentNode.children[1].innerText.slice(13));
    let urunToplamTutar = Number(params.parentNode.children[2].innerText.slice(9)) * Number(params.parentNode.children[1].innerText.slice(13));
    tumUrunlerinMaliyeti.innerText = Number(tumUrunlerinMaliyeti.innerText) - urunToplamTutar;
    params.parentNode.remove();

    if (document.getElementsByClassName("urunListele maliyet").length > 2) {
        let tablo = document.querySelector("table");
        let padding = Number(tablo.style.paddingBottom.split("p")[0]);
        tablo.style.paddingBottom = (padding - 34.1) + "px";
    }
}







function adetSayisiAyarla(params) {
    document.getElementsByClassName("mouseOver")[0].style.display = "";




}


function maliyetAyarla(params) {
    document.getElementsByClassName("mouseOver")[1].style.display = "";




}



function atama(params) {
    let adetSayisi = Number(document.getElementsByClassName("adetSayisi")[0].value);
    let adetSayisi2 = Number(document.getElementsByClassName("adetSayisi")[1].value);
    if (params == 0 && adetSayisi > 1) {
        adetSayisi--;
        document.getElementsByClassName("adetSayisi")[0].value = adetSayisi;
        hangiAdet.innerText = "Adet Sayısı: " + adetSayisi;

        let eklemeliMaliyet=eklemesizMaliyet+(Number(hangiAdet.innerText.slice(13))*Number(hangiAdet.parentNode.children[2].innerText.slice(9)));
        tumUrunlerinMaliyeti.innerText=eklemeliMaliyet;
    }
    if (params == 1) {
        adetSayisi++;
        document.getElementsByClassName("adetSayisi")[0].value = adetSayisi;
        hangiAdet.innerText = "Adet Sayısı: " + adetSayisi;
        let eklemeliMaliyet=eklemesizMaliyet+(Number(hangiAdet.innerText.slice(13))*Number(hangiAdet.parentNode.children[2].innerText.slice(9)));
        tumUrunlerinMaliyeti.innerText=eklemeliMaliyet;
    }
    if (params == 4 && adetSayisi2 > 1) {
        adetSayisi2--;
        document.getElementsByClassName("adetSayisi")[1].value = adetSayisi2;
        hangiMaliyet.innerHTML = 'Maliyet: ' + adetSayisi2 + '<i style="width: 9px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i>'
        let eklemeliMaliyet=eklemesizMaliyet+(Number(hangiMaliyet.innerText.slice(9))*Number(hangiMaliyet.parentNode.children[1].innerText.slice(13)));
        tumUrunlerinMaliyeti.innerText=eklemeliMaliyet;

    }
    if (params == 3) {
        adetSayisi2++;
        document.getElementsByClassName("adetSayisi")[1].value = adetSayisi2;
        hangiMaliyet.innerHTML = 'Maliyet: ' + adetSayisi2 + '<i style="width: 9px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i>'
        let eklemeliMaliyet=eklemesizMaliyet+(Number(hangiMaliyet.innerText.slice(9))*Number(hangiMaliyet.parentNode.children[1].innerText.slice(13)));
        tumUrunlerinMaliyeti.innerText=eklemeliMaliyet;
    }


}
function cik(params) {
    if (params == 1) {
        document.getElementsByClassName("mouseOver")[0].style.display = "none";

    }
    if (params == 2) {
        document.getElementsByClassName("mouseOver")[1].style.display = "none";

    }

}


function kaydet() {



    if (input[3].value=="" ||input[4].value=="" ||input[5].value==""|| secenek.value=="") {
      if (secenek.value=="") {
        document.getElementsByClassName("hataMesaji")[0].style.display="";
      }
      else{
        document.getElementsByClassName("hataMesaji")[0].style.display="none";
    
      }
      if (input[3].value=="") {
        document.getElementsByClassName("hataMesaji")[2].style.display="";
      }
      else{
        document.getElementsByClassName("hataMesaji")[2].style.display="none";
    
      }
      if (input[4].value=="") {
        document.getElementsByClassName("hataMesaji")[3].style.display="";
      }
      else{
        document.getElementsByClassName("hataMesaji")[3].style.display="none";
    
      }
      if (input[5].value=="") {
        document.getElementsByClassName("hataMesaji")[4].style.display="";
      }
      else{
        document.getElementsByClassName("hataMesaji")[4].style.display="none";
    
      }
    }
    
    
    else{

            let aracid;
            let plakaa,MarkaModell,SaseNumarasii
            for (let i = 0; i < plaka.length; i++) {
                if (secenek.options[secenek.selectedIndex].text==plaka[i].key) {
                    aracid=plaka[i].value;
                    plakaa=plaka[i].key
                    MarkaModell=plaka[i].key1
                    SaseNumarasii=plaka[i].key2
                    break;
                }            
            }

        let spanlar=document.getElementsByClassName("silinecekUrunler")
     let isTanimii = input[2].value.charAt(0).toUpperCase()+input[2].value.slice(1).toLowerCase();
    let sikayett = input[3].value.charAt(0).toUpperCase()+input[3].value.slice(1).toLowerCase();
    let iscilikk = input[4].value;
    let stokk=tumUrunlerinMaliyeti.innerText+", ";
    for (let i = 0; i < spanlar.length; i++) {
        stokk+= spanlar[i].children[1].innerText.slice(13)+" ";
        stokk+= spanlar[i].children[0].innerText+" "
        stokk+= spanlar[i].children[2].innerText.slice(9)+", ";

    }

    for (let i = 0; i < spanlar.length; i++) {
        debugger
        fetch('http://localhost:3000/stokGuncelle', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            
        },

        body: JSON.stringify({
            id: spanlar[i].value.split(" ")[0],
            malzeme: spanlar[i].children[0].innerText,
            adet: (Number(spanlar[i].value.split(" ")[1])-Number(spanlar[i].children[1].innerText.slice(13))),
            fiyat: spanlar[i].children[2].innerText.slice(9),
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Hata:', data.error);
            alert('Güncelleme sırasında bir hata oluştu.');
        } else {
        }
    });

    // setTimeout(3000);
    }


    for (let i = spanlar.length-1; i>=0; i--) {
    spanlar[i].remove();
}

    


    fetch('http://localhost:3000/aracGuncelle', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: aracid,
            plaka: plakaa.toUpperCase(),
            MarkaModel: MarkaModell,
            SaseNumarasi: SaseNumarasii,
            GelisKm: input[5].value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Hata:', data.error);
            alert('Güncelleme sırasında bir hata oluştu.');
        } else {
            alert("güncellendi başarıyla")
        }
    });

     fetch('http://localhost:3000/isEmirleri', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       
       body: JSON.stringify({ isTanimi: isTanimii, sikayet: sikayett, iscilik: iscilikk, stok: stokk, id: aracid })
     })
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error('Hata:', error));
     console.log("başarılı");
    alert("Başarıyla eklendii");
    input[2].value="";
    input[3].value="";
    input[4].value="";
    input[5].value="";
    input[2].focus();
    secenek.value="sec";
    secenek2.value="sec2";
    tumUrunlerinMaliyeti.innerText=0
    }}

        







