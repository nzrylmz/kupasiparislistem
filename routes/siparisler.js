const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
  try{
    const siparisler = await global.db.tumSiparisler();
    return await res.json(siparisler);
  }catch (e) {
    return await res.json(false);
  }
});

router.post("/ekle", async(req,res) => {
  try{
    await global.db.siparisEkle(req.body);
    return await res.json(true);
  }catch (e) {
    console.error(e);
    return await res.json(false);
  }
});

router.delete("/sil/:siparisID", async(req,res) => {
  try{
    const sil = await global.db.siparisSil(req.params.siparisID);
    console.log(sil);
    res.json(true);
  }catch (e) {
    console.error(e);
    return await res.json(false);
  }
});

module.exports = router;
