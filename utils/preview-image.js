module.exports = function generateImage(url) {
    if (url.includes('youtube')) {
        return `https://img.youtube.com/vi/${url.split('?v=')[1]}/mqdefault.jpg`
    }
    return ''
}