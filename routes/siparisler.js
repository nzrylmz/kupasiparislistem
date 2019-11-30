const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
  try{
    const siparisler = await global.db.tumSiparisler();
    res.json(siparisler);
  }catch (e) {
    res.json(false);
  }
});

router.post("/ekle", async(req,res) => {
  try{
    await global.db.siparisEkle(req.body);
    res.json(true);
  }catch (e) {
    console.error(e);
    res.json(false);
  }
});

router.delete("/sil/:siparisID", async(req,res) => {
  try{
    const sil = await global.db.siparisSil(req.params.siparisID);
    console.log(sil);
    res.json(true);
  }catch (e) {
    console.error(e);
    res.json(false);
  }
});

module.exports = router;
