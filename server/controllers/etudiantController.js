const Etudiant = require("../models/etudiants");
const fs = require("fs")
const getAllEtudiants = (req, res, next) => {
    Etudiant.find()
        .then(etudiants=>{
            if(etudiants.length > 0) res.status(200).send(etudiants)
            else{
                res.status(200).send("Aucun étudiant enregistré")
            }
        }).catch( error => {
            res.status(500).send(error);
        })
    
}

const getOneEtudiant = async (req, res, next) =>{
    const id = req.params.id
    try{
        const etudiant = await Etudiant.findById(id).exec()
        if(etudiant) res.status(200).send(etudiant)
        else res.status(200).send("Aucun étudiant correspondant à l'identifiant " + id)
    }catch (error){
        res.status(500).send(error);
    }
}

const addOneEtudiant = (req, res, next) => {
    
    const etudiant = new Etudiant({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file ? req.file.filename : "img_avatar.png",
    });
    etudiant.save()
            .then(result => {
                res.status(200).send(result)
            }).catch(error => {
                res.status(500).send(error);
            })
}

const updateEtudiant = async (req, res, next) => {
    const id = req.params.id
    let new_image = ""

    if (req.file) {
        new_image = req.file.filename
        try {
            if(req.body.old_image != "img_avatar.png")
            fs.unlinkSync("../client/public/uploads/" + req.body.old_image)
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image
    }

    try{
        const etudiant = await Etudiant.findById(id).exec()
        if(etudiant){
            etudiant.set({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                image: new_image,
            })
            const result = await etudiant.save()
            res.status(200).send(result)
        }else{
            res.status(200).send("Aucun étudiant correspondant à l'identifiant " + id)
        }
    }catch(error){
        res.status(500).send(error);
    }
}

const deleteEtudiant = async (req, res, next) => {
    const id = req.params.id
    try{
        const etudiant = await Etudiant.findById(id).exec()
        if(etudiant){
            const result = await Etudiant.findByIdAndRemove(id).exec()
            if(etudiant.image != "img_avatar.png") {
                try {
                    fs.unlinkSync("../client/public/uploads/" + etudiant.image)
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).send("Etudiant supprimé avec succès")
        }else{
            res.status(200).send("Aucun étudiant correspondant à l'identifiant " + id)
        }
        
    }catch(error){
        res.status(500).send(error);
    }
}

const deleteAllEtudiants = async (req, res, next) => {
    try{
        const result = await Etudiant.deleteMany()
        res.status(200).send(result.deletedCount + " étudiants sont supprimés avec succès !")
    }catch(error){
        res.status(500).send(error);
    }
}

const findSomeEtudiantsByConditions = (req, res, next) => {
    const nom = "Nantenaina"
    Etudiant.find({name:nom})
            .then(etudiants=>{
                if(etudiants.length > 0){
                    res.status(200).send(etudiants)
                }else{
                    res.status(200).send("Aucun étudiant correspondant au nom " + nom)
                }
            }).catch(error => {
                res.status(500).send(error);
            })
}


module.exports = {getAllEtudiants, getOneEtudiant, addOneEtudiant, updateEtudiant, deleteEtudiant, deleteAllEtudiants, findSomeEtudiantsByConditions}