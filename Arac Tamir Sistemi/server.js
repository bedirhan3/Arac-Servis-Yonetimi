const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var mysql = require('mysql');


const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "otomotiv"
});

// müşteri ekle
app.post('/musteriler', (req, res) => {
  const isim = req.body.isim;
  const soyisim = req.body.soyisim;
  const telefon = req.body.telefon;
  con.connect(function () {
    var sql = "INSERT INTO `otomotiv`.`musteriler` (`isim`, `soyisim`, `telefon`, `toplamOdenen`) VALUES (?,?,?,?)";
    con.query(sql, [isim, soyisim, telefon, 0]);
  });
});
//musteri guncelle
app.put('/musteriGuncelle', (req, res) => {
  const id = req.body.id;
  const isim = req.body.isim;
  const soyisim = req.body.soyisim;
  const telefon = req.body.telefon;

  const sql = "UPDATE musteriler SET isim = ?, soyisim = ?, telefon = ? WHERE idmusteriler = ?";
  con.query(sql, [isim, soyisim, telefon, id], function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json({ message: 'Müşteri güncellendi', results });
  });
});

//müşteri toplamOdenne güncelle
app.put('/musteriToplamOdenenGuncelle', (req, res) => {
  const id = req.body.id;
  const toplamOdenen = req.body.toplamOdenen;

  const sql = "UPDATE musteriler SET toplamOdenen = ? WHERE idmusteriler = ?";
  con.query(sql, [toplamOdenen, id], function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json({ message: 'Müşteri güncellendi', results });
  });
});


//musteri listele
app.get('/musteriListele', (req, res) => {
  let sql = 'SELECT * FROM musteriler';
  con.query(sql, function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
});
///////////////////////////////////////////////////////////////////////////////////////
//arac ekle
app.post('/araclar', (req, res) => {
  const plaka = req.body.plaka;
  const MarkaModel = req.body.MarkaModel;
  const SaseNumarasi = req.body.SaseNumarasi;
  const GelisKm = req.body.GelisKm;
  const idMusteri = req.body.idMusteri;
  con.connect(function () {
    var sql = "INSERT INTO `otomotiv`.`araclar` (`plaka`, `MarkaModel`, `SaseNumarasi`,`GelisKm`, `idMusteri`) VALUES (?,?,?,?,?)";
    con.query(sql, [plaka, MarkaModel, SaseNumarasi, GelisKm, idMusteri]);
  });
});

//arac Listele
app.get('/aracListele', (req, res) => {
  let sql = 'SELECT * FROM araclar';
  con.query(sql, function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
});

//arac Guncelle
app.put('/aracGuncelle', (req, res) => {
  const id = req.body.id;
  const plaka = req.body.plaka;
  const MarkaModel = req.body.MarkaModel;
  const SaseNumarasi = req.body.SaseNumarasi;
  const GelisKm = req.body.GelisKm;

  const sql = "UPDATE araclar SET plaka = ?, MarkaModel = ?, SaseNumarasi = ?, GelisKm = ? WHERE idaraclar = ?";
  con.query(sql, [plaka, MarkaModel, SaseNumarasi, GelisKm, id], function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json({ message: 'Müşteri güncellendi', results });
  });
});




///////////////////////////////////////////////////
//stok listele
app.get('/stokListele', (req, res) => {
  let sql = 'SELECT * FROM stokListesi';
  con.query(sql, function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
});

//stok guncelle
app.put('/stokGuncelle', (req, res) => {
  const id = req.body.id;
  const malzeme = req.body.malzeme;
  const adet = req.body.adet;
  const fiyat = req.body.fiyat;
  console.log(id);
  console.log(malzeme);
  console.log(adet);
  console.log(fiyat);

  const sql = "UPDATE stokListesi SET malzeme = ?, adet = ?, fiyat = ? WHERE idstokListesi = ?";
  con.query(sql, [malzeme, adet, fiyat, id], function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json({ message: 'Müşteri güncellendi', results });
  });
});

//malzeme ekle
app.post('/malzemeler', (req, res) => {
  const malzeme = req.body.malzeme;
  const adet = req.body.adet;
  const fiyat = req.body.fiyat;
  con.connect(function () {
    var sql = "INSERT INTO `otomotiv`.`stokListesi` (`malzeme`, `adet`, `fiyat`) VALUES (?,?,?)";
    con.query(sql, [malzeme, adet, fiyat]);
  });
});



//////////////////////////////////////////////////
//iş emri ekle
app.post('/isEmirleri', (req, res) => {
  const isTanimi = req.body.isTanimi;
  const sikayet = req.body.sikayet;
  const iscilik = req.body.iscilik;
  const stok = req.body.stok;
  const id = req.body.id;
  con.connect(function () {
    var sql = "INSERT INTO `otomotiv`.`isEmirleri` (`isTanimi`, `sikayet`, `durum`, `iscilik`, `tarih`, `stok`, `idaraclar`) VALUES (?,?,?,?,?,?,?)";
    con.query(sql, [isTanimi, sikayet, "sırada", iscilik, anlikTarih(), stok, id]);
  });
});

//iş emri gör

app.get('/isEmriListele', (req, res) => {
  let sql = 'SELECT * FROM isEmirleri';
  con.query(sql, function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
});

//iş emri güncelle
app.put('/isEmriGuncelle', (req, res) => {
  const id = req.body.id;
  const isTanimi = req.body.isTanimi;
  const sikayet = req.body.sikayet;
  const iscilik = req.body.iscilik;

  const sql = "UPDATE isEmirleri SET isTanimi = ?, sikayet = ?, iscilik = ? WHERE idisEmirleri = ?";
  con.query(sql, [isTanimi, sikayet, iscilik, id], function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json({ message: 'Müşteri güncellendi', results });
  });
});

// iş emri durum güncelle
app.put('/isEmriDurumGuncelle', (req, res) => {
  const id = req.body.id;
  const durum = req.body.durum;
console.log(5);
  const sql = "UPDATE isEmirleri SET durum = ? WHERE idisEmirleri = ?";
  con.query(sql, [durum, id], function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json({ message: 'Müşteri güncellendi', results });
  });
});



///////////////////////////////////////////////////
//rapor ekle
app.post('/raporEkle', (req, res) => {
  const isEmriID = req.body.isEmriID;
  const durum=req.body.durum;
  con.connect(function () {
    var sql = "INSERT INTO `otomotiv`.`raporlar` (`tarih`, `isEmriID`, `durum`) VALUES (?,?,?)";
    con.query(sql, [anlikTarih(), isEmriID, durum]);
  });
});

//rapor listele
app.get('/raporListele', (req, res) => {
  let sql = 'SELECT * FROM raporlar';
  con.query(sql, function (err, results) {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
});




function anlikTarih() {
  let anlık = new Date();

  let yıl = anlık.getFullYear();
  let ay = String(anlık.getMonth() + 1).padStart(2, '0');
  let gün = String(anlık.getDate()).padStart(2, '0');
  let saat = String(anlık.getHours()).padStart(2, '0');
  let dk = String(anlık.getMinutes()).padStart(2, '0');
  let saniye = String(anlık.getSeconds()).padStart(2, '0');

  return `${yıl}-${ay}-${gün} ${saat}:${dk}:${saniye}`;
}
// Sunucuyu başlatma
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
