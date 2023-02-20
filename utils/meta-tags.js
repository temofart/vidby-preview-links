module.exports = function renderHtmlWithMeta(title, description, image, url, timeout = 3) {
    return `<html>
        <meta property="og:type" content="website">
        <meta property="og:url" content="${url}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${image}">
        
        <!--        redirect is here: -->
        <meta http-equiv="refresh" content="${timeout};url=${url}/public" />
        <body></body></html>`
}