const express = require("express")

const {getAllEtudiants, getOneEtudiant, addOneEtudiant, updateEtudiant, deleteEtudiant, 
    deleteAllEtudiants, findSomeEtudiantsByConditions} = require("../controllers/etudiantController")

const router = express.Router()

const multer = require("multer")

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const DIR = '../client/public/uploads/';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, DIR)
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        //console.log(extension);
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single("image")

/* GET ALL ETUDIANTS */
router.get("/etudiants", getAllEtudiants);

/* GET SINGLE ETUDIANT BY ID */
router.get('/etudiant/:id', getOneEtudiant);

/* SAVE ONE ETUDIANT */
router.post("/add-etudiant", upload, addOneEtudiant);

// UPDATE ETUDIANT
router.put('/etudiant/:id', upload, updateEtudiant);

/* DELETE ONE ETUDIANT */
router.delete('/etudiant/:id', deleteEtudiant);

router.delete('/etudiants', deleteAllEtudiants);

router.get('/etudiants-with-name', findSomeEtudiantsByConditions);

module.exports = router;