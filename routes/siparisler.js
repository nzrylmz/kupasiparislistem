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
    console.log("ekle", req.body);
    await global.db.siparisEkle(req.body);
    return await res.json(true);
  }catch (e) {
    console.error(e);
    return await res.json(false);
  }
});

module.exports = router;
