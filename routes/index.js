var express = require('express');
var imageThumbnail = require('image-thumbnail');
var fastJsonPatch = require('fast-json-patch');
var {ensureAuthenticated} = require('../config/auth');
var router = express.Router();

// JSON Patch Endpoint
/*
Send the data as x-www-form-urlencoded
params:
    - json // Example : { "firstName":"Albert", "contactDetails": { "phoneNumbers": [ ] } }
    - patch // Example : [{"op":"replace","path":"/firstName","value":"Joachim"},{"op":"add","path":"/lastName","value":"Wester"},{"op":"add","path":"/contactDetails/phoneNumbers/0","value":{"number":"555-123"}}]
*/
router.post('/:token/patchJson', ensureAuthenticated, function(req, res, next) {
    try{
        var result = fastJsonPatch.applyPatch( JSON.parse(req.body.json), JSON.parse(req.body.patch) );
        res.send(result)
    }catch(e){
        res.send("error")
    }
});

// Thumbnail Endpoint
/*
Send the data as x-www-form-urlencoded
params:
    -imageUrl: valid public url for the image
*/
router.post('/:token/generateThumbnail', ensureAuthenticated, function(req, res, next) {
    var imageUrl = req.body.imageUrl
    let options = { height: 50, width: 50 }
    try {
        const thumbnail = imageThumbnail({ uri: imageUrl }, options).then((thumbnail)=>{
            res.setHeader("content-type", "image/png");
            res.send(thumbnail);
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
