let gunlukKazanc = [0,0,0];

function Tarih() {
    let date = new Date();

    let yıl = date.getFullYear();
    let ay = String(date.getMonth() + 1).padStart(2, '0');
    let gün = String(date.getDate()).padStart(2, '0');

    return `${yıl}-${ay}-${gün}`;
}
console.log(Tarih());

const fetch1 = fetch('http://localhost:3000/aracListele').then(response => response.json());
const fetch2 = fetch('http://localhost:3000/isEmriListele').then(response => response.json());
const fetch3 = fetch('http://localhost:3000/musteriListele').then(response => response.json());
const fetch4 = fetch('http://localhost:3000/raporListele').then(response => response.json());

Promise.all([fetch1, fetch2, fetch3, fetch4])
    .then(results => {
        console.log('arac listele: a', results[0]);
        console.log('is emri listle: i', results[1]);
        console.log('musteri listele: b', results[2]);
        console.log('rapor listele: j', results[3]);

        for (let j = 0; j < results[3].length; j++) {
            console.log(Tarih() +" "+ results[3][j].tarih.split("T")[0]);
            if (Tarih() == results[3][j].tarih.split(" ")[0]) {

                for (let i = 0; i < results[1].length; i++) {
                    if(results[3][j].isEmriID==results[1][i].idisEmirleri){
                    for (let a = 0; a < results[0].length; a++) {

                        if (results[1][i].idaraclar == results[0][a].idaraclar) {
                            for (let b = 0; b < results[2].length; b++) {
                                if (results[0][a].idMusteri == results[2][b].idmusteriler) {
                                    let tr = document.createElement("tr");

                                    tr.innerHTML = '<td>'+results[3][j].tarih.split(" ")[1]+'</td> <td>'+results[1][i].idisEmirleri+'</td><td>'+results[2][b].isim+" "+results[2][b].soyisim+'</td><td>'+results[0][a].plaka+'</td><td>'+results[1][i].isTanimi+'</td><td>'+results[1][i].sikayet+'</td><td>'+results[3][j].durum+'</td><td>'+results[1][i].iscilik+'<i style="font-size: 17px; margin-left: 3px;" class="fa-solid fa-turkish-lira-sign"></i></td><td class="kullanilanParcalar">'+results[1][i].stok.split(",")[1]+'...</td><td>'+results[1][i].stok.split(",")[0]+'</td><td>'+(Number(results[1][i].stok.split(",")[0])+Number(results[1][i].iscilik))+'</td>'

                                    tr.onclick = function () {
                                        musteriyeTikla(i);
                                    }
                                    document.getElementById("table").appendChild(tr);

                                    // gunlukRaporlar.push({
                                    //     isEmriID: results[1][i].idisEmirleri,
                                    //     aracSahibi: results[2][b].isim + " " + results[2][b].soyisim,
                                    //     aracPlakası: results[0][a].plaka,
                                    //     isTanimi: results[1][i].isTanimi,
                                    //     sikayet: results[1][i].sikayet,
                                    //     iscilikUcreti: results[1][i].iscilik,
                                    //     kullanilanParcalar




                                    // })


                                    if (results[3][j].durum=="teslim edildi") {
                                        gunlukKazanc[0]+=(Number(results[1][i].stok.split(",")[0])+Number(results[1][i].iscilik));
                                        gunlukKazanc[1]+=Number(results[1][i].stok.split(",")[0]);
                                        gunlukKazanc[2]+=Number(results[1][i].iscilik);
                                        let rapor=document.getElementsByClassName("rapor");
                                        for (let i = 0; i < rapor.length; i++) {
                                            rapor[i].innerText=gunlukKazanc[i];
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

    console.log(gunlukKazanc);


    

