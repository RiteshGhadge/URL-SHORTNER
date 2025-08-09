const shortid = require('shortid');
const URL = require('../models/url');

async function handlegenerateshorturl(req, res) {
    const body = req.body;

    if (!body.url) return res.status(400).json({ error: 'url is required' });
    const shortID = shortid(); 

    await URL.create({
        ShortId: shortID,  
        redirectURL: body.url,
        visitHistory: [],  // Remove empty object from array
    });

    return res.json({ id: shortID });
}

async function getanalytics(req, res) {
    const shortId = req.params.shortId;
    
    const result = await URL.findOne({ ShortId: shortId });  // Fixed query and added result variable
    
    if (!result) {
        return res.status(404).json({ error: 'URL not found' });
    }
    
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handlegenerateshorturl,
    getanalytics
};