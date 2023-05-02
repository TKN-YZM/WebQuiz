function Soru(soruMetni, soruCevaplar, dogruCevap) {
    this.soruMetni = soruMetni;
    this.soruCevaplar = soruCevaplar;
    this.dogruCevap = dogruCevap;
  }
  
  Soru.prototype.cevabKontrol = function (cevap) {
    return cevap === this.dogruCevap;
  };
  
  let sorular = [
    new Soru(
      "Akıllı cihazların beyni olarak isimlendirilen elektornik bileşenin ismi nedir",
      { a: "entegre", b: "RAM", c: "İşlemci" },
      "c"
    ),
    new Soru(
      "1947 yılında icat edilen ve elektornikte bir devrime yol açan, işlemncilerde binlerce tane bulunan elektronik parçanın ismi",
      { a: "Led", b: "Transistör", c: "Entegre" },
      "b"
    ),
    new Soru("Hangisi bir programlama dili değildir", { a: "Java", b: "Dart", c: "Html",d:"C++" }, "c"),
 
  ];