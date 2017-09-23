// Import Model
var Ville = require('../models/ville');

module.exports = (app) => {
    
    // GET Ville Page
    app.get("/ville", function(req, res){
        Ville.find({}, function(err, villes){
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

    app.post("/ville", function(req, res){
        req.body.ville.name = req.sanitize(req.body.ville.name);
        var formData = req.body.ville;
        Ville.create(formData, function(err, newVille){
            if(err){
                console.log(err);
            } else {
                res.json(newVille);
            }
        });
    });

    app.put("/ville/:id", function(req, res){
        Ville.findByIdAndUpdate(req.params.id, req.body.ville, {new: true}, function(err, ville){
            if(err){
                console.log(err);
            } else {
                res.json(ville);
            }
        });
    });
       
    app.delete("/ville/:id", function(req, res){
        Ville.findByIdAndRemove(req.params.id, function(err, ville){
            if(err){
                console.log(err);
            } else {
                res.json(ville);
            }
        }); 
    });

}