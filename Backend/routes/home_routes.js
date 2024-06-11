const {uploadPdf,getPdfs} = require('../controllers/pdf_controller')
const requireAuth = require ('../middleware/requireAuth')
const router = require('express').Router()

router.use(requireAuth)

router.post('/upload', uploadPdf);

router.get('/',getPdfs)
module.exports = router;