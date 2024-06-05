let gunlukKazanc = [0, 0, 0];
let baslangicTarih, bitisTarih;
let range = document.getElementsByClassName("range")
let genelRapor = [];
tarihAraligi = document.getElementById("tarihAraligi");
let search = document.getElementById("search");
let months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function Tarih(date) {
    let datee = new Date(date);
    let yıl = datee.getFullYear();
    let ay = String(datee.getMonth() + 1).padStart(2, '0');
    let gün = String(datee.getDate()).padStart(2, '0');

    return `${gün} ${months[ay - 1]} ${yıl}`;
}

const fetch1 = fetch('http://localhost:3000/aracListele').then(response => response.json());
const fetch2 = fetch('http://localhost:3000/isEmriListele').then(response => response.json());
const fetch3 = fetch('http://localhost:3000/musteriListele').then(response => response.json());
const fetch4 = fetch('http://localhost:3000/raporListele').then(response => response.json());

Promise.all([fetch1, fetch2, fetch3, fetch4])
    .then(results => {
        // console.log('arac listele: a', results[0]);
        // console.log('is emri listle: i', results[1]);
        // console.log('musteri listele: b', results[2]);
        // console.log('rapor listele: j', results[3]);
        console.log(results[3][0].tarih);
        baslangicTarih = results[3][0].tarih.split(" ")[0];
        for (let i = results[3].length - 1; i >= 0; i--) {
            if (results[3][i].durum == "teslim edildi") {
                bitisTarih = results[3][i].tarih.split(" ")[0]
                range[0].max = ((new Date(bitisTarih) - new Date(baslangicTarih)) / 86400000) + 1;
                range[1].max = ((new Date(bitisTarih) - new Date(baslangicTarih)) / 86400000) + 1;
                range[1].value=range[1].max

                tarihAraligi.innerText = baslangicTarih.split("-")[2] + " " + months[Number(baslangicTarih.split("-")[1] - 1)] + " " + baslangicTarih.split("-")[0] + " - " + bitisTarih.split("-")[2] + " " + months[Number(bitisTarih.split("-")[1] - 1)] + " " + bitisTarih.split("-")[0]
                break;
            }
        }
console.log(baslangicTarih);
console.log(bitisTarih);
        ilk2 = new Date(bitisTarih)
        ilk = new Date(baslangicTarih)



        for (let j = results[3].length - 1; j >= 0; j--) {
            if (results[3][j].durum=="teslim edildi") {
                
            for (let i = 0; i < results[1].length; i++) {
                if (results[3][j].isEmriID == results[1][i].idisEmirleri) {
                    for (let a = 0; a < results[0].length; a++) {

                        if (results[1][i].idaraclar == results[0][a].idaraclar) {
                            for (let b = 0; b < results[2].length; b++) {
                                if (results[0][a].idMusteri == results[2][b].idmusteriler) {
                                    let tr = document.createElement("tr");

                                    tr.innerHTML = '<td>' + Tarih(results[3][j].tarih.split("T")[0]) + '</td><td>' + results[2][b].isim + " " + results[2][b].soyisim + '</td><td>' + results[0][a].plaka + '</td><td>' + results[1][i].isTanimi + '</td><td>' + results[1][i].sikayet + '</td><td>' + results[1][i].iscilik + '<i style="font-size: 17px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i></td><td class="kullanilanParcalar">' + results[1][i].stok.split(",")[1] + '...</td><td>' + results[1][i].stok.split(",")[0] + '</td><td>' + (Number(results[1][i].stok.split(",")[0]) + Number(results[1][i].iscilik)) + '</td>'

                                    tr.onclick = function () {
                                        musteriyeTikla(i);
                                    }
                                    document.getElementById("table").appendChild(tr);
                                    genelRapor.push({
                                        tarih: results[3][j].tarih.split("T")[0],
                                        adSoyad: results[2][b].isim + " " + results[2][b].soyisim,
                                        plaka: results[0][a].plaka,
                                        isTanimi: results[1][i].isTanimi,
                                        sikayet: results[1][i].sikayet,
                                        iscilik: results[1][i].iscilik,
                                        kullanilanParcalar: results[1][i].stok.split(",")[1],
                                        parcaMaliyeti: results[1][i].stok.split(",")[0],
                                        toplamUcret: +(Number(results[1][i].stok.split(",")[0]) + Number(results[1][i].iscilik)),
                                        durum: results[3][j].durum


                                    })


                                    if (results[3][j].durum == "teslim edildi") {
                                        gunlukKazanc[0] += (Number(results[1][i].stok.split(",")[0]) + Number(results[1][i].iscilik));
                                        gunlukKazanc[1] += Number(results[1][i].stok.split(",")[0]);
                                        gunlukKazanc[2] += Number(results[1][i].iscilik);
                                        let rapor = document.getElementsByClassName("rapor");
                                        for (let i = 0; i < rapor.length; i++) {
                                            rapor[i].innerText = gunlukKazanc[i];
                                        }
                                    }

                                }
                            }
                        }


                    }
                }
            }
            }

        }





    })
    .catch(error => {
        console.error('Bir fetch hatası oluştu:', error);
    });




let aylar = {
    ocak: 31,
    şubat: 28,
    mart: 31,
    nisan: 30,
    mayıs: 31,
    haziran: 30,
    temmuz: 31,
    ağustos: 31,
    eylül: 30,
    ekim: 31,
    kasım: 30,
    aralık: 31
}
if (new Date().getFullYear() % 4 == 0) {
    aylar.şubat = 29;
}


range[0].addEventListener("input", function () {
    let toplam=0;
    for (let i = 0; i < gunlukKazanc.length; i++) {
        let rapor = document.getElementsByClassName("rapor");
        gunlukKazanc[i]=0  
        rapor[i].innerText = gunlukKazanc[i];

    }
    ilk = new Date(baslangicTarih)

    console.log(ilk);
    ilk.setDate(ilk.getDate() + Number(range[0].value) - 1);
    console.log(Tarih(ilk));
    tarihAraligi.innerText = Tarih(ilk) + " -" + tarihAraligi.innerText.split("-")[1];

    let allTr = document.querySelectorAll("#table tr");
    for (let a = allTr.length - 1; a >= 2; a--) {
        allTr[a].remove()
    }
        for (let i = 0; i < genelRapor.length; i++) {
            if ((new Date(ilk2)-new Date(genelRapor[i].tarih))>=0&& (new Date(genelRapor[i].tarih)-new Date(ilk))>=0) {
                if (genelRapor[i].durum == "teslim edildi") {
                     toplam++;
                    gunlukKazanc[0] += Number(genelRapor[i].toplamUcret);
                    gunlukKazanc[1] += Number(genelRapor[i].parcaMaliyeti);
                    gunlukKazanc[2] += Number(genelRapor[i].iscilik);
                    let rapor = document.getElementsByClassName("rapor");
                    for (let i = 0; i < rapor.length; i++) {
                        rapor[i].innerText = gunlukKazanc[i];
                    }
                }

            if ((Tarih(genelRapor[i].tarih) + " " + genelRapor[i].adSoyad + " " + genelRapor[i].plaka + " " + genelRapor[i].isTanimi + " " + genelRapor[i].sikayet + " " + genelRapor[i].iscilik + " " + genelRapor[i].kullanilanParcalar + " " + genelRapor[i].parcaMaliyeti + " " + genelRapor[i].toplamUcret).toLowerCase().includes(search.value.toLowerCase())) {
    
                let tr = document.createElement("tr");
    
                tr.innerHTML = '<td>' + Tarih(genelRapor[i].tarih) + '</td><td>' + genelRapor[i].adSoyad + '</td><td>' + genelRapor[i].plaka + '</td><td>' + genelRapor[i].isTanimi + '</td><td>' + genelRapor[i].sikayet + '</td><td>' + genelRapor[i].iscilik + '<i style="font-size: 17px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i></td><td class="kullanilanParcalar">' + genelRapor[i].kullanilanParcalar + '...</td><td>' + genelRapor[i].parcaMaliyeti + '</td><td>' + genelRapor[i].toplamUcret + '</td>'

    
                document.getElementById("table").appendChild(tr);
    
    
    
            }
    
        }
    }

    // console.log(range[0].value);
})

range[1].addEventListener("input", function () {
    for (let i = 0; i < gunlukKazanc.length; i++) {
        let rapor = document.getElementsByClassName("rapor");
        gunlukKazanc[i]=0  
        rapor[i].innerText = gunlukKazanc[i];

    }
      ilk2 = new Date(bitisTarih)
    console.log(ilk2);
    ilk2.setDate(ilk2.getDate() + Number(range[1].value) - Number(range[0].max));
    console.log(Tarih(ilk2));
    tarihAraligi.innerText = tarihAraligi.innerText.split("-")[0] + "- " + Tarih(ilk2);
    console.log(range[1].value + "   " + range[0].value);
    console.log(ilk + "    " + ilk2);
    console.log(new Date(ilk2)-new Date(ilk));

    let allTr = document.querySelectorAll("#table tr");
    for (let a = allTr.length - 1; a >= 2; a--) {
        allTr[a].remove()
    }
        for (let i = 0; i < genelRapor.length; i++) {
            if ((new Date(ilk2)-new Date(genelRapor[i].tarih))>=0&& (new Date(genelRapor[i].tarih)-new Date(ilk))>=0) {
                if (genelRapor[i].durum == "teslim edildi") {
                    gunlukKazanc[0] += Number(genelRapor[i].toplamUcret);
                    gunlukKazanc[1] += Number(genelRapor[i].parcaMaliyeti);
                    gunlukKazanc[2] += Number(genelRapor[i].iscilik);
                    let rapor = document.getElementsByClassName("rapor");
                    for (let i = 0; i < rapor.length; i++) {
                        rapor[i].innerText = gunlukKazanc[i];
                    }
                }
            if ((Tarih(genelRapor[i].tarih) + " " + genelRapor[i].adSoyad + " " + genelRapor[i].plaka + " " + genelRapor[i].isTanimi + " " + genelRapor[i].sikayet + " " + genelRapor[i].iscilik + " " + genelRapor[i].kullanilanParcalar + " " + genelRapor[i].parcaMaliyeti + " " + genelRapor[i].toplamUcret).toLowerCase().includes(search.value.toLowerCase())) {
    
                let tr = document.createElement("tr");
    
                tr.innerHTML = '<td>' + Tarih(genelRapor[i].tarih) + '</td><td>' + genelRapor[i].adSoyad + '</td><td>' + genelRapor[i].plaka + '</td><td>' + genelRapor[i].isTanimi + '</td><td>' + genelRapor[i].sikayet + '</td><td>' + genelRapor[i].iscilik + '<i style="font-size: 17px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i></td><td class="kullanilanParcalar">' + genelRapor[i].kullanilanParcalar + '...</td><td>' + genelRapor[i].parcaMaliyeti + '</td><td>' + genelRapor[i].toplamUcret + '</td>'
    
                //   tr.onclick = function () {
                //   musteriyeTikla(i);
                //   }
    
                document.getElementById("table").appendChild(tr);
            }
    
        }
    }



})



// console.log(baslangicTarih+" "+bitisTarih);
console.log(genelRapor);
search.addEventListener("input", function () {
    console.log(5);
    console.log(search.value);
    let allTr = document.querySelectorAll("#table tr");
    for (let a = allTr.length - 1; a >= 2; a--) {
        allTr[a].remove()
    }

    for (let i = 0; i < genelRapor.length; i++) {



        if ((Tarih(genelRapor[i].tarih) + " " + genelRapor[i].adSoyad + " " + genelRapor[i].plaka + " " + genelRapor[i].isTanimi + " " + genelRapor[i].sikayet + " " + genelRapor[i].iscilik + " " + genelRapor[i].kullanilanParcalar + " " + genelRapor[i].parcaMaliyeti + " " + genelRapor[i].toplamUcret).toLowerCase().includes(search.value.toLowerCase())) {

            let tr = document.createElement("tr");

            tr.innerHTML = '<td>' + Tarih(genelRapor[i].tarih) + '</td><td>' + genelRapor[i].adSoyad + '</td><td>' + genelRapor[i].plaka + '</td><td>' + genelRapor[i].isTanimi + '</td><td>' + genelRapor[i].sikayet + '</td><td>' + genelRapor[i].iscilik + '<i style="font-size: 17px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i></td><td class="kullanilanParcalar">' + genelRapor[i].kullanilanParcalar + '...</td><td>' + genelRapor[i].parcaMaliyeti + '</td><td>' + genelRapor[i].toplamUcret + '</td>'

            //   tr.onclick = function () {
            //   musteriyeTikla(i);
            //   }

            document.getElementById("table").appendChild(tr);



        }

    }

})

