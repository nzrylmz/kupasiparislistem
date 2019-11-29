const mysql = require("mysql");

class veritabani {

    constructor(){
        /*this.dbConfig = {
            host: "localhost",
            user: "root",
            password: "123456789",
            database: "kupasiparis"
        };*/
        this.dbConfig = {
            host: "eu-cdbr-west-02.cleardb.net",
            user: "b38223363412f4",
            password: "c4c95562",
            database: "heroku_36b27fb1c60b780",
            waitForConnections: true,
            connectionLimit: 0, // 10
            queueLimit: 0
        };
        this.db = mysql.createPool(this.dbConfig);
    }

    tumSiparisler() {
        return new Promise((resolve,reject) => {
            this.db.query("SELECT * FROM siparisler", (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        })
    }

    siparisEkle(siparis) {
        return new Promise((resolve, reject) => {
            this.db.query(
                "INSERT INTO siparisler SET adSoyad=?, telNo=?, toplamFiyat=?, aciklama=?, kargoAdresi=?",
                [siparis.adSoyad, siparis.telNo, siparis.toplamFiyat, siparis.aciklama, siparis.kargoAdresi],
                (err,data) => {
                    if(err) return reject(err);
                    resolve(data);
                });
        })
    }

    siparisSil(siparisID) {
        return new Promise((resolve,reject) => {
            this.db.query(
                "DELETE FROM siparisler WHERE ID=?",
                [siparisID],
                (err, data) => {
                    console.log({err,data});
                    if(err) return reject(err);
                    resolve(data);
                }
            )
        })
    }

}

module.exports = veritabani;