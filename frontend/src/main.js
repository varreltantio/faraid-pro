// Variabel untuk menyimpan jumlah harta dan sisa, serta variabel untuk status kunci (LOCK)
var iJthSuami = 0, iJthIstri = 0, iJthBapak = 0, iJthIbu = 0, iJthAnakLaki = 0, iJthAnakPerempuan = 0, iJthCucuLaki = 0, iJthCucuPerempuan = 0, iJthKakek = 0, iJthNenekBapak = 0, iJthNenekIbu = 0, iJthNenekKakek = 0, iJthSaudaraKandung = 0, iJthSaudariKandung = 0, iJthSaudaraSebapak = 0, iJthSaudaraSeibu = 0, iJthSaudariSebapak = 0, iJthSaudariSeibu = 0, iJthPutraSaudaraKandung = 0, iJthPutraSaudaraSebapak = 0, iJthPamanKandung = 0, iJthPamanSebapak = 0, iJthPutraPamanKandung = 0, iJthPutraPamanSebapak = 0, iJthPriaMerdekakan = 0, iJthWanitaMerdekakan = 0, iHarta, iSisa;
var LOCK = 0;
var _AR = new Array();
_AR[0] = "hidden";
_AR[1] = "visible";

// Fungsi untuk mengubah visibilitas elemen berdasarkan nilai _v
function doIt(_v) {
  LOCK = _v;
  document.getElementById("result").style.visibility = _AR[_v];
}

// Fungsi lain untuk mengubah visibilitas elemen berdasarkan nilai _v
function doThis(_v) {
  LOCK = _v;
  document.getElementById("result").style.visibility = _AR[_v];
}

// Fungsi untuk menambahkan titik sebagai pemisah ribuan pada bilangan
function tandaPemisahTitik(b) {
  var _minus = false;
  if (b < 0)
    _minus = true;
  b = b.toString();
  b = b.replace(".", "");
  b = b.replace("-", "");
  var c = "";
  var panjang = b.length;
  var j = 0;
  for (var i = panjang; i > 0; i--) {
    j = j + 1;
    if (((j % 3) == 1) && (j != 1)) {
      c = b.substr(i - 1, 1) + "." + c;
    } else {
      c = b.substr(i - 1, 1) + c;
    }
  }
  if (_minus)
    c = "-" + c;
  return c;
}

// Fungsi untuk menghapus pemisah titik pada bilangan
function bersihPemisah(ini) {
  var a = ini.toString().replace(".", "");
  return a;
}

export function fnHitung() {
  const getValue = (id) => {
    var element = document.getElementById(id);
    if (typeof element !== 'undefined' && element !== null) {
      return bersihPemisah(element.value);
    } else {
      return 0;
    }
  };

  const iTarikah = bersihPemisah(bersihPemisah(bersihPemisah(bersihPemisah(getValue('harta')))));
  const iHak1 = bersihPemisah(bersihPemisah(bersihPemisah(bersihPemisah(getValue('hak1')))));
  const iHak2 = bersihPemisah(bersihPemisah(bersihPemisah(bersihPemisah(getValue('hak2')))));
  const iHak3 = bersihPemisah(bersihPemisah(bersihPemisah(bersihPemisah(getValue('hak3')))));
  const iHak4 = bersihPemisah(bersihPemisah(bersihPemisah(bersihPemisah(getValue('hak4')))));
  const iHarta = bersihPemisah(bersihPemisah(bersihPemisah(bersihPemisah(iTarikah - iHak1 - iHak2 - iHak3 - iHak4))));

  const iJumlahBapak = getValue('bapak');
  const iJumlahIbu = getValue('ibu');
  const iJumlahSuami = getValue('suami');
  const iJumlahIstri = getValue('istri');
  const iJumlahAnakLaki = getValue('putra');
  const iJumlahAnakPerempuan = getValue('putri');
  const iJumlahCucuLaki = getValue('cucuLk');
  const iJumlahCucuPerempuan = getValue('cucuPr');
  const iJumlahKakek = getValue('kakek');
  const iJumlahNenekBapak = getValue('nenekB');
  const iJumlahNenekIbu = getValue('nenekI');
  const iJumlahNenekKakek = getValue('nenekK');
  const iJumlahSaudaraKandung = getValue('saudaraK');
  const iJumlahSaudariKandung = getValue('saudariK');
  const iJumlahSaudaraSebapak = getValue('saudaraB');
  const iJumlahSaudaraSeibu = getValue('saudaraI');
  const iJumlahSaudariSebapak = getValue('saudariB');
  const iJumlahSaudariSeibu = getValue('saudariI');
  const iJumlahPutraSaudaraKandung = getValue('putraSK');
  const iJumlahPutraSaudaraSebapak = getValue('putraSB');
  const iJumlahPamanKandung = getValue('pamanK');
  const iJumlahPamanSebapak = getValue('pamanB');
  const iJumlahPutraPamanKandung = getValue('putraPK');
  const iJumlahPutraPamanSebapak = getValue('putraPB');
  const iJumlahPriaMerdekakan = getValue('pria');
  const iJumlahWanitaMerdekakan = getValue('wanita');


  var resultToPrint = "Harta yang Siap Dibagikan : " + tandaPemisahTitik(iHarta) + "<br /><br />";

  if (document.getElementById('harta').value == "") {
    alert("Tarikah Harus Diisi");
    document.getElementById('harta').focus();
    return false;
  }
  if (document.getElementById('bapak').value == "" && document.getElementById('ibu').value == "" && document.getElementById('putra').value == "" && document.getElementById('putri').value == "" && document.getElementById('suami').value == "" && document.getElementById('istri').value == "" && document.getElementById('cucuLk').value == "" && document.getElementById('cucuPr').value == "" && document.getElementById('kakek').value == "" && document.getElementById('nenekB').value == "" && document.getElementById('nenekI').value == "" && document.getElementById('nenekK').value == "" && document.getElementById('saudaraK').value == "" && document.getElementById('saudariK').value == "" && document.getElementById('saudaraB').value == "" && document.getElementById('saudariB').value == "" && document.getElementById('saudaraI').value == "" && document.getElementById('saudariI').value == "" && document.getElementById('putraSK').value == "" && document.getElementById('putraSB').value == "" && document.getElementById('pamanK').value == "" && document.getElementById('pamanB').value == "" && document.getElementById('putraPK').value == "" && document.getElementById('putraPB').value == "" && document.getElementById('pria').value == "" && document.getElementById('wanita').value == "") {
    alert("Ahli waris masih kosong, Silahkan diisi");
    document.getElementById('putra').focus();
    return false;
  }
  if (iHak4 > bersihPemisah(iTarikah) / 3) {
    alert("Wasiat Tidak Boleh lebih dari 1/3 Tarikah. Isi form wasiat lagi");
    document.getElementById('hak4').focus();
    document.getElementById('hak4').value = "";
    return false;
  }
  if (iHarta <= 0) {
    alert("Harta Irst <= 0, Penghitungan Waris tidak bisa dilanjutkan. Ulangi dari awal");
    document.getElementById('hak1').value = "";
    document.getElementById('hak2').value = "";
    document.getElementById('hak3').value = "";
    document.getElementById('hak4').value = "";
    document.getElementById('hak1').focus();
    return false;
  }
  if (iJumlahBapak > 1) {
    alert("Bapak hanya boleh ada satu (1)");
    document.getElementById('bapak').focus();
    return false;
  }
  if (iJumlahSuami > 1) {
    alert("Suami hanya boleh dipilih sekali (1)");
    document.getElementById('suami').focus();
    return false;
  }
  if (iJumlahIbu > 1) {
    alert("Ibu hanya boleh dipilih sekali (1)");
    document.getElementById('ibu').focus();
    return false;
  }
  if (iJumlahKakek > 1) {
    alert("Kakek hanya boleh dipilih sekali (1)");
    document.getElementById('kakek').focus();
    return false;
  }
  if (iJumlahNenekBapak > 1) {
    alert("Nenek(Ibunya Bapak) hanya boleh dipilih sekali (1)");
    document.getElementById('nenekB').focus();
    return false;
  }
  if (iJumlahNenekIbu > 1) {
    alert("Nenek(Ibunya Ibu) hanya boleh dipilih sekali (1)");
    document.getElementById('nenekI').focus();
    return false;
  }
  if (iJumlahNenekKakek > 1) {
    alert("Nenek(Ibunya Kakek) hanya boleh dipilih sekali (1)");
    document.getElementById('nenekK').focus();
    return false;
  }
  if (iJumlahPriaMerdekakan > 1) {
    alert("Pria yang memerdekakan budak hanya boleh dipilih sekali (1)");
    document.getElementById('pria').focus();
    return false;
  }
  if (iJumlahWanitaMerdekakan > 1) {
    alert("Wanita yang memerdekakan budak hanya boleh dipilih sekali (1)");
    document.getElementById('wanita').focus();
    return false;
  }
  if (iJumlahIstri > 4) {
    alert("Jumlah Istri tidak boleh lebih dari 4 dalam satu masa");
    document.getElementById('istri').focus();
    return false;
  }
  if ((iJumlahSuami == 1) && (iJumlahIstri > 0)) {
    alert("Siapa yang meninggal? Suami atau Istri?");
    document.getElementById('suami').focus();
    return false;
  } else {
    // Awal else 1
    doIt(1);
    doThis(1);
    if (iJumlahAnakLaki == 0 && iJumlahAnakPerempuan == 0) {
      // Masalah 'umariyatain
      if (iJumlahCucuLaki == 0 && iJumlahCucuPerempuan == 0) {
        if (iJumlahSuami == 1) {
          iJthSuami = Math.round(iHarta / 2);
          if (iJumlahIbu == 1) {
            iJthIbu = Math.round(iHarta / 6) * iJumlahIbu;
          }
          if (iJumlahIbu == 0) {
            if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0) {
              iJthNenekBapak = Math.round(iHarta / 6) * iJumlahNenekBapak;
            }
            if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1) {
              iJthNenekIbu = Math.round(iHarta / 6) * iJumlahNenekIbu;
            }
            if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1) {
              iJthNenekBapak = Math.round(iHarta / 12) * iJumlahNenekBapak;
              iJthNenekIbu = Math.round(iHarta / 12) * iJumlahNenekIbu;
            }
            if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
              iJthNenekKakek = Math.round(iHarta / 6) * iJumlahNenekKakek;
            }
          }
          if (iJumlahBapak > 0) {
            iJthBapak = Math.round(iHarta / 3);
            iSisa = iHarta - (iJthSuami + iJthIbu + iJthBapak + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
            iJthBapak = iJthBapak + iSisa * iJumlahBapak;
            iSisa = iHarta - (iJthSuami + iJthIbu + iJthBapak + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
            if (iJumlahSaudaraSeibu > 0)
              resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudaraKandung > 0)
              resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudariKandung > 0)
              resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudariSeibu > 0)
              resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudaraSebapak > 0)
              resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudariSebapak > 0)
              resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraSaudaraKandung > 0)
              resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraSaudaraSebapak > 0)
              resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPamanKandung > 0)
              resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPamanSebapak > 0)
              resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraPamanKandung > 0)
              resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraPamanSebapak > 0)
              resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPriaMerdekakan > 0)
              resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahWanitaMerdekakan > 0)
              resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
          }
          if (iJumlahBapak == 0) {
            if (iJumlahKakek == 1) {
              iJthKakek = Math.round(iHarta / 3) * iJumlahKakek;
              iSisa = iHarta - (iJthSuami + iJthIbu + iJthKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
              iJthKakek = iJthKakek + iSisa * iJumlahKakek;
              iSisa = iHarta - (iJthSuami + iJthIbu + iJthKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
              if (iJumlahSaudaraSeibu > 0)
                resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudariKandung > 0)
                resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudariSeibu > 0)
                resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudariSebapak > 0)
                resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPamanKandung > 0)
                resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPamanSebapak > 0)
                resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraPamanKandung > 0)
                resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraPamanSebapak > 0)
                resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPriaMerdekakan > 0)
                resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahWanitaMerdekakan > 0)
                resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
            }
            if (iJumlahKakek == 0) {
              if (iJumlahSaudaraSeibu == 1) {
                iJthSaudaraSeibu = Math.round(iHarta / 6);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                resultToPrint += "Jatah tiap Saudara Seibu (1/6) : " + tandaPemisahTitik(iJthSaudaraSeibu) + "<br />";
              }
              if (iJumlahSaudaraSeibu > 1) {
                iJthSaudaraSeibu = Math.round(iHarta / 3);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                resultToPrint += "Jatah tiap Saudara Seibu (1/3) : " + tandaPemisahTitik(iJthSaudaraSeibu / iJumlahSaudaraSeibu) + "<br />";
              }
              if (iJumlahSaudaraKandung > 0) {
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                if (iJumlahSaudariKandung == 0) {
                  iJthSaudaraKandung = Math.round(iSisa / iJumlahSaudaraKandung);
                }
                if (iJumlahSaudariKandung > 0) {
                  iJthSaudaraKandung = Math.round(iSisa / (iJumlahSaudaraKandung + iJumlahSaudariKandung));
                  iJthSaudariKandung = iJthSaudaraKandung;
                  resultToPrint += "Jatah tiap Saudari Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudariKandung) + "<br />";
                }
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraKandung * iJumlahSaudaraKandung + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudara Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudaraKandung) + "<br />";
                if (iJumlahSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahSaudariSebapak > 0)
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              }
              if (iJumlahSaudaraKandung == 0) {
                if (iJumlahSaudariKandung > 1) {
                  iJthSaudariKandung = Math.round((2 * iHarta / 3) / iJumlahSaudariKandung);
                  iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                  resultToPrint += "Jatah tiap Saudari Kandung (2/3) : " + tandaPemisahTitik(iJthSaudariKandung) + "<br />";
                  if (iJumlahSaudariSebapak > 0 && iJumlahSaudaraSebapak == 0) {
                    resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi 2 Saudari Kandung atau lebih)" + "<br />";
                  }
                }
                if (iJumlahSaudariKandung == 1 || iJumlahSaudariKandung == 0) {
                  iJthSaudariKandung = Math.round(iHarta / 2);
                  if (iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak == 1) {
                    iJthSaudariSebapak = Math.round(iHarta / 2);
                    resultToPrint += "Jatah tiap Saudari Sebapak (1/2) : " + tandaPemisahTitik(iJthSaudariSebapak / iJumlahSaudariSebapak) + "<br />";
                  }
                  if (iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak > 1) {
                    iJthSaudariSebapak = Math.round((2 * iHarta / 3) / iJumlahSaudariSebapak);
                    resultToPrint += "Jatah tiap Saudari Sebapak (2/3) : " + tandaPemisahTitik(iJthSaudariSebapak) + "<br />";
                  }
                  iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak);
                  if (iJumlahSaudariKandung == 1)
                    resultToPrint += "Jatah tiap Saudari Kandung (1/2) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                }
                if (iJumlahSaudaraSebapak > 0) {
                  iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                  iJthSaudaraSebapak = Math.round(iSisa / (iJumlahSaudaraSebapak + iJumlahSaudariSebapak));
                  iJthSaudariSebapak = iJthSaudaraSebapak;
                  iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraSebapak * iJumlahSaudaraSebapak + iJthSaudariSebapak * iJumlahSaudariSebapak);
                  resultToPrint += "Jatah tiap Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudaraSebapak) + "<br />";
                  if (iJumlahSaudariSebapak > 0)
                    resultToPrint += "Jatah tiap Saudari Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudariSebapak) + "<br />";
                  if (iJumlahPutraSaudaraKandung > 0)
                    resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPutraSaudaraSebapak > 0)
                    resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPamanKandung > 0)
                    resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPamanSebapak > 0)
                    resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPutraPamanKandung > 0)
                    resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPutraPamanSebapak > 0)
                    resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPriaMerdekakan > 0)
                    resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahWanitaMerdekakan > 0)
                    resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                }
                if (iJumlahSaudaraSebapak == 0) {
                  iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak);
                  if (iJumlahPutraSaudaraKandung > 0) {
                    iJthPutraSaudaraKandung = Math.round(iSisa / iJumlahPutraSaudaraKandung);
                    iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraSaudaraKandung * iJumlahPutraSaudaraKandung);
                    resultToPrint += "Jatah tiap Putra dari Saudara Sekandung (Sisa) : " + tandaPemisahTitik(iJthPutraSaudaraKandung) + "<br />";
                    if (iJumlahPutraSaudaraSebapak > 0)
                      resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPamanKandung > 0)
                      resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPamanSebapak > 0)
                      resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPutraPamanKandung > 0)
                      resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPutraPamanSebapak > 0)
                      resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPriaMerdekakan > 0)
                      resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahWanitaMerdekakan > 0)
                      resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                  }
                  if (iJumlahPutraSaudaraKandung == 0) {
                    iJthPutraSaudaraSebapak = Math.round(iSisa / iJumlahPutraSaudaraSebapak);
                    if (iJumlahPutraSaudaraSebapak > 0) {
                      iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraSaudaraSebapak * iJumlahPutraSaudaraSebapak);
                      resultToPrint += "Jatah tiap Putra dari Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthPutraSaudaraSebapak) + "<br />";
                      if (iJumlahPamanKandung > 0)
                        resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPamanSebapak > 0)
                        resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPutraPamanKandung > 0)
                        resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPutraPamanSebapak > 0)
                        resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPriaMerdekakan > 0)
                        resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahWanitaMerdekakan > 0)
                        resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                    }
                    if (iJumlahPutraSaudaraSebapak == 0) {
                      iJthPamanKandung = Math.round(iSisa / iJumlahPamanKandung);
                      if (iJumlahPamanKandung > 0) {
                        iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPamanKandung * iJumlahPamanKandung);
                        resultToPrint += "Jatah tiap Paman Sekandung (Sisa) : " + tandaPemisahTitik(iJthPamanKandung) + "<br />";
                        if (iJumlahPamanSebapak > 0)
                          resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahPutraPamanKandung > 0)
                          resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahPutraPamanSebapak > 0)
                          resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahPriaMerdekakan > 0)
                          resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahWanitaMerdekakan > 0)
                          resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                      }
                      if (iJumlahPamanKandung == 0) {
                        iJthPamanSebapak = Math.round(iSisa / iJumlahPamanSebapak);
                        if (iJumlahPamanSebapak > 0) {
                          iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPamanSebapak * iJumlahPamanSebapak);
                          resultToPrint += "Jatah tiap Paman Sebapak (Sisa) : " + tandaPemisahTitik(iJthPamanSebapak) + "<br />";
                          if (iJumlahPutraPamanKandung > 0)
                            resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                          if (iJumlahPutraPamanSebapak > 0)
                            resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                          if (iJumlahPriaMerdekakan > 0)
                            resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                          if (iJumlahWanitaMerdekakan > 0)
                            resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                        }
                        if (iJumlahPamanSebapak == 0) {
                          iJthPutraPamanKandung = Math.round(iSisa / iJumlahPutraPamanKandung);
                          if (iJumlahPutraPamanKandung > 0) {
                            iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraPamanKandung * iJumlahPutraPamanKandung);
                            resultToPrint += "Jatah tiap Putra dari Paman Sekandung (Sisa) : " + tandaPemisahTitik(iJthPutraPamanKandung) + "<br />";
                            if (iJumlahPutraPamanSebapak > 0)
                              resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Putra dari Paman Sekandung)" + "<br />";
                            if (iJumlahPriaMerdekakan > 0)
                              resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sekandung)" + "<br />";
                            if (iJumlahWanitaMerdekakan > 0)
                              resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sekandung)" + "<br />";
                          }
                          if (iJumlahPutraPamanKandung == 0) {
                            iJthPutraPamanSebapak = Math.round(iSisa / iJumlahPutraPamanSebapak);
                            if (iJumlahPutraPamanSebapak > 0) {
                              iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraPamanSebapak * iJumlahPutraPamanSebapak);
                              resultToPrint += "Jatah tiap Putra dari Paman Sebapak (Sisa) : " + tandaPemisahTitik(iJthPutraPamanSebapak) + "<br />";
                              if (iJumlahPriaMerdekakan > 0)
                                resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sebapak)" + "<br />";
                              if (iJumlahWanitaMerdekakan > 0)
                                resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sebapak)" + "<br />";
                            }
                            if (iJumlahPutraPamanSebapak == 0) {
                              iJthPriaMerdekakan = Math.round(iSisa / (iJumlahPriaMerdekakan + iJumlahWanitaMerdekakan));
                              iJthWanitaMerdekakan = iJthPriaMerdekakan;
                              if (iJumlahPriaMerdekakan > 0) {
                                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPriaMerdekakan * iJumlahPriaMerdekakan);
                                resultToPrint += "Jatah Pria yang Memerdekakan Budak (Sisa) : " + tandaPemisahTitik(iJthPriaMerdekakan) + "<br />";
                              }
                              if (iJumlahWanitaMerdekakan > 0) {
                                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthWanitaMerdekakan * iJumlahWanitaMerdekakan);
                                resultToPrint += "Jatah Wanita yang Memerdekakan Budak (Sisa) : " + tandaPemisahTitik(iJthWanitaMerdekakan) + "<br />";
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if (iJumlahSaudariSeibu == 1) {
                  iJthSaudariSeibu = Math.round(iHarta / 6);
                  resultToPrint += "Jatah tiap Saudari Seibu (1/6) :" + tandaPemisahTitik(iJthSaudariSeibu) + "<br />";
                }
                if (iJumlahSaudariSeibu > 1) {
                  iJthSaudariSeibu = Math.round(iHarta / 3);
                  resultToPrint += "Jatah tiap Saudari Seibu (1/3) :" + tandaPemisahTitik(iJthSaudariSeibu / iJumlahSaudariSeibu) + "<br />";
                }
              }
            }
          }
        }
        if (iJumlahSuami == 0 && iJumlahIstri == 0) {
          if (iJumlahIbu == 1) {
            iJthIbu = Math.round(iHarta / 3) * iJumlahIbu;
          }
          if (iJumlahIbu == 0) {
            if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0) {
              iJthNenekBapak = Math.round(iHarta / 6) * iJumlahNenekBapak;
            }
            if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1) {
              iJthNenekIbu = Math.round(iHarta / 6) * iJumlahNenekIbu;
            }
            if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1) {
              iJthNenekBapak = Math.round(iHarta / 12) * iJumlahNenekBapak;
              iJthNenekIbu = Math.round(iHarta / 12) * iJumlahNenekIbu;
            }
            if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
              iJthNenekKakek = Math.round(iHarta / 6) * iJumlahNenekKakek;
            }
          }
          if (iJumlahBapak > 0) {
            iJthBapak = Math.round(iHarta / 3);
            iSisa = iHarta - (iJthIbu + iJthBapak + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
            iJthBapak = iJthBapak + iSisa * iJumlahBapak;
            iSisa = iHarta - (iJthIbu + iJthBapak + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
            if (iJumlahSaudaraSeibu > 0)
              resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudaraKandung > 0)
              resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudariKandung > 0)
              resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudariSeibu > 0)
              resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudaraSebapak > 0)
              resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudariSebapak > 0)
              resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraSaudaraKandung > 0)
              resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraSaudaraSebapak > 0)
              resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPamanKandung > 0)
              resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPamanSebapak > 0)
              resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraPamanKandung > 0)
              resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraPamanSebapak > 0)
              resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPriaMerdekakan > 0)
              resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahWanitaMerdekakan > 0)
              resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
          }
          if (iJumlahBapak == 0) {
            if (iJumlahKakek == 1) {
              iJthKakek = Math.round(iHarta / 3) * iJumlahKakek;
              iSisa = iHarta - (iJthIbu + iJthKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
              iJthKakek = iJthKakek + iSisa * iJumlahKakek;
              iSisa = iHarta - (iJthIbu + iJthKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
              if (iJumlahSaudaraSeibu > 0)
                resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudariKandung > 0)
                resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudariSeibu > 0)
                resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudariSebapak > 0)
                resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPamanKandung > 0)
                resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPamanSebapak > 0)
                resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraPamanKandung > 0)
                resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraPamanSebapak > 0)
                resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPriaMerdekakan > 0)
                resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahWanitaMerdekakan > 0)
                resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
            }
            if (iJumlahKakek == 0) {
              if (iJumlahSaudaraSeibu == 1) {
                iJthSaudaraSeibu = Math.round(iHarta / 6);
                iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                resultToPrint += "Jatah tiap Saudara Seibu (1/6) : " + tandaPemisahTitik(iJthSaudaraSeibu) + "<br />";
              }
              if (iJumlahSaudaraSeibu > 1) {
                iJthSaudaraSeibu = Math.round(iHarta / 3);
                iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                resultToPrint += "Jatah tiap Saudara Seibu (1/3) : " + tandaPemisahTitik(iJthSaudaraSeibu / iJumlahSaudaraSeibu) + "<br />";
              }
              if (iJumlahSaudaraKandung > 0) {
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                if (iJumlahSaudariKandung == 0) {
                  iJthSaudaraKandung = Math.round(iSisa / iJumlahSaudaraKandung);
                }
                if (iJumlahSaudariKandung > 0) {
                  iJthSaudaraKandung = Math.round(iSisa / (iJumlahSaudaraKandung + iJumlahSaudariKandung));
                  iJthSaudariKandung = iJthSaudaraKandung;
                  resultToPrint += "Jatah tiap Saudari Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudariKandung) + "<br />";
                }
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraKandung * iJumlahSaudaraKandung + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudara Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudaraKandung) + "<br />";
                if (iJumlahSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahSaudariSebapak > 0)
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              }
              if (iJumlahSaudaraKandung == 0) {
                if (iJumlahSaudariKandung > 1) {
                  iJthSaudariKandung = Math.round((2 * iHarta / 3) / iJumlahSaudariKandung);
                  iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                  resultToPrint += "Jatah tiap Saudari Kandung (2/3) : " + tandaPemisahTitik(iJthSaudariKandung) + "<br />";
                  if (iJumlahSaudariSebapak > 0 && iJumlahSaudaraSebapak == 0) {
                    resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi 2 Saudari Kandung atau lebih)" + "<br />";
                  }
                }
                if (iJumlahSaudariKandung == 1 || iJumlahSaudariKandung == 0) {
                  iJthSaudariKandung = Math.round(iHarta / 2);
                  if (iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak == 1) {
                    iJthSaudariSebapak = Math.round(iHarta / 2);
                    resultToPrint += "Jatah tiap Saudari Sebapak (1/2) : " + tandaPemisahTitik(iJthSaudariSebapak / iJumlahSaudariSebapak) + "<br />";
                  }
                  if (iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak > 1) {
                    iJthSaudariSebapak = Math.round((2 * iHarta / 3) / iJumlahSaudariSebapak);
                    resultToPrint += "Jatah tiap Saudari Sebapak (2/3) : " + tandaPemisahTitik(iJthSaudariSebapak) + "<br />";
                  }
                  iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak);
                  if (iJumlahSaudariKandung == 1)
                    resultToPrint += "Jatah tiap Saudari Kandung (1/2) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                }
                if (iJumlahSaudaraSebapak > 0) {
                  iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                  iJthSaudaraSebapak = Math.round(iSisa / (iJumlahSaudaraSebapak + iJumlahSaudariSebapak));
                  iJthSaudariSebapak = iJthSaudaraSebapak;
                  iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraSebapak * iJumlahSaudaraSebapak + iJthSaudariSebapak * iJumlahSaudariSebapak);
                  resultToPrint += "Jatah tiap Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudaraSebapak) + "<br />";
                  if (iJumlahSaudariSebapak > 0)
                    resultToPrint += "Jatah tiap Saudari Sebapak : " + tandaPemisahTitik(iJthSaudariSebapak) + "<br />";
                  if (iJumlahPutraSaudaraKandung > 0)
                    resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPutraSaudaraSebapak > 0)
                    resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPamanKandung > 0)
                    resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPamanSebapak > 0)
                    resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPutraPamanKandung > 0)
                    resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPutraPamanSebapak > 0)
                    resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPriaMerdekakan > 0)
                    resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahWanitaMerdekakan > 0)
                    resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                }
                if (iJumlahSaudaraSebapak == 0) {
                  iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak);
                  if (iJumlahPutraSaudaraKandung > 0) {
                    iJthPutraSaudaraKandung = Math.round(iSisa / iJumlahPutraSaudaraKandung);
                    iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraSaudaraKandung * iJumlahPutraSaudaraKandung);
                    resultToPrint += "Jatah tiap Putra dari Saudara Sekandung (Sisa) : " + tandaPemisahTitik(iJthPutraSaudaraKandung) + "<br />";
                    if (iJumlahPutraSaudaraSebapak > 0)
                      resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPamanKandung > 0)
                      resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPamanSebapak > 0)
                      resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPutraPamanKandung > 0)
                      resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPutraPamanSebapak > 0)
                      resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPriaMerdekakan > 0)
                      resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahWanitaMerdekakan > 0)
                      resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                  }
                  if (iJumlahPutraSaudaraKandung == 0) {
                    iJthPutraSaudaraSebapak = Math.round(iSisa / iJumlahPutraSaudaraSebapak);
                    if (iJumlahPutraSaudaraSebapak > 0) {
                      iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraSaudaraSebapak * iJumlahPutraSaudaraSebapak);
                      resultToPrint += "Jatah tiap Putra dari Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthPutraSaudaraSebapak) + "<br />";
                      if (iJumlahPamanKandung > 0)
                        resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPamanSebapak > 0)
                        resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPutraPamanKandung > 0)
                        resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPutraPamanSebapak > 0)
                        resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPriaMerdekakan > 0)
                        resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahWanitaMerdekakan > 0)
                        resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                    }
                    if (iJumlahPutraSaudaraSebapak == 0) {
                      iJthPamanKandung = Math.round(iSisa / iJumlahPamanKandung);
                      if (iJumlahPamanKandung > 0) {
                        iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPamanKandung * iJumlahPamanKandung);
                        resultToPrint += "Jatah tiap Paman Sekandung (Sisa) : " + tandaPemisahTitik(iJthPamanKandung) + "<br />";
                        if (iJumlahPamanSebapak > 0)
                          resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahPutraPamanKandung > 0)
                          resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahPutraPamanSebapak > 0)
                          resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahPriaMerdekakan > 0)
                          resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahWanitaMerdekakan > 0)
                          resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                      }
                      if (iJumlahPamanKandung == 0) {
                        iJthPamanSebapak = Math.round(iSisa / iJumlahPamanSebapak);
                        if (iJumlahPamanSebapak > 0) {
                          iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPamanSebapak * iJumlahPamanSebapak);
                          resultToPrint += "Jatah tiap Paman Sebapak (Sisa) : " + tandaPemisahTitik(iJthPamanSebapak) + "<br />";
                          if (iJumlahPutraPamanKandung > 0)
                            resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                          if (iJumlahPutraPamanSebapak > 0)
                            resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                          if (iJumlahPriaMerdekakan > 0)
                            resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                          if (iJumlahWanitaMerdekakan > 0)
                            resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                        }
                        if (iJumlahPamanSebapak == 0) {
                          iJthPutraPamanKandung = Math.round(iSisa / iJumlahPutraPamanKandung);
                          if (iJumlahPutraPamanKandung > 0) {
                            iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraPamanKandung * iJumlahPutraPamanKandung);
                            resultToPrint += "Jatah tiap Putra dari Paman Sekandung (Sisa) : " + tandaPemisahTitik(iJthPutraPamanKandung) + "<br />";
                            if (iJumlahPutraPamanSebapak > 0)
                              resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Putra dari Paman Sekandung)" + "<br />";
                            if (iJumlahPriaMerdekakan > 0)
                              resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sekandung)" + "<br />";
                            if (iJumlahWanitaMerdekakan > 0)
                              resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sekandung)" + "<br />";
                          }
                          if (iJumlahPutraPamanKandung == 0) {
                            iJthPutraPamanSebapak = Math.round(iSisa / iJumlahPutraPamanSebapak);
                            if (iJumlahPutraPamanSebapak > 0) {
                              iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraPamanSebapak * iJumlahPutraPamanSebapak);
                              resultToPrint += "Jatah tiap Putra dari Paman Sebapak (Sisa) : " + tandaPemisahTitik(iJthPutraPamanSebapak) + "<br />";
                              if (iJumlahPriaMerdekakan > 0)
                                resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sebapak)" + "<br />";
                              if (iJumlahWanitaMerdekakan > 0)
                                resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sebapak)" + "<br />";
                            }
                            if (iJumlahPutraPamanSebapak == 0) {
                              iJthPriaMerdekakan = Math.round(iSisa / (iJumlahPriaMerdekakan + iJumlahWanitaMerdekakan));
                              iJthWanitaMerdekakan = iJthPriaMerdekakan;
                              if (iJumlahPriaMerdekakan > 0) {
                                iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPriaMerdekakan * iJumlahPriaMerdekakan);
                                resultToPrint += "Jatah Pria yang Memerdekakan Budak (Sisa) : " + tandaPemisahTitik(iJthPriaMerdekakan) + "<br />";
                              }
                              if (iJumlahWanitaMerdekakan > 0) {
                                iSisa = iHarta - (iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthWanitaMerdekakan * iJumlahWanitaMerdekakan);
                                resultToPrint += "Jatah Wanita yang Memerdekakan Budak (Sisa) : " + tandaPemisahTitik(iJthWanitaMerdekakan) + "<br />";
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if (iJumlahSaudariSeibu == 1) {
                  iJthSaudariSeibu = Math.round(iHarta / 6);
                  resultToPrint += "Jatah tiap Saudari Seibu (1/6) :" + tandaPemisahTitik(iJthSaudariSeibu) + "<br />";
                }
                if (iJumlahSaudariSeibu > 1) {
                  iJthSaudariSeibu = Math.round(iHarta / 3);
                  resultToPrint += "Jatah tiap Saudari Seibu (1/3) :" + tandaPemisahTitik(iJthSaudariSeibu / iJumlahSaudariSeibu) + "<br />";
                }
              }
            }
          }
        }
        if (iJumlahIstri > 0) {
          iJthIstri = Math.round((iHarta / 4) / iJumlahIstri);
          if (iJumlahIbu == 1) {
            iJthIbu = Math.round(iHarta / 4) * iJumlahIbu;
          }
          if (iJumlahIbu == 0) {
            if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0) {
              iJthNenekBapak = Math.round(iHarta / 6) * iJumlahNenekBapak;
            }
            if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1) {
              iJthNenekIbu = Math.round(iHarta / 6) * iJumlahNenekIbu;
            }
            if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1) {
              iJthNenekBapak = Math.round(iHarta / 12) * iJumlahNenekBapak;
              iJthNenekIbu = Math.round(iHarta / 12) * iJumlahNenekIbu;
            }
            if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
              iJthNenekKakek = Math.round(iHarta / 6) * iJumlahNenekKakek;
            }
          }
          if (iJumlahBapak > 0) {
            iJthBapak = Math.round(iHarta / 2);
            iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthBapak + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
            iJthBapak = iJthBapak + iSisa * iJumlahBapak;
            iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthBapak + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
            if (iJumlahSaudaraSeibu > 0)
              resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudaraKandung > 0)
              resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudariKandung > 0)
              resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudariSeibu > 0)
              resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudaraSebapak > 0)
              resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahSaudariSebapak > 0)
              resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraSaudaraKandung > 0)
              resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraSaudaraSebapak > 0)
              resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPamanKandung > 0)
              resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPamanSebapak > 0)
              resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraPamanKandung > 0)
              resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPutraPamanSebapak > 0)
              resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahPriaMerdekakan > 0)
              resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
            if (iJumlahWanitaMerdekakan > 0)
              resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
          }
          if (iJumlahBapak == 0) {
            if (iJumlahKakek == 1) {
              iJthKakek = Math.round(iHarta / 2) * iJumlahKakek;
              iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
              iJthKakek = iJthKakek + iSisa * iJumlahKakek;
              iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
              if (iJumlahSaudaraSeibu > 0)
                resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudariKandung > 0)
                resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudariSeibu > 0)
                resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahSaudariSebapak > 0)
                resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPamanKandung > 0)
                resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPamanSebapak > 0)
                resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraPamanKandung > 0)
                resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPutraPamanSebapak > 0)
                resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahPriaMerdekakan > 0)
                resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
              if (iJumlahWanitaMerdekakan > 0)
                resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
            }
            if (iJumlahKakek == 0) {
              if (iJumlahSaudaraSeibu == 1) {
                iJthSaudaraSeibu = Math.round(iHarta / 6);
                iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                resultToPrint += "Jatah tiap Saudara Seibu (1/6) : " + tandaPemisahTitik(iJthSaudaraSeibu) + "<br />";
              }
              if (iJumlahSaudaraSeibu > 1) {
                iJthSaudaraSeibu = Math.round(iHarta / 3);
                iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                resultToPrint += "Jatah tiap Saudara Seibu (1/3) : " + tandaPemisahTitik(iJthSaudaraSeibu / iJumlahSaudaraSeibu) + "<br />";
              }
              if (iJumlahSaudaraKandung > 0) {
                iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                if (iJumlahSaudariKandung == 0) {
                  iJthSaudaraKandung = Math.round(iSisa / iJumlahSaudaraKandung);
                }
                if (iJumlahSaudariKandung > 0) {
                  iJthSaudaraKandung = Math.round(iSisa / (iJumlahSaudaraKandung + iJumlahSaudariKandung));
                  iJthSaudariKandung = iJthSaudaraKandung;
                  resultToPrint += "Jatah tiap Saudari Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudariKandung) + "<br />";
                }
                iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraKandung * iJumlahSaudaraKandung + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudara Kandung : " + tandaPemisahTitik(iJthSaudaraKandung) + "<br />";
                if (iJumlahSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
                if (iJumlahSaudariSebapak > 0)
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              }
              if (iJumlahSaudaraKandung == 0) {
                if (iJumlahSaudariKandung > 1) {
                  iJthSaudariKandung = Math.round((2 * iHarta / 3) / iJumlahSaudariKandung);
                  iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                  resultToPrint += "Jatah tiap Saudari Kandung (2/3) : " + tandaPemisahTitik(iJthSaudariKandung) + "<br />";
                  if (iJumlahSaudariSebapak > 0 && iJumlahSaudaraSebapak == 0) {
                    resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi 2 Saudari Kandung atau lebih)" + "<br />";
                  }
                }
                if (iJumlahSaudariKandung == 1 || iJumlahSaudariKandung == 0) {
                  iJthSaudariKandung = Math.round(iHarta / 2);
                  if (iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak == 1) {
                    iJthSaudariSebapak = Math.round(iHarta / 2);
                    resultToPrint += "Jatah tiap Saudari Sebapak (1/2) : " + tandaPemisahTitik(iJthSaudariSebapak / iJumlahSaudariSebapak) + "<br />";
                  }
                  if (iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak > 1) {
                    iJthSaudariSebapak = Math.round((2 * iHarta / 3) / iJumlahSaudariSebapak);
                    resultToPrint += "Jatah tiap Saudari Sebapak (2/3) : " + tandaPemisahTitik(iJthSaudariSebapak) + "<br />";
                  }
                  iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak);
                  if (iJumlahSaudariKandung == 1)
                    resultToPrint += "Jatah tiap Saudari Kandung (1/2) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                }
                if (iJumlahSaudaraSebapak > 0) {
                  iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                  iJthSaudaraSebapak = Math.round(iSisa / (iJumlahSaudaraSebapak + iJumlahSaudariSebapak));
                  iJthSaudariSebapak = iJthSaudaraSebapak;
                  iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraSebapak * iJumlahSaudaraSebapak + iJthSaudariSebapak * iJumlahSaudariSebapak);
                  resultToPrint += "Jatah tiap Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudaraSebapak) + "<br />";
                  if (iJumlahSaudariSebapak > 0)
                    resultToPrint += "Jatah tiap Saudari Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudariSebapak) + "<br />";
                  if (iJumlahPutraSaudaraKandung > 0)
                    resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPutraSaudaraSebapak > 0)
                    resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPamanKandung > 0)
                    resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPamanSebapak > 0)
                    resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPutraPamanKandung > 0)
                    resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPutraPamanSebapak > 0)
                    resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahPriaMerdekakan > 0)
                    resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                  if (iJumlahWanitaMerdekakan > 0)
                    resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                }
                if (iJumlahSaudaraSebapak == 0) {
                  iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak);
                  if (iJumlahPutraSaudaraKandung > 0) {
                    iJthPutraSaudaraKandung = Math.round(iSisa / iJumlahPutraSaudaraKandung);
                    iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraSaudaraKandung * iJumlahPutraSaudaraKandung);
                    resultToPrint += "Jatah tiap Putra dari Saudara Sekandung (Sisa) : " + tandaPemisahTitik(iJthPutraSaudaraKandung) + "<br />";
                    if (iJumlahPutraSaudaraSebapak > 0)
                      resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPamanKandung > 0)
                      resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPamanSebapak > 0)
                      resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPutraPamanKandung > 0)
                      resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPutraPamanSebapak > 0)
                      resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahPriaMerdekakan > 0)
                      resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                    if (iJumlahWanitaMerdekakan > 0)
                      resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sekandung)" + "<br />";
                  }
                  if (iJumlahPutraSaudaraKandung == 0) {
                    iJthPutraSaudaraSebapak = Math.round(iSisa / iJumlahPutraSaudaraSebapak);
                    if (iJumlahPutraSaudaraSebapak > 0) {
                      iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraSaudaraSebapak * iJumlahPutraSaudaraSebapak);
                      resultToPrint += "Jatah tiap Putra dari Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthPutraSaudaraSebapak) + "<br />";
                      if (iJumlahPamanKandung > 0)
                        resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPamanSebapak > 0)
                        resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPutraPamanKandung > 0)
                        resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPutraPamanSebapak > 0)
                        resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahPriaMerdekakan > 0)
                        resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                      if (iJumlahWanitaMerdekakan > 0)
                        resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Saudara Sebapak)" + "<br />";
                    }
                    if (iJumlahPutraSaudaraSebapak == 0) {
                      iJthPamanKandung = Math.round(iSisa / iJumlahPamanKandung);
                      if (iJumlahPamanKandung > 0) {
                        iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPamanKandung * iJumlahPamanKandung);
                        resultToPrint += "Jatah tiap Paman Sekandung (Sisa) : " + tandaPemisahTitik(iJthPamanKandung) + "<br />";
                        if (iJumlahPamanSebapak > 0)
                          resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahPutraPamanKandung > 0)
                          resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahPutraPamanSebapak > 0)
                          resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahPriaMerdekakan > 0)
                          resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                        if (iJumlahWanitaMerdekakan > 0)
                          resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sekandung)" + "<br />";
                      }
                      if (iJumlahPamanKandung == 0) {
                        iJthPamanSebapak = Math.round(iSisa / iJumlahPamanSebapak);
                        if (iJumlahPamanSebapak > 0) {
                          iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPamanSebapak * iJumlahPamanSebapak);
                          resultToPrint += "Jatah tiap Paman Sebapak (Sisa) : " + tandaPemisahTitik(iJthPamanSebapak) + "<br />";
                          if (iJumlahPutraPamanKandung > 0)
                            resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                          if (iJumlahPutraPamanSebapak > 0)
                            resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                          if (iJumlahPriaMerdekakan > 0)
                            resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                          if (iJumlahWanitaMerdekakan > 0)
                            resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Paman Sebapak)" + "<br />";
                        }
                        if (iJumlahPamanSebapak == 0) {
                          iJthPutraPamanKandung = Math.round(iSisa / iJumlahPutraPamanKandung);
                          if (iJumlahPutraPamanKandung > 0) {
                            iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraPamanKandung * iJumlahPutraPamanKandung);
                            resultToPrint += "Jatah tiap Putra dari Paman Sekandung (Sisa) : " + tandaPemisahTitik(iJthPutraPamanKandung) + "<br />";
                            if (iJumlahPutraPamanSebapak > 0)
                              resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Putra dari Paman Sekandung)" + "<br />";
                            if (iJumlahPriaMerdekakan > 0)
                              resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sekandung)" + "<br />";
                            if (iJumlahWanitaMerdekakan > 0)
                              resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sekandung)" + "<br />";
                          }
                          if (iJumlahPutraPamanKandung == 0) {
                            iJthPutraPamanSebapak = Math.round(iSisa / iJumlahPutraPamanSebapak);
                            if (iJumlahPutraPamanSebapak > 0) {
                              iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPutraPamanSebapak * iJumlahPutraPamanSebapak);
                              resultToPrint += "Jatah tiap Putra dari Paman Sebapak (Sisa) : " + tandaPemisahTitik(iJthPutraPamanSebapak) + "<br />";
                              if (iJumlahPriaMerdekakan > 0)
                                resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sebapak)" + "<br />";
                              if (iJumlahWanitaMerdekakan > 0)
                                resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Putra dari Paman Sebapak)" + "<br />";
                            }
                            if (iJumlahPutraPamanSebapak == 0) {
                              iJthPriaMerdekakan = Math.round(iSisa / (iJumlahPriaMerdekakan + iJumlahWanitaMerdekakan));
                              iJthWanitaMerdekakan = iJthPriaMerdekakan;
                              if (iJumlahPriaMerdekakan > 0) {
                                iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthPriaMerdekakan * iJumlahPriaMerdekakan);
                                resultToPrint += "Jatah Pria yang Memerdekakan Budak (Sisa) : " + tandaPemisahTitik(iJthPriaMerdekakan) + "<br />";
                              }
                              if (iJumlahWanitaMerdekakan > 0) {
                                iSisa = iHarta - (iJthIstri * iJumlahIstri + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu * iJumlahSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudariSebapak * iJumlahSaudariSebapak + iJthWanitaMerdekakan * iJumlahWanitaMerdekakan);
                                resultToPrint += "Jatah Wanita yang Memerdekakan Budak (Sisa) : " + tandaPemisahTitik(iJthWanitaMerdekakan) + "<br />";
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if (iJumlahSaudariSeibu == 1) {
                  iJthSaudariSeibu = Math.round(iHarta / 6);
                  resultToPrint += "Jatah tiap Saudari Seibu (1/6) :" + tandaPemisahTitik(iJthSaudariSeibu) + "<br />";
                }
                if (iJumlahSaudariSeibu > 1) {
                  iJthSaudariSeibu = Math.round(iHarta / 3);
                  resultToPrint += "Jatah tiap Saudari Seibu (1/3) :" + tandaPemisahTitik(iJthSaudariSeibu / iJumlahSaudariSeibu) + "<br />";
                }
              }
            }
          }
        }
      }
      if (iJumlahCucuLaki > 0 && iJumlahCucuPerempuan > 0) {
        if (iJumlahSuami == 1) {
          iJthSuami = Math.round(iHarta / 4);
        }
        if (iJumlahIstri > 0) {
          iJthIstri = Math.round(iHarta / 8);
        }
        if (iJumlahIbu == 1) {
          iJthIbu = Math.round(iHarta / 6);
        }
        if (iJumlahIbu == 0) {
          if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0) {
            iJthNenekBapak = Math.round(iHarta / 6) * iJumlahNenekBapak;
          }
          if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1) {
            iJthNenekIbu = Math.round(iHarta / 6) * iJumlahNenekIbu;
          }
          if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1) {
            iJthNenekBapak = Math.round(iHarta / 12) * iJumlahNenekBapak;
            iJthNenekIbu = Math.round(iHarta / 12) * iJumlahNenekIbu;
          }
          if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
            iJthNenekKakek = Math.round(iHarta / 6) * iJumlahNenekKakek;
          }
        }
        if (iJumlahBapak == 1) {
          iJthBapak = Math.round(iHarta / 6);
        }
        if (iJumlahBapak == 0) {
          iJthKakek = Math.round(iHarta / 6) * iJumlahKakek;
        }
        iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
        iJthCucuLaki = Math.round((2 * iSisa) / (2 * iJumlahCucuLaki + iJumlahCucuPerempuan));
        iJthCucuPerempuan = Math.round((iSisa) / (2 * iJumlahCucuLaki + iJumlahCucuPerempuan));
        iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthCucuLaki * iJumlahCucuLaki + iJthCucuPerempuan * iJumlahCucuPerempuan);
        resultToPrint += "Jatah tiap Cucu Laki-laki (Sisa) : " + tandaPemisahTitik(iJthCucuLaki) + "<br />";
        resultToPrint += "Jatah tiap Cucu Perempuan (Sisa) : " + tandaPemisahTitik(iJthCucuPerempuan) + "<br />";
        if (iJumlahSaudaraKandung > 0)
          resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudariKandung > 0)
          resultToPrint += "Jatah tiap Saudari kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudaraSebapak > 0)
          resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudaraSeibu > 0)
          resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudariSebapak > 0)
          resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudariSeibu > 0)
          resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPutraSaudaraKandung > 0)
          resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPutraSaudaraSebapak > 0)
          resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPamanKandung > 0)
          resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPamanSebapak > 0)
          resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPutraPamanKandung > 0)
          resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPutraPamanSebapak > 0)
          resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPriaMerdekakan > 0)
          resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahWanitaMerdekakan > 0)
          resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
      }
      if (iJumlahCucuLaki > 0 && iJumlahCucuPerempuan == 0) {
        if (iJumlahSuami == 1) {
          iJthSuami = Math.round(iHarta / 4);
        }
        if (iJumlahIstri > 0) {
          iJthIstri = Math.round((iHarta / 8) / iJumlahIstri);
        }
        if (iJumlahIbu == 1) {
          iJthIbu = Math.round(iHarta / 6);
        }
        if (iJumlahIbu == 0) {
          if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0) {
            iJthNenekBapak = Math.round(iHarta / 6) * iJumlahNenekBapak;
          }
          if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1) {
            iJthNenekIbu = Math.round(iHarta / 6) * iJumlahNenekIbu;
          }
          if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1) {
            iJthNenekBapak = Math.round(iHarta / 12) * iJumlahNenekBapak;
            iJthNenekIbu = Math.round(iHarta / 12) * iJumlahNenekIbu;
          }
          if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
            iJthNenekKakek = Math.round(iHarta / 6) * iJumlahNenekKakek;
          }
        }
        if (iJumlahBapak == 1) {
          iJthBapak = Math.round(iHarta / 6);
        }
        if (iJumlahBapak == 0) {
          iJthKakek = Math.round(iHarta / 6) * iJumlahKakek;
        }
        iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
        iJthCucuLaki = iSisa / iJumlahCucuLaki;
        iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthCucuLaki * iJumlahCucuLaki);
        resultToPrint += "Jatah tiap Cucu Laki-laki (Sisa) : " + tandaPemisahTitik(iJthCucuLaki) + "<br />";
        if (iJumlahSaudaraKandung > 0)
          resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudariKandung > 0)
          resultToPrint += "Jatah tiap Saudari kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudaraSebapak > 0)
          resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudaraSeibu > 0)
          resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudariSebapak > 0)
          resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahSaudariSeibu > 0)
          resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPutraSaudaraKandung > 0)
          resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPutraSaudaraSebapak > 0)
          resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPamanKandung > 0)
          resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPamanSebapak > 0)
          resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPutraPamanKandung > 0)
          resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPutraPamanSebapak > 0)
          resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahPriaMerdekakan > 0)
          resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
        if (iJumlahWanitaMerdekakan > 0)
          resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Cucu Laki-Laki)" + "<br />";
      }
      if (iJumlahCucuLaki == 0 && iJumlahCucuPerempuan > 0) {
        if (iJumlahSuami == 1) {
          iJthSuami = Math.round(iHarta / 4);
        }
        if (iJumlahIstri > 0) {
          iJthIstri = Math.round((iHarta / 8) / iJumlahIstri);
        }
        if (iJumlahIbu == 1) {
          iJthIbu = Math.round(iHarta / 6);
        }
        if (iJumlahIbu == 0) {
          if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0) {
            iJthNenekBapak = Math.round(iHarta / 6) * iJumlahNenekBapak;
          }
          if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1) {
            iJthNenekIbu = Math.round(iHarta / 6) * iJumlahNenekIbu;
          }
          if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1) {
            iJthNenekBapak = Math.round(iHarta / 12) * iJumlahNenekBapak;
            iJthNenekIbu = Math.round(iHarta / 12) * iJumlahNenekIbu;
          }
          if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
            iJthNenekKakek = Math.round(iHarta / 6) * iJumlahNenekKakek;
          }
        }
        if (iJumlahBapak == 1) {
          iJthBapak = Math.round(iHarta / 6);
          if (iJumlahSaudaraSeibu > 0)
            resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahSaudaraKandung > 0)
            resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahSaudariKandung > 0)
            resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahSaudariSeibu > 0)
            resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahSaudaraSebapak > 0)
            resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahSaudariSebapak > 0)
            resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahPutraSaudaraKandung > 0)
            resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahPutraSaudaraSebapak > 0)
            resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahPamanKandung > 0)
            resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahPamanSebapak > 0)
            resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahPutraPamanKandung > 0)
            resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahPutraPamanSebapak > 0)
            resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahPriaMerdekakan > 0)
            resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
          if (iJumlahWanitaMerdekakan > 0)
            resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
        }
        if (iJumlahBapak == 0) {
          iJthKakek = Math.round(iHarta / 6) * iJumlahKakek;
        }
        if (iJumlahCucuPerempuan == 1) {
          iJthCucuPerempuan = Math.round(iHarta / 2);
          resultToPrint += "Jatah tiap Cucu Perempuan (1/2) : " + tandaPemisahTitik(iJthCucuPerempuan) + "<br />";
        } else {
          iJthCucuPerempuan = Math.round((2 * iHarta) / (3 * iJumlahCucuPerempuan));
          resultToPrint += "Jatah tiap Cucu Perempuan (2/3) : " + tandaPemisahTitik(iJthCucuPerempuan) + "<br />";
        }
        iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + (iJthCucuPerempuan * iJumlahCucuPerempuan));
        if (iJumlahBapak == 1) {
          iJthBapak = Math.round(iHarta / 6);
          iJthBapak = iJthBapak + iSisa * iJumlahBapak;
        }
        if (iJumlahBapak == 0) {
          if (iJumlahKakek == 1) {
            iJthKakek = Math.round(iHarta / 6);
            iJthKakek = iJthKakek + iSisa * iJumlahKakek;
            if (iJumlahSaudaraSeibu > 0)
              resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahSaudaraKandung > 0)
              resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahSaudariKandung > 0)
              resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahSaudariSeibu > 0)
              resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahSaudaraSebapak > 0)
              resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahSaudariSebapak > 0)
              resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahPutraSaudaraKandung > 0)
              resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahPutraSaudaraSebapak > 0)
              resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahPamanKandung > 0)
              resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahPamanSebapak > 0)
              resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahPutraPamanKandung > 0)
              resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahPutraPamanSebapak > 0)
              resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahPriaMerdekakan > 0)
              resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
            if (iJumlahWanitaMerdekakan > 0)
              resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
          }
          if (iJumlahKakek == 0) {
            if (iJumlahSaudaraKandung > 0) {
              iSisa = iHarta - (iJthSuami + iJthIbu + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
              if (iJumlahSaudariKandung == 0) {
                iJthSaudaraKandung = Math.round(iSisa / iJumlahSaudaraKandung);
              }
              if (iJumlahSaudariKandung > 0) {
                iJthSaudaraKandung = Math.round(iSisa / (iJumlahSaudaraKandung + iJumlahSaudariKandung));
                iJthSaudariKandung = iJthSaudaraKandung;
                resultToPrint += "Jatah tiap Saudari Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudariKandung) + "<br />";
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraKandung * iJumlahSaudaraKandung + iJthSaudariKandung * iJumlahSaudariKandung);
              resultToPrint += "Jatah tiap Saudara Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudaraKandung) + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPamanKandung > 0)
                resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPamanSebapak > 0)
                resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraPamanKandung > 0)
                resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraPamanSebapak > 0)
                resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPriaMerdekakan > 0)
                resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahWanitaMerdekakan > 0)
                resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahSaudariSebapak > 0)
                resultToPrint += "Jatah tiap Saudari Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
            }
            if (iJumlahSaudaraKandung == 0) {
              if (iJumlahSaudariKandung > 0 && iJumlahCucuPerempuan > 0) {
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                iJthSaudariKandung = Math.round(iSisa / iJumlahSaudariKandung);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudari Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                if (iJumlahSaudariSebapak > 0) {
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi 2 Saudari Kandung atau lebih)" + "<br />";
                }
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              if (iJumlahSaudaraSebapak > 0) {
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                iJthSaudaraSebapak = Math.round(iSisa / iJumlahSaudaraSebapak);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraSebapak * iJumlahSaudaraSebapak);
                resultToPrint += "Jatah tiap Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudaraSebapak) + "<br />";
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
              }
              if (iJumlahSaudariSebapak > 0 && iJumlahSaudariKandung == 0) {
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudaraSebapak * iJumlahSaudaraSebapak);
                iJthSaudariSebapak = Math.round(iSisa / iJumlahSaudariSebapak);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudaraSebapak * iJumlahSaudaraSebapak + iJthSaudariSebapak * iJumlahSaudariSebapak);
                resultToPrint += "Jatah tiap Saudari Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudariSebapak / iJumlahSaudariSebapak) + "<br />";
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
              }
            }
          }
        }
        iSisa = iHarta - (iJthSuami + iJthIbu + iJthBapak + iJthKakek + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraKandung * iJumlahSaudaraKandung + iJthSaudariKandung + iJthSaudaraSebapak * iJumlahSaudaraSebapak);
        if (iJumlahSaudaraSeibu > 0)
          resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Cucu Perempuan)" + "<br />";
        if (iJumlahSaudariSeibu > 0)
          resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Cucu Perempuan)" + "<br />";
      }
    } else if (iJumlahAnakLaki > 0 && iJumlahAnakPerempuan > 0) {
      if (iJumlahSuami == 1) {
        iJthSuami = Math.round(iHarta / 4);
      }
      if (iJumlahIstri > 0) {
        iJthIstri = Math.round(iHarta / 8);
      }
      if (iJumlahIbu == 1) {
        iJthIbu = Math.round(iHarta / 6);
      }
      if (iJumlahIbu == 0) {
        if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0) {
          iJthNenekBapak = Math.round(iHarta / 6) * iJumlahNenekBapak;
        }
        if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1) {
          iJthNenekIbu = Math.round(iHarta / 6) * iJumlahNenekIbu;
        }
        if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1) {
          iJthNenekBapak = Math.round(iHarta / 12) * iJumlahNenekBapak;
          iJthNenekIbu = Math.round(iHarta / 12) * iJumlahNenekIbu;
        }
        if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
          iJthNenekKakek = Math.round(iHarta / 6) * iJumlahNenekKakek;
        }
      }
      if (iJumlahBapak == 1) {
        iJthBapak = Math.round(iHarta / 6);
      }
      if (iJumlahBapak == 0) {
        iJthKakek = Math.round(iHarta / 6) * iJumlahKakek;
      }
      iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
      iJthAnakLaki = Math.round((2 * iSisa) / (2 * iJumlahAnakLaki + 1 * iJumlahAnakPerempuan));
      iJthAnakPerempuan = Math.round((iSisa) / (2 * iJumlahAnakLaki + 1 * iJumlahAnakPerempuan));
      iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakLaki * iJumlahAnakLaki + iJthAnakPerempuan * iJumlahAnakPerempuan);
      if (iJumlahCucuLaki > 0)
        resultToPrint += "Jatah tiap Cucu Laki-laki : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahCucuPerempuan > 0 && iJumlahAnakPerempuan < 2)
        resultToPrint += "Jatah tiap Cucu Perempuan : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahCucuPerempuan > 0 && iJumlahAnakPerempuan >= 2)
        resultToPrint += "Jatah tiap Cucu Perempuan : 0 (karena dihalangi oleh Anak Laki-Laki dan 2 Anak Perempuan atau lebih)" + "<br />";
      if (iJumlahSaudaraKandung > 0)
        resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudariKandung > 0)
        resultToPrint += "Jatah tiap Saudari kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudaraSebapak > 0)
        resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudaraSeibu > 0)
        resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudariSebapak > 0)
        resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudariSeibu > 0)
        resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPutraSaudaraKandung > 0)
        resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPutraSaudaraSebapak > 0)
        resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPamanKandung > 0)
        resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPamanSebapak > 0)
        resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPutraPamanKandung > 0)
        resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPutraPamanSebapak > 0)
        resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPriaMerdekakan > 0)
        resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahWanitaMerdekakan > 0)
        resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
    } else if (iJumlahAnakLaki > 0 && iJumlahAnakPerempuan == 0) {
      if (iJumlahSuami == 1) {
        iJthSuami = Math.round(iHarta / 4);
      }
      if (iJumlahIstri > 0) {
        iJthIstri = Math.round((iHarta / 8) / iJumlahIstri);
      }
      if (iJumlahIbu == 1) {
        iJthIbu = Math.round(iHarta / 6);
      }
      if (iJumlahIbu == 0) {
        if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0) {
          iJthNenekBapak = Math.round(iHarta / 6) * iJumlahNenekBapak;
        }
        if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1) {
          iJthNenekIbu = Math.round(iHarta / 6) * iJumlahNenekIbu;
        }
        if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1) {
          iJthNenekBapak = Math.round(iHarta / 12) * iJumlahNenekBapak;
          iJthNenekIbu = Math.round(iHarta / 12) * iJumlahNenekIbu;
        }
        if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
          iJthNenekKakek = Math.round(iHarta / 6) * iJumlahNenekKakek;
        }
      }
      if (iJumlahBapak == 1) {
        iJthBapak = Math.round(iHarta / 6);
      }
      if (iJumlahBapak == 0) {
        iJthKakek = Math.round(iHarta / 6) * iJumlahKakek;
      }
      iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek);
      iJthAnakLaki = iSisa / iJumlahAnakLaki;
      iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakLaki * iJumlahAnakLaki);
      if (iJumlahCucuLaki > 0)
        resultToPrint += "Jatah tiap Cucu Laki-laki : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahCucuPerempuan > 0)
        resultToPrint += "Jatah tiap Cucu Perempuan : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudaraKandung > 0)
        resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudariKandung > 0)
        resultToPrint += "Jatah tiap Saudari kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudaraSebapak > 0)
        resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudaraSeibu > 0)
        resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudariSebapak > 0)
        resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahSaudariSeibu > 0)
        resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPutraSaudaraKandung > 0)
        resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPutraSaudaraSebapak > 0)
        resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPamanKandung > 0)
        resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPamanSebapak > 0)
        resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPutraPamanKandung > 0)
        resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPutraPamanSebapak > 0)
        resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahPriaMerdekakan > 0)
        resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0" + " (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
      if (iJumlahWanitaMerdekakan > 0)
        resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Anak Laki-Laki)" + "<br />";
    } else if (iJumlahAnakLaki == 0 && iJumlahAnakPerempuan > 0) {
      if (iJumlahSuami == 1) {
        iJthSuami = Math.round(iHarta / 4);
      }
      if (iJumlahIstri > 0) {
        iJthIstri = Math.round((iHarta / 8) / iJumlahIstri);
      }
      if (iJumlahIbu == 1) {
        iJthIbu = Math.round(iHarta / 6);
      }
      if (iJumlahIbu == 0) {
        if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0) {
          iJthNenekBapak = Math.round(iHarta / 6) * iJumlahNenekBapak;
        }
        if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1) {
          iJthNenekIbu = Math.round(iHarta / 6) * iJumlahNenekIbu;
        }
        if (iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1) {
          iJthNenekBapak = Math.round(iHarta / 12) * iJumlahNenekBapak;
          iJthNenekIbu = Math.round(iHarta / 12) * iJumlahNenekIbu;
        }
        if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
          iJthNenekKakek = Math.round(iHarta / 6) * iJumlahNenekKakek;
        }
      }
      if (iJumlahBapak == 1) {
        iJthBapak = Math.round(iHarta / 6);
        if (iJumlahSaudaraKandung > 0)
          resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahSaudariKandung > 0)
          resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahSaudaraSebapak > 0)
          resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahSaudariSebapak > 0)
          resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahPutraSaudaraKandung > 0)
          resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahPutraSaudaraSebapak > 0)
          resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahPamanKandung > 0)
          resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahPamanSebapak > 0)
          resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahPutraPamanKandung > 0)
          resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahPutraPamanSebapak > 0)
          resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahPriaMerdekakan > 0)
          resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
        if (iJumlahWanitaMerdekakan > 0)
          resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Bapak)" + "<br />";
      }
      if (iJumlahBapak == 0) {
        if (iJumlahKakek == 1) {
          iJthKakek = Math.round(iHarta / 6) * iJumlahKakek;
          if (iJumlahSaudaraKandung > 0)
            resultToPrint += "Jatah tiap Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahSaudariKandung > 0)
            resultToPrint += "Jatah tiap Saudari Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahSaudaraSebapak > 0)
            resultToPrint += "Jatah tiap Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahSaudariSebapak > 0)
            resultToPrint += "Jatah tiap Saudari Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahPutraSaudaraKandung > 0)
            resultToPrint += "Jatah tiap Putra Saudara Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahPutraSaudaraSebapak > 0)
            resultToPrint += "Jatah tiap Putra Saudara Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahPamanKandung > 0)
            resultToPrint += "Jatah tiap Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahPamanSebapak > 0)
            resultToPrint += "Jatah tiap Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahPutraPamanKandung > 0)
            resultToPrint += "Jatah tiap Putra Paman Kandung : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahPutraPamanSebapak > 0)
            resultToPrint += "Jatah tiap Putra Paman Sebapak : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahPriaMerdekakan > 0)
            resultToPrint += "Jatah Pria yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
          if (iJumlahWanitaMerdekakan > 0)
            resultToPrint += "Jatah Wanita yang Memerdekakan Budak : 0 (karena dihalangi oleh Kakek)" + "<br />";
        }
      }
      if (iJumlahAnakPerempuan == 1) {
        iJthAnakPerempuan = Math.round(iHarta / 2);
        if (iJumlahCucuPerempuan > 0 && iJumlahCucuLaki == 0) {
          iJthCucuPerempuan = Math.round(iHarta / (6 * iJumlahCucuPerempuan));
          resultToPrint += "Jatah tiap Cucu Perempuan : " + tandaPemisahTitik(iJthCucuPerempuan) + "<br />";
          iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan + iJthCucuPerempuan * iJumlahCucuPerempuan);
          iJthBapak = iJthBapak + iSisa * iJumlahBapak;
          iJthKakek = iJthKakek + iSisa * iJumlahKakek;
          if (iJumlahBapak == 0 && iJumlahKakek == 0) {
            if (iJumlahSaudaraKandung > 0) {
              iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan * iJumlahAnakPerempuan + iJthCucuPerempuan * iJumlahCucuPerempuan + iJthCucuLaki * iJumlahCucuLaki);
              if (iJumlahSaudariKandung == 0) {
                iJthSaudaraKandung = Math.round(iSisa / iJumlahSaudaraKandung);
              }
              if (iJumlahSaudariKandung > 0) {
                iJthSaudaraKandung = Math.round(iSisa / (iJumlahSaudaraKandung + iJumlahSaudariKandung));
                iJthSaudariKandung = iJthSaudaraKandung;
                resultToPrint += "Jatah tiap Saudari Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudariKandung) + "<br />";
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraKandung * iJumlahSaudaraKandung + iJthSaudariKandung * iJumlahSaudariKandung);
              resultToPrint += "Jatah tiap Saudara Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudaraKandung) + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPamanKandung > 0)
                resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPamanSebapak > 0)
                resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraPamanKandung > 0)
                resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraPamanSebapak > 0)
                resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPriaMerdekakan > 0)
                resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahWanitaMerdekakan > 0)
                resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahSaudariSebapak > 0)
                resultToPrint += "Jatah tiap Saudari Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
            }
            if (iJumlahSaudaraKandung == 0) {
              if (iJumlahSaudariKandung > 1) {
                iJthSaudariKandung = Math.round(2 * iHarta / 3);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudari Kandung (2/3) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                if (iJumlahSaudariSebapak > 0) {
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi 2 Saudari Kandung atau lebih)" + "<br />";
                }
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              if (iJumlahSaudariKandung == 1) {
                iJthSaudariKandung = Math.round(iHarta / 2);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudari Kandung (1/2) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                if (iJumlahSaudariSebapak > 0) {
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi Saudari Kandung)" + "<br />";
                }
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              if (iJumlahSaudaraSebapak > 0) {
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                iJthSaudaraSebapak = Math.round(iSisa / iJumlahSaudaraSebapak);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraSebapak * iJumlahSaudaraSebapak);
                resultToPrint += "Jatah tiap Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudaraSebapak) + "<br />";
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sebapak)" + "<br />";
              }
            }
          }
        }
        if (iJumlahCucuPerempuan > 0 && iJumlahCucuLaki > 0) {
          iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan);
          iJthCucuPerempuan = Math.round(iSisa / (2 * iJumlahCucuLaki + iJumlahCucuPerempuan));
          iJthCucuLaki = Math.round(2 * iSisa / (2 * iJumlahCucuLaki + iJumlahCucuPerempuan));
          resultToPrint += "Jatah tiap Cucu Perempuan (Sisa) : " + tandaPemisahTitik(iJthCucuPerempuan) + "<br />";
          resultToPrint += "Jatah tiap Cucu Laki-Laki (Sisa) : " + tandaPemisahTitik(iJthCucuLaki) + "<br />";
        }
        if (iJumlahCucuLaki > 0 && iJumlahCucuPerempuan == 0) {
          iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan);
          iJthCucuLaki = iSisa / iJumlahCucuLaki;
          resultToPrint += "Jatah tiap Cucu Laki-laki (Sisa) : " + tandaPemisahTitik(iJthCucuLaki) + "<br />";
        }
        if (iJumlahCucuLaki == 0 && iJumlahCucuPerempuan == 0) {
          iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan);
          iJthBapak = iJthBapak + iSisa * iJumlahBapak;
          iJthKakek = iJthKakek + iSisa * iJumlahKakek;
          if (iJumlahBapak == 0 && iJumlahKakek == 0) {
            if (iJumlahSaudaraKandung > 0) {
              iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan * iJumlahAnakPerempuan + iJthCucuPerempuan * iJumlahCucuPerempuan + iJthCucuLaki * iJumlahCucuLaki);
              if (iJumlahSaudariKandung == 0) {
                iJthSaudaraKandung = Math.round(iSisa / iJumlahSaudaraKandung);
              }
              if (iJumlahSaudariKandung > 0) {
                iJthSaudaraKandung = Math.round(iSisa / (iJumlahSaudaraKandung + iJumlahSaudariKandung));
                iJthSaudariKandung = iJthSaudaraKandung;
                resultToPrint += "Jatah tiap Saudari Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudariKandung) + "<br />";
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraKandung * iJumlahSaudaraKandung + iJthSaudariKandung * iJumlahSaudariKandung);
              resultToPrint += "Jatah tiap Saudara Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudaraKandung) + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPamanKandung > 0)
                resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPamanSebapak > 0)
                resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraPamanKandung > 0)
                resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraPamanSebapak > 0)
                resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPriaMerdekakan > 0)
                resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahWanitaMerdekakan > 0)
                resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahSaudariSebapak > 0)
                resultToPrint += "Jatah tiap Saudari Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
            }
            if (iJumlahSaudaraKandung == 0) {
              if (iJumlahSaudariKandung > 1) {
                iJthSaudariKandung = Math.round(2 * iHarta / 3);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudari Kandung (2/3) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                if (iJumlahSaudariSebapak > 0) {
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi 2 Saudari Kandung atau lebih)" + "<br />";
                }
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              if (iJumlahSaudariKandung == 1) {
                iJthSaudariKandung = Math.round(iHarta / 2);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudari Kandung (1/2) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                if (iJumlahSaudariSebapak > 0) {
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi Saudari Kandung)" + "<br />";
                }
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              if (iJumlahSaudaraSebapak > 0) {
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                iJthSaudaraSebapak = Math.round(iSisa / iJumlahSaudaraSebapak);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraSebapak * iJumlahSaudaraSebapak);
                resultToPrint += "Jatah tiap Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudaraSebapak) + "<br />";
              }
            }
          }
        }
        iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan * iJumlahAnakPerempuan + iJthCucuPerempuan * iJumlahCucuPerempuan + iJthCucuLaki * iJumlahCucuLaki + iJthSaudaraKandung * iJumlahSaudaraKandung);
      }
      if (iJumlahAnakPerempuan >= 2) {
        iJthAnakPerempuan = Math.round((2 * iHarta) / (3 * iJumlahAnakPerempuan));
        iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan * iJumlahAnakPerempuan);
        if (iJumlahCucuPerempuan > 0)
          resultToPrint += "Jatah tiap Cucu Perempuan : 0 (karena dihalangi oleh >= 2 Anak Perempuan)" + "<br />";
        if (iJumlahCucuLaki > 0) {
          iJthCucuLaki = iSisa / iJumlahCucuLaki;
          resultToPrint += "Jatah tiap Cucu Laki-Laki (Sisa) : " + tandaPemisahTitik(iJthCucuLaki) + "<br />";
        }
        iJthBapak = iJthBapak + iSisa * iJumlahBapak;
        if (iJumlahBapak == 0) {
          if (iJumlahKakek > 0) {
            iJthKakek = iJthKakek + iSisa * iJumlahKakek;
          }
          if (iJumlahKakek == 0) {
            if (iJumlahSaudaraKandung > 0) {
              iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan * iJumlahAnakPerempuan + iJthCucuPerempuan * iJumlahCucuPerempuan + iJthCucuLaki * iJumlahCucuLaki);
              iJthSaudaraKandung = Math.round(iSisa / iJumlahSaudaraKandung);
              iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakPerempuan * iJumlahAnakPerempuan + iJthCucuPerempuan * iJumlahCucuPerempuan + iJthCucuLaki * iJumlahCucuLaki + iJthSaudaraKandung * iJumlahSaudaraKandung);
              resultToPrint += "Jatah tiap Saudara Kandung (Sisa) : " + tandaPemisahTitik(iJthSaudaraKandung) + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraSaudaraKandung > 0)
                resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraSaudaraSebapak > 0)
                resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPamanKandung > 0)
                resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPamanSebapak > 0)
                resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraPamanKandung > 0)
                resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPutraPamanSebapak > 0)
                resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahPriaMerdekakan > 0)
                resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahWanitaMerdekakan > 0)
                resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
              if (iJumlahSaudariSebapak > 0)
                resultToPrint += "Jatah tiap Saudari Sebapak : 0 (Karena dihalangi Saudara Sekandung)" + "<br />";
            }
            if (iJumlahSaudaraKandung == 0) {
              if (iJumlahSaudariKandung > 1) {
                iJthSaudariKandung = Math.round(2 * iHarta / 3);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudari Kandung (2/3) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                if (iJumlahSaudariSebapak > 0) {
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi 2 Saudari Kandung atau lebih)" + "<br />";
                }
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              if (iJumlahSaudariKandung == 1) {
                iJthSaudariKandung = Math.round(iHarta / 2);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung);
                resultToPrint += "Jatah tiap Saudari Kandung (1/2) : " + tandaPemisahTitik(iJthSaudariKandung / iJumlahSaudariKandung) + "<br />";
                if (iJumlahSaudariSebapak > 0) {
                  resultToPrint += "Jatah tiap Saudari Sebapak : 0(Karena dihalangi Saudari Kandung)" + "<br />";
                }
                if (iJumlahPutraSaudaraKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraSaudaraSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanKandung > 0)
                  resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanKandung > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPutraPamanSebapak > 0)
                  resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahPriaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
                if (iJumlahWanitaMerdekakan > 0)
                  resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sekandung)" + "<br />";
              }
              if (iJumlahSaudaraSebapak > 0) {
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu);
                iJthSaudaraSebapak = Math.round(iSisa / iJumlahSaudaraSebapak);
                iSisa = iHarta - (iJthSuami + iJthIbu + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudaraSebapak * iJumlahSaudaraSebapak);
                resultToPrint += "Jatah tiap Saudara Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudaraSebapak) + "<br />";
              }
            }
          }
        }
      }
      if (iJumlahSaudaraSeibu > 0)
        resultToPrint += "Jatah tiap Saudara Seibu : 0 (karena dihalangi oleh Anak Perempuan)" + "<br />";
      if (iJumlahSaudariSeibu > 0) {
        resultToPrint += "Jatah tiap Saudari Seibu : 0 (karena dihalangi oleh Anak Perempuan)" + "<br />";
      }
      if (iJumlahSaudariSebapak > 0 && iJumlahSaudariKandung == 0) {
        iSisa = iHarta - (iJthSuami + iJthIbu + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudaraSebapak * iJumlahSaudaraSebapak);
        iJthSaudariSebapak = Math.round(iSisa / iJumlahSaudariSebapak);
        iSisa = iHarta - (iJthSuami + iJthIbu + iJthCucuPerempuan + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthSaudaraSeibu + iJthSaudariKandung * iJumlahSaudariKandung + iJthSaudaraSebapak * iJumlahSaudaraSebapak + iJthSaudariSebapak * iJumlahSaudariSebapak);
        resultToPrint += "Jatah tiap Saudari Sebapak (Sisa) : " + tandaPemisahTitik(iJthSaudariSebapak / iJumlahSaudariSebapak) + "<br />";
        if (iJumlahPutraSaudaraKandung > 0)
          resultToPrint += "Jatah tiap Putra dari Saudara Kandung : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
        if (iJumlahPutraSaudaraSebapak > 0)
          resultToPrint += "Jatah tiap Putra dari Saudara Sebapak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
        if (iJumlahPamanKandung > 0)
          resultToPrint += "Jatah tiap Paman Sekandung : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
        if (iJumlahPamanSebapak > 0)
          resultToPrint += "Jatah tiap Paman Sebapak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
        if (iJumlahPutraPamanKandung > 0)
          resultToPrint += "Jatah tiap Putra dari Paman Kandung : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
        if (iJumlahPutraPamanSebapak > 0)
          resultToPrint += "Jatah tiap Putra dari Paman Sebapak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
        if (iJumlahPriaMerdekakan > 0)
          resultToPrint += "Jatah tiap Pria yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
        if (iJumlahWanitaMerdekakan > 0)
          resultToPrint += "Jatah tiap Wanita yang Memerdekakan Budak : 0 (Karena dihalangi Saudari Sebapak)" + "<br />";
      }
      iSisa = iHarta - (iJthSuami * iJumlahSuami + iJthIstri * iJumlahIstri + iJthIbu * iJumlahIbu + iJthBapak * iJumlahBapak + iJthKakek * iJumlahKakek + iJthNenekBapak * iJumlahNenekBapak + iJthNenekIbu * iJumlahNenekIbu + iJthNenekKakek * iJumlahNenekKakek + iJthAnakLaki * iJumlahAnakLaki + iJthAnakPerempuan * iJumlahAnakPerempuan + iJthCucuPerempuan * iJumlahCucuPerempuan + iJthCucuLaki * iJumlahCucuLaki + iJthSaudaraKandung * iJumlahSaudaraKandung);
    }

    if (iJumlahBapak == 0) {
      if (iJumlahKakek > 0) {
        if (iJumlahAnakLaki > 0) {
          resultToPrint += "Jatah Kakek (1" + "/" + Math.round(iHarta / iJthKakek) + "): " + tandaPemisahTitik(iJthKakek) + "<br />";
        }
        if (iJumlahAnakLaki == 0 && iJumlahAnakPerempuan > 0) {
          resultToPrint += "Jatah Kakek (1/6+Sisa): " + tandaPemisahTitik(iJthKakek) + "<br />";
        }
        if (iJumlahAnakLaki == 0 && iJumlahAnakPerempuan == 0) {
          resultToPrint += "Jatah Kakek (Sisa): " + tandaPemisahTitik(iJthKakek) + "<br />";
        }
      }
    }
    if (iJumlahSuami > 0)
      resultToPrint += "Jatah Suami (1" + "/" + Math.round(iHarta / iJthSuami) + "): " + tandaPemisahTitik(iJthSuami) + "<br />";
    if (iJumlahIstri > 0)
      resultToPrint += "Jatah tiap Istri (1" + "/" + Math.round((iHarta) / (iJthIstri * iJumlahIstri)) + "): " + tandaPemisahTitik(iJthIstri) + "<br />";
    if (iJumlahAnakLaki > 0)
      resultToPrint += "Jatah tiap Anak Laki-laki (Sisa) : " + tandaPemisahTitik(iJthAnakLaki) + "<br />";
    if (iJumlahAnakPerempuan > 0 && iJumlahAnakLaki > 0)
      resultToPrint += "Jatah tiap Anak Perempuan (Sisa): " + tandaPemisahTitik(iJthAnakPerempuan) + "<br />";
    if (iJumlahAnakPerempuan == 1 && iJumlahAnakLaki == 0)
      resultToPrint += "Jatah tiap Anak Perempuan (1/2): " + tandaPemisahTitik(iJthAnakPerempuan) + "<br />";
    if (iJumlahAnakPerempuan > 1 && iJumlahAnakLaki == 0)
      resultToPrint += "Jatah tiap Anak Perempuan (2/3): " + tandaPemisahTitik(iJthAnakPerempuan) + "<br />";
    if (iJumlahBapak > 0) {
      if (iJumlahAnakLaki > 0) {
        resultToPrint += "Jatah Bapak (1" + "/" + Math.round(iHarta / iJthBapak) + "): " + tandaPemisahTitik(iJthBapak) + "<br />";
      }
      if (iJumlahAnakLaki == 0 && iJumlahAnakPerempuan > 0) {
        resultToPrint += "Jatah Bapak (1/6+Sisa): " + tandaPemisahTitik(iJthBapak) + "<br />";
      }
      if (iJumlahAnakLaki == 0 && iJumlahAnakPerempuan == 0) {
        resultToPrint += "Jatah Bapak (Sisa): " + tandaPemisahTitik(iJthBapak) + "<br />";
      }
      if (iJumlahKakek > 0)
        resultToPrint += "Jatah Kakek : 0 (karena dihalangi oleh Bapak)" + "<br />";
    }
    if (iJumlahIbu > 0) {
      resultToPrint += "Jatah Ibu (1" + "/" + Math.round(iHarta / iJthIbu) + "): " + tandaPemisahTitik(iJthIbu) + "<br />";
      if (iJumlahNenekBapak > 0)
        resultToPrint += "Jatah Nenek (Ibunya Bapak) : 0 (karena dihalangi oleh Ibu)" + "<br />";
      if (iJumlahNenekIbu > 0)
        resultToPrint += "Jatah Nenek (Ibunya Ibu) : 0 (karena dihalangi oleh Ibu)" + "<br />";
      if (iJumlahNenekKakek > 0)
        resultToPrint += "Jatah Nenek (Ibunya Kakek) : 0 (karena dihalangi oleh Ibu)" + "<br />";
    }
    if (iJumlahIbu == 0) {
      if (iJumlahNenekIbu > 0 && iJumlahNenekBapak > 0) {
        resultToPrint += "Jatah Nenek (Ibunya Bapak) (1/6) : " + tandaPemisahTitik(iJthNenekBapak) + "<br />";
        resultToPrint += "Jatah Nenek (Ibunya Ibu) (1/6) : " + tandaPemisahTitik(iJthNenekIbu) + "<br />";
        if (iJumlahNenekKakek > 0)
          resultToPrint += "Jatah Nenek (Ibunya Kakek) : 0 (karena dihalangi oleh Ibunya Bapak dan Ibunya Ibu)" + "<br />";
      }
      if (iJumlahNenekBapak > 0 && iJumlahNenekIbu == 0) {
        resultToPrint += "Jatah Nenek (Ibunya Bapak) (1/6) : " + tandaPemisahTitik(iJthNenekBapak) + "<br />";
        if (iJumlahNenekKakek > 0)
          resultToPrint += "Jatah Nenek (Ibunya Kakek) : 0 (karena dihalangi oleh Nenek (Ibunya Bapak))" + "<br />";
      }
      if (iJumlahNenekIbu > 0 && iJumlahNenekBapak == 0) {
        resultToPrint += "Jatah Nenek (Ibunya Ibu) (1/6) : " + tandaPemisahTitik(iJthNenekIbu) + "<br />";
        if (iJumlahNenekKakek > 0)
          resultToPrint += "Jatah Nenek (Ibunya Kakek) : 0 (karena dihalangi oleh Nenek (Ibunya Ibu))" + "<br />";
      }
      if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0) {
        if (iJumlahNenekKakek > 0)
          resultToPrint += "Jatah Nenek (Ibunya Kakek) (1/6) : " + tandaPemisahTitik(iJthNenekKakek) + "<br />";
      }
    }
    if (iSisa > 0)
      resultToPrint += "<br />Sisa untuk kerabat terdekat : " + tandaPemisahTitik(iSisa);
    if ((iHarta + 1) < (iJthSuami + iJthSaudariKandung + iJthSaudariSebapak - 1)) {
      alert("Hasil perhitungan berikut termasuk masalah 'Aul (jumlah keseluruhan bagian ditambah hingga penyebutnya sama dengan pembilangnya). Contoh: suami =1/2 dan 2 org saudari kandung 2/3. Jika dijumlahkan hasilnya menjadi 7/6. Maka penyebutnya menjadi 7. suami dapat 3/7 dan 2 saudari kandung 4/7.");
    }
    document.getElementById('hasil').innerHTML = resultToPrint;

  }
  // Akhir dari else 1
}