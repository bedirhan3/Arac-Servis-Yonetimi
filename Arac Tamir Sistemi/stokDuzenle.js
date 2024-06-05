let search = document.getElementById("search");
let stokidleri=[]
fetch('http://localhost:3000/stokListele')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let tablo = document.getElementById("table");
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            tr.innerHTML = '<td>' + data[i].malzeme + '</td><td>' + data[i].fiyat + '₺</td><td>' + data[i].adet + '</td>';
            stokidleri.push(data[i].idstokListesi);
            tr.onclick = function () {
                stokTikla(i);
            }
            tablo.appendChild(tr);
        }

        document.addEventListener("keyup", function (params) {
            console.log(params);
            stokidleri=[];
            let allTr = document.querySelectorAll("tr");
            for (let i = 2; i < allTr.length; i++) {
                allTr[i].parentNode.removeChild(allTr[i])
            }
            let ii=0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].malzeme.toUpperCase().includes(search.value.toUpperCase()) || data[i].adet.toString().includes(search.value.toUpperCase()) || data[i].fiyat.toString().includes(search.value.toUpperCase())) {
                    let tr = document.createElement("tr");
                    tr.innerHTML = '<td>' + data[i].malzeme + '</td><td>' + data[i].fiyat + '₺</td><td>' + data[i].adet + '</td>'
                    stokidleri.push(data[i].idstokListesi);
                    tablo.appendChild(tr);
                    tr.addEventListener("click", (function(index) {
                        return function() {
                            stokTikla(index);
                        };
                    })(ii));
                    ii++;
                }
            }
        })
    })

    document.getElementsByClassName("input")[0].addEventListener("input", function() {
        this.value = this.value.replace(/[^a-zA-Z0-9ğİÇçşŞ ıüÜöÖĞ]/g, ''); 
        });
        document.getElementsByClassName("input")[1].addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, ''); 
        });
        document.getElementsByClassName("input")[2].addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, ''); 
        });

        document.getElementById("pop-up").style.display="none";

        let idStok;
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
function stokTikla(no) {
    // console.log("tıklandı" + no);
    // popup464 buton 239px
    console.log("stok id: "+stokidleri[no]);
    console.log(stokidleri);
    idStok=stokidleri[no];
    let numara=( no*3)+1;
    document.querySelector("#pop-up").style.display="";

    bilgiler[0].innerText=document.querySelectorAll("td")[numara].innerText;
    bilgiler[1].innerText=document.querySelectorAll("td")[numara+1].innerText;
    bilgiler[2].innerText=document.querySelectorAll("td")[numara+2].innerText;
    console.log();

}



function duzenle(params) {

    console.log(params);
    if (input[params].style.display == "none") {
        input[params].style.display = "inline-block";
        genislik = getComputedStyle(bilgiler[params]).width
        console.log(genislik.split("p"));
        if (Number(genislik.split("p")[0]) < 130) {
            input[params].style.width = "130px";
        }
        else {
            input[params].style.width = genislik;
        }
        bilgiler[params].style.display = "none";
        duzenLeButon[params].className="fa-solid fa-check"
        input[params].value=bilgiler[params].innerText
        input[params].select();
    }
    else {
        bilgiler[params].innerText=input[params].value;
        if (params==1&&bilgiler[params].innerText[bilgiler[params].innerText.length-1]!="₺") {
            bilgiler[params].innerText+="₺"
        }
        input[params].style.display = "none";
        bilgiler[params].style.display = "inline-block";
        duzenLeButon[params].className="fa-solid fa-pen-to-square"

    }
}





function carpi() {
    console.log(bilgiler[1].innerText.split("₺")[0]);
    document.querySelector("#pop-up").style.display="none";

    for (let i = 0; i < 3; i++) {
        input[i].style.display = "none";
        bilgiler[i].style.display = "inline-block";
        duzenLeButon[i].className="fa-solid fa-pen-to-square"        
    }

}


document.getElementById("degisikleriKaydet").addEventListener("click",function () {

    fetch('http://localhost:3000/stokGuncelle', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idStok,
            malzeme: bilgiler[0].innerText.charAt(0).toUpperCase() + bilgiler[0].innerText.slice(1).toLowerCase(),
            fiyat: bilgiler[1].innerText.split("₺")[0],
            adet: bilgiler[2].innerText
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Hata:', data.error);
            alert('Güncelleme sırasında bir hata oluştu.');
        } else {
            console.log(data);
            alert('Malzeme başarıyla güncellendi.');
            location.reload();
        }
    });
    
})





