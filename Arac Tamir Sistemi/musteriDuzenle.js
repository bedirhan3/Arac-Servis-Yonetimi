let search = document.getElementById("search");
let musteridleri=[];
fetch('http://localhost:3000/musteriListele')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Gelen müşteri verilerini konsola yazdırın

        let tablo = document.getElementById("table");
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            tr.innerHTML = '<td>' + data[i].isim + '</td><td>' + data[i].soyisim + '</td><td>' + data[i].telefon + '</td><td>' + data[i].toplamOdenen + '</td>'
            musteridleri.push(data[i].idmusteriler);
            tr.onclick = function () {
                musteriyeTikla(i);
            }
            tablo.appendChild(tr);
        }

        document.addEventListener("keyup", function (params) {
            console.log(params);
            musteridleri=[];
            let allTr = document.querySelectorAll("tr");
            for (let i = 2; i < allTr.length; i++) {
                allTr[i].parentNode.removeChild(allTr[i])
            }
            let ii=0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].isim.toUpperCase().includes(search.value.toUpperCase()) || (data[i].isim.toUpperCase() + " " + data[i].soyisim.toUpperCase()).includes(search.value.toUpperCase()) || data[i].soyisim.toUpperCase().includes(search.value.toUpperCase()) || data[i].telefon.toUpperCase().includes(search.value.toUpperCase())) {
                    
                    let tr = document.createElement("tr");
                    tr.innerHTML = '<td>' + data[i].isim + '</td><td>' + data[i].soyisim + '</td><td>' + data[i].telefon + '</td><td>' + data[i].toplamOdenen + '</td>';
                    musteridleri.push(data[i].idmusteriler);
                    tablo.appendChild(tr);
                    tr.addEventListener("click", (function(index) {
                        return function() {
                            musteriyeTikla(index);
                        };
                    })(ii));
                    ii++;
                }
            }
        })
    })

    document.getElementsByClassName("input")[0].addEventListener("input", function() {
this.value = this.value.replace(/[^a-zA-ZğİÇçşŞ ıüÜöÖĞ]/g, ''); 
});
document.getElementsByClassName("input")[1].addEventListener("input", function() {
this.value = this.value.replace(/[^a-zA-ZğİÇçşŞıüÜöÖĞ]/g, ''); 
});
document.getElementsByClassName("input")[2].addEventListener("input", function() {
this.value = this.value.replace(/[^0-9]/g, ''); 
});



document.getElementById("pop-up").style.display="none";
let idMusteri;
let bilgiler = document.getElementsByClassName("bilgiler");
let duzenLeButon = document.querySelectorAll(".fa-solid.fa-pen-to-square");
let input = document.getElementsByClassName("input")
for (let i = 0; i < input.length; i++) {
    input[i].style.display = "none";
}
for (let i = 0; i < 3; i++) {
input[i].addEventListener("keydown",function (params) {
    if (params.key=="Enter") {
        duzenle(i);
    }
})    
}
function musteriyeTikla(no) {
    // console.log("tıklandı" + no);
    // popup464 buton 239px
    console.log("müşteri idsi: "+musteridleri[no]);
    idMusteri=musteridleri[no];
    let numara=( no*4)+1;
    document.querySelector("#pop-up").style.display="";

    bilgiler[0].innerText=document.querySelectorAll("td")[numara].innerText;
    bilgiler[1].innerText=document.querySelectorAll("td")[numara+1].innerText;
    bilgiler[2].innerText=document.querySelectorAll("td")[numara+2].innerText.slice(1);
    console.log();

}



function duzenle(params) {
    console.log(bilgiler);
    console.log(input);
    console.log(params);
    if (input[params].style.display == "none") {
        input[params].style.display = "inline-block";
        bilgiler[params].style.display = "none";
        duzenLeButon[params].className="fa-solid fa-check"
        input[params].value=bilgiler[params].innerText
        input[params].select();
    }
    else {
        bilgiler[params].innerText=input[params].value;
        input[params].style.display = "none";
        bilgiler[params].style.display = "inline-block";
        duzenLeButon[params].className="fa-solid fa-pen-to-square"

    }
}


function carpi() {
    console.log(document.querySelector("#pop-up").style.display);
    document.querySelector("#pop-up").style.display="none";
}

document.getElementById("degisikleriKaydet").addEventListener("click",function () {

    fetch('http://localhost:3000/musteriGuncelle', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idMusteri,
            isim: bilgiler[0].innerText.charAt(0).toUpperCase() + bilgiler[0].innerText.slice(1).toLowerCase(),
            soyisim: bilgiler[1].innerText.charAt(0).toUpperCase() + bilgiler[1].innerText.slice(1).toLowerCase(),
            telefon: "+" + bilgiler[2].innerText
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Hata:', data.error);
            alert('Güncelleme sırasında bir hata oluştu.');
        } else {
            console.log(data);
            alert('Müşteri başarıyla güncellendi.');
            location.reload();
        }
    });
    
})