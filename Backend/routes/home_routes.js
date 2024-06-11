const router = require('express').Router()
const {uploadPdf,getPdfs} = require('../controllers/pdf_controller')

router.post('/upload', uploadPdf);
router.get('/',getPdfs)
module.exports = router;