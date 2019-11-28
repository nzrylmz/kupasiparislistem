const kontrol = (req,res,next) => {
    if(req.session.kullanici){
        console.log("Session var! ", req.session.kullanici);
        next();
    } else {
        console.log("Session yok! ", req.session.kullanici);
        res.json({girisYapilmadi:true});
    }
};

module.exports = kontrol;