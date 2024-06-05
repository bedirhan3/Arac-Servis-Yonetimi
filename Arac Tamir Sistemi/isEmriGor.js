let search = document.getElementById("search");
let aracPlakaAd = [];
let aracIDleri = [];
let isEmriIDleri = [];
let toplamPara=[]
let stok;
let durumm;
document.getElementById("pop-up").style.display = "none";


const fetch1 = fetch('http://localhost:3000/aracListele').then(response => response.json());
const fetch2 = fetch('http://localhost:3000/isEmriListele').then(response => response.json());
const fetch3 = fetch('http://localhost:3000/musteriListele').then(response => response.json());
Promise.all([fetch1, fetch2, fetch3])
    .then(results => {
        console.log('arac listele:', results[0]);
        console.log('is emri listle:', results[1]);
        console.log('musteri listele:', results[2]);

        for (let i = 0; i < results[0].length; i++) {
            for (let a = 0; a < results[2].length; a++) {
                if (results[0][i].idMusteri == results[2][a].idmusteriler) {
                    aracPlakaAd.push({ key: results[0][i].idaraclar, value: results[0][i].plaka, value2: results[2][a].isim + " " + results[2][a].soyisim, musterid:results[2][a].idmusteriler, toplamPara:results[2][a].toplamOdenen })
                    
                }
            }
        }



        let musteriIsimSoyisim;
        let aracPlaka;
        let tablo = document.getElementById("table");
    
            let j=-1;
        for (let i = results[1].length-1; i >= 0; i--) {

            if (results[1][i].durum!="teslim edildi") {
                j++;
            for (let a = 0; a < aracPlakaAd.length; a++) {
                if (results[1][i].idaraclar == aracPlakaAd[a].key) {

                    aracPlaka = aracPlakaAd[a].value
                    musteriIsimSoyisim = aracPlakaAd[a].value2
                    break;
                }
            }
            let tr = document.createElement("tr");
            if (typeof results[1][i].stok == "string") {
                stok = results[1][i].stok.split(",")[0]
            }
            else { stok = 0 }
            tr.innerHTML = '<td>' + aracPlaka + '</td><td>' + musteriIsimSoyisim + '</td><td>' + results[1][i].isTanimi + '</td><td>' + results[1][i].sikayet + '</td><td>' + results[1][i].iscilik + '<i style="font-size: 17px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i></td><td>' + stok + '</td><td>' + results[1][i].tarih + '</td><td><button class="durumButton" onclick="durumButton(event, '+j    +')">' + results[1][i].durum + '</button></td>'

            tr.addEventListener("click", (function (index) {
                return function () {
                    musteriyeTikla(index);
                };
            })(j));
            tablo.appendChild(tr);
            // j++;
            aracIDleri.push(results[1][i].idaraclar);
            isEmriIDleri.push(results[1][i].idisEmirleri);
            toplamPara.push(Number(results[1][i].iscilik)+Number(results[1][i].stok.split(",")[0]))
        }

        }
        // debugger
        // isEmriIDleri.reverse(); 
        // aracIDleri.reverse();
        // toplamPara.reverse();


        search.addEventListener("keyup", function (params) {
            console.log(params);
            aracIDleri = [];
            isEmriIDleri=[];
            toplamPara=[];
            let allTr = document.querySelectorAll("tr");
            for (let i = 2; i < allTr.length; i++) {
                allTr[i].parentNode.removeChild(allTr[i])
            }
            let ii = 0;
            for (let i = results[1].length-1; i >=0; i--) {
                if ( results[1][i].durum!="teslim edildi" ) {

                for (let a = 0; a < aracPlakaAd.length; a++) {
                    if (results[1][i].idaraclar == aracPlakaAd[a].key) {
    
                        aracPlaka = aracPlakaAd[a].value
                        musteriIsimSoyisim = aracPlakaAd[a].value2
                        break;
                    }
                }
                if (typeof results[1][i].stok == "string") {
                    stok = results[1][i].stok.split(",")[0]
                }
                else { stok = 0 }
                if ((aracPlaka.toUpperCase()+" "+musteriIsimSoyisim.toUpperCase()+" "+results[1][i].isTanimi.toUpperCase()+" "+results[1][i].sikayet.toUpperCase()+" "+stok.toString().toUpperCase()+" "+results[1][i].durum.toUpperCase()+" "+results[1][i].tarih+" "+results[1][i].iscilik.toString()).includes(search.value.toUpperCase())) {
                    let tr = document.createElement("tr");

                    tr.innerHTML = '<td>' + aracPlaka + '</td><td>' + musteriIsimSoyisim + '</td><td>' + results[1][i].isTanimi + '</td><td>' + results[1][i].sikayet + '</td><td>' + results[1][i].iscilik + '<i style="font-size: 17px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i></td><td>' + stok + '</td><td>' + results[1][i].tarih + '</td><td><button class="durumButton" onclick="durumButton(event, '+ii+')">' + results[1][i].durum + '</button></td>'
                    tablo.appendChild(tr);
                    aracIDleri.push(results[1][i].idaraclar);
                    isEmriIDleri.push(results[1][i].idisEmirleri);
                    toplamPara.push(Number(results[1][i].iscilik)+Number(results[1][i].stok.split(",")[0]))

                    tr.addEventListener("click", (function (index) {
                        return function () {
                            musteriyeTikla(index);
                        };
                    })(ii));
                    ii++;
                }
            }
        }
       
        })
    })
    .catch(error => {
        console.error('Bir fetch hatası oluştu:', error);
    });




function durumButton(eventt, params) {
    let musteriID;
    let toplamOdenenn;
    console.log(eventt);
    console.log(params);
    

    event.stopPropagation(); 
    console.log("İS idsi: " + isEmriIDleri[params]);
    console.log("arac idsi: " + aracIDleri[params]);
    console.log("toplam para: "+toplamPara[params]);
    idIsEmirler=isEmriIDleri[params];

    console.log(eventt.target);
    debugger
    if (eventt.target.innerText=="sırada") {
        durumm="tamir ediliyor";
    }
    if (eventt.target.innerText=="tamir ediliyor") {
        
        durumm="tamir edildi";
    }
    if (eventt.target.innerText=="tamir edildi") {
        durumm="teslim edildi";
        
        for (let i = 0; i < aracPlakaAd.length; i++) {
            debugger
            if (aracPlakaAd[i].key==aracIDleri[params]) {
                musteriID=aracPlakaAd[i].musterid;
                toplamOdenenn=Number(aracPlakaAd[i].toplamPara);
                toplamOdenenn+=Number(toplamPara[params]);
                console.log(toplamOdenenn);
                break;
                
            }
        }

            fetch('http://localhost:3000/musteriToplamOdenenGuncelle', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: musteriID,
                    toplamOdenen: toplamOdenenn
                })
        
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error('Hata:', data.error);
                        alert('Güncelleme sırasında bir hata oluştu.');
                    } else {
                        console.log(data);
                        alert('Araç başarıyla güncellendi.');
                        location.reload();
                    }
                });
        

    }
    if (eventt.target.innerText!="teslim edildi") {
        fetch('http://localhost:3000/isEmriDurumGuncelle', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idIsEmirler,
                durum: durumm
            })
    
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Hata:', data.error);
                    alert('Güncelleme sırasında bir hata oluştu.');
                } else {
                    console.log(data);
                    alert('Araç başarıyla güncellendi.');
                }
            });


            fetch('http://localhost:3000/raporEkle', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isEmriID: idIsEmirler,durum:durumm})
              })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error('Hata:', error));
              console.log("başarılı");
             alert("Başarıyla eklendi");
             location.reload();
    }


   





}





document.getElementsByClassName("input")[0].addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z0-9ğİÇçşŞ ıüÜöÖĞ]/g, '');
});
document.getElementsByClassName("input")[1].addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZğİÇçşŞ ıüÜöÖĞ0-9]/g, '');
});
document.getElementsByClassName("input")[2].addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

let idArac,idIsEmirler;
let bilgiler = document.getElementsByClassName("bilgiler");
let duzenLeButon = document.querySelectorAll(".fa-solid.fa-pen-to-square");
let input = document.getElementsByClassName("input")
for (let i = 0; i < input.length; i++) {
    input[i].style.display = "none";
}
for (let i = 0; i < 3; i++) {
    input[i].addEventListener("keydown", function (params) {
        if (params.key == "Enter") {
            duzenle(i);
        }
    })
}
function musteriyeTikla(no) {
    console.log(no);
    console.log("tıklandı" + no);
    console.log("arac idsi: " + aracIDleri[no]);
    console.log("İS idsi: " + isEmriIDleri[no]);
    console.log("toplam para: "+toplamPara[no]);



    //degisiklik kaydet buton widt 239


    idArac = aracIDleri[no];
    idIsEmirler=isEmriIDleri[no];
    
    let numara = (no * 8) + 1;
    document.querySelector("#pop-up").style.display = "";

    bilgiler[0].innerText = document.querySelectorAll("td")[numara+2].innerText;
    bilgiler[1].innerText = document.querySelectorAll("td")[numara + 3].innerText;
    bilgiler[2].innerText = document.querySelectorAll("td")[numara + 4].innerText;

}



let genislik;
function duzenle(params) {
    console.log(getComputedStyle(bilgiler[params]).width);
    console.log(bilgiler[params].style.width);



    if (input[params].style.display == "none") {
        input[params].style.display = "inline-block";
        genislik = getComputedStyle(bilgiler[params]).width
        console.log(Number(genislik.split(".")[0]));
        if (Number(genislik.split(".")[0]) < 130) {
            input[params].style.width = "130px";
        }
        else {
            input[params].style.width = genislik;
        }
        bilgiler[params].style.display = "none";
        duzenLeButon[params].className = "fa-solid fa-check"
        input[params].value = bilgiler[params].innerText
        input[params].select();
    }
    else {
        bilgiler[params].innerText = input[params].value;
        input[params].style.display = "none";
        bilgiler[params].style.display = "inline-block";
        duzenLeButon[params].className = "fa-solid fa-pen-to-square"

    }
}


function carpi() {

    for (let i = 0; i < 3; i++) {
        input[i].style.display = "none";
        bilgiler[i].style.display = "inline-block";
        duzenLeButon[i].className = "fa-solid fa-pen-to-square"
    }

    console.log(document.querySelector("#pop-up").style.display);
    document.querySelector("#pop-up").style.display = "none";

}

document.getElementById("degisikleriKaydet").addEventListener("click", function asd () {

    fetch('http://localhost:3000/isEmriGuncelle', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idIsEmirler,
            isTanimi: bilgiler[0].innerText[0].toUpperCase()+bilgiler[0].innerText.slice(1).toLowerCase(),
            sikayet: bilgiler[1].innerText[0].toUpperCase()+bilgiler[1].innerText.slice(1).toLowerCase(),
            iscilik: bilgiler[2].innerText,
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Hata:', data.error);
                alert('Güncelleme sırasında bir hata oluştu.');
            } else {
                console.log(data);
                alert('Araç başarıyla güncellendi.');
                location.reload();
            }
        });

})














