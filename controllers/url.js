const shortid = require('shortid');
const URL = require('../models/url');

async function handleGeneratenewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error : 'URL is required'});
    const shortId = shortid();
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[]
    })
return res.json({id : shortId});
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result =  await URL.findOne({ shortId : shortId })
    return res.json (
        {
            totalClicks: result.viewHistory.length,
            analytics: result.viewHistory
        })
}

module.exports = {
    handleGeneratenewShortURL,
    handleGetAnalytics
}