const express= require('express');
const multer= require('multer');
const { handlePDFUpload }= require('../controllers/quizController');

const router= express.Router();

const upload= multer({ storage: multer.memoryStorage() });



router.post('/upload', upload.single('file'), handlePDFUpload);

module.exports = router;