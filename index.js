const express = require("express");
const app = express();
const axios = require("axios");
const agents = require("./user-agents.json")
const renderHtmlWithMeta = require("./utils/meta-tags.js")
const generateImage = require('./utils/preview-image')

// test link you can use to check how it works: https://dev.vidby.com/order/H799622/share

app.get("/order/:id/share", (req, res) => {
    const id = req.params.id
    const agent = req.get('User-Agent')
    console.log('connected from: ', agent)
    const url = `https://dev.vidby.com/order/${id}/share`

    axios.get(`https://dev.vidby.com/api/v1/orders/orders/${id}/`)
        .then((response) => {
            if (response.status === 200) {
                const orderData = {...response.data}

                if (agents.some(i => i.instances.includes(agent))) {
                    console.log('Agent Bot detected. Rendering html with og:meta')
                    // if BOT detected redirect to app in 3 secs
                    return res.send(renderHtmlWithMeta(
                        orderData.title,
                        orderData.description,
                        generateImage(orderData.url),
                        url
                    ))
                }
            }
            // if BOT isn't detected return to app immediately with timeout 0
            return res.send(`<html><meta http-equiv="refresh" content="0;url=${url}" /></html>`)
        })
        .catch(err => {
            console.log('Request to vidby api failed: ', err)
            // onerror redirect to main app as well
            return res.send(`<html><meta http-equiv="refresh" content="0;url=${url}" /></html>`)
        })
});
// Important: Probably redirects should be used via nginx methods, not meta tag.
app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});