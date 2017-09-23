// Import Model
let Ville = require('../models/ville');

module.exports = (app) => {
    
    // GET Ville Page
    app.get("/ville", (req, res) => {
        Ville.find({}, (err, villes) => {
            if(err){
                console.log(err);
            } else {
                if(req.xhr) {
                    res.json(villes)
                } else {
                    res.render("ville/index", {villes: villes, title: 'Index Ville || GZL'}); 
                }
            }
        })
    });

    app.post("/ville", (req, res) => {
        req.body.ville.name = req.sanitize(req.body.ville.name);
        var formData = req.body.ville;
        Ville.create(formData, (err, newVille) => {
            if(err){
                console.log(err);
            } else {
                res.json(newVille);
            }
        });
    });

    app.put("/ville/:id", (req, res) => {
        Ville.findByIdAndUpdate(req.params.id, req.body.ville, {new: true}, (err, ville) => {
            if(err){
                console.log(err);
            } else {
                res.json(ville);
            }
        });
    });
       
    app.delete("/ville/:id", (req, res) => {
        Ville.findByIdAndRemove(req.params.id, (err, ville) => {
            if(err){
                console.log(err);
            } else {
                res.json(ville);
            }
        }); 
    });

}