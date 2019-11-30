const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const bcrypt = require("bcryptjs");

const siparislerRouter = require('./routes/siparisler');
const sessionKontrol = require("./helpers/sessionKontrol");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('trust proxy', 1);
app.use(session({
    secret: 'sj34ilai456lsd64şğd636s3dfw46e8f465d1523c65e1dc65f..öçöğşüğüaüwd..çqıojwdıoa',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/siparis', sessionKontrol, siparislerRouter);

app.post("/api/giris", async(req,res) => {
    try{
        const { kullaniciAdi, kullaniciSifre } = req.body;

        const [kullanici] = await global.db.kullaniciCek(kullaniciAdi);
        if(kullanici.kullaniciAdi === kullaniciAdi && kullanici.kullaniciSifre === kullaniciSifre){
            req.session.kullanici = { ID:kullanici.ID };
            res.json(true);
        } else {
            res.json(false);
        }
    }catch (e) {
        console.error(e);
        res.json(false);
    }
});

app.post("/api/cikis", sessionKontrol, (req,res) =>{
    delete req.session.kullanici;
    console.log("Çıkış", req.session.kullanici);
    res.json(true);
});

app.get("/api/giriskontrol", sessionKontrol, (req,res) =>{
    res.json(true);
});

app.post("/api/kayitol", async(req,res) => {
    try{
        let { kullaniciAdi, kullaniciSifre } = req.body;
        kullaniciSifre = await bcrypt.hash(kullaniciSifre, 5);
        await global.db.kayitOl(kullaniciAdi,kullaniciSifre);
        res.json(true);
    }catch (e) {
        console.log(e);
        res.json(false);
    }
});

app.use("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
