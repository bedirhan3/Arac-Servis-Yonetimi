let search = document.getElementById("search");
let musteriAdSoyad = [];
let aracIDleri = [];
document.getElementById("pop-up").style.display = "none";
fetch('http://localhost:3000/musteriListele')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            musteriAdSoyad.push({ key: data[i].idmusteriler, value: data[i].isim + " " + data[i].soyisim })

        }
    })
fetch('http://localhost:3000/aracListele')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let musteriIsimSoyisim;
        let tablo = document.getElementById("table");
        for (let i = 0; i < data.length; i++) {
            for (let a = 0; a < musteriAdSoyad.length; a++) {
                if (data[i].idMusteri == musteriAdSoyad[a].key) {
                    musteriIsimSoyisim = musteriAdSoyad[a].value
                    break;
                }
            }
            let tr = document.createElement("tr");
            tr.innerHTML = '<td>' + data[i].plaka + '</td><td>' + data[i].MarkaModel + '</td><td>' + data[i].SaseNumarasi + '</td><td>' + data[i].GelisKm + '</td><td>' + musteriIsimSoyisim + '</td>'
            aracIDleri.push(data[i].idaraclar);

            tr.onclick = function () {
                musteriyeTikla(i);
            }
            tablo.appendChild(tr);
        }

        search.addEventListener("keyup", function (params) {
            console.log(params);
            aracIDleri = [];
            let allTr = document.querySelectorAll("tr");
            for (let i = 2; i < allTr.length; i++) {
                allTr[i].parentNode.removeChild(allTr[i])
            }
            let ii = 0;
            for (let i = 0; i < data.length; i++) {
                for (let a = 0; a < musteriAdSoyad.length; a++) {
                    if (data[i].idMusteri == musteriAdSoyad[a].key) {
                        musteriIsimSoyisim = musteriAdSoyad[a].value
                        break;
                    }
                }
                if (data[i].plaka.toUpperCase().includes(search.value.toUpperCase()) || (data[i].plaka.toUpperCase() + " " + data[i].MarkaModel.toUpperCase()).includes(search.value.toUpperCase()) || data[i].MarkaModel.toUpperCase().includes(search.value.toUpperCase()) || data[i].SaseNumarasi.toUpperCase().includes(search.value.toUpperCase()) || musteriIsimSoyisim.toUpperCase().includes(search.value.toUpperCase())) {
                    let tr = document.createElement("tr");
                    tr.innerHTML = '<td>' + data[i].plaka + '</td><td>' + data[i].MarkaModel + '</td><td>' + data[i].SaseNumarasi + '</td><td>' + data[i].GelisKm + '</td><td>' + musteriIsimSoyisim + '</td>'
                    tablo.appendChild(tr);
                    aracIDleri.push(data[i].idaraclar);
                    tr.addEventListener("click", (function (index) {
                        return function () {
                            musteriyeTikla(index);
                        };
                    })(ii));
                    ii++;
                }
            }
        })
    })

document.getElementsByClassName("input")[0].addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z0-9ğİÇçşŞıüÜöÖĞ]/g, '');
});
document.getElementsByClassName("input")[1].addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZğİÇçşŞ ıüÜöÖĞ0-9]/g, '');
});
document.getElementsByClassName("input")[2].addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZğİÇçşŞıüÜöÖĞ]/g, '');
});
document.getElementsByClassName("input")[3].addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

let idArac;
let bilgiler = document.getElementsByClassName("bilgiler");
let duzenLeButon = document.querySelectorAll(".fa-solid.fa-pen-to-square");
let input = document.getElementsByClassName("input")
for (let i = 0; i < input.length; i++) {
    input[i].style.display = "none";
}
for (let i = 0; i < 4; i++) {
    input[i].addEventListener("keydown", function (params) {
        if (params.key == "Enter") {
            duzenle(i);
        }
    })
}
function musteriyeTikla(no) {
    console.log("tıklandı" + no);
    console.log("arac idsi: " + aracIDleri[no]);

        //degisiklik kaydet buton widt 239


    idArac = aracIDleri[no];
    let numara = (no * 5) + 1;
    document.querySelector("#pop-up").style.display = "";

    bilgiler[0].innerText = document.querySelectorAll("td")[numara].innerText;
    bilgiler[1].innerText = document.querySelectorAll("td")[numara + 1].innerText;
    bilgiler[2].innerText = document.querySelectorAll("td")[numara + 2].innerText;
    bilgiler[3].innerText = document.querySelectorAll("td")[numara + 3].innerText + " KM";
    console.log();

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

    for (let i = 0; i < 4; i++) {
        input[i].style.display = "none";
        bilgiler[i].style.display = "inline-block";
        duzenLeButon[i].className = "fa-solid fa-pen-to-square"        
    }

    console.log(document.querySelector("#pop-up").style.display);
    document.querySelector("#pop-up").style.display = "none";

}

document.getElementById("degisikleriKaydet").addEventListener("click",function () {

    fetch('http://localhost:3000/aracGuncelle', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idArac,
            plaka: bilgiler[0].innerText.toUpperCase(),
            MarkaModel: bilgiler[1].innerText,
            SaseNumarasi: bilgiler[2].innerText.toUpperCase(),
            GelisKm: bilgiler[3].innerText.split(" ")[0]
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












