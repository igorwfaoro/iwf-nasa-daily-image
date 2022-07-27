const axios = require('axios').default;
const express = require('express');
const app = express();

const NASA_API = {
    baseUrl: 'https://api.nasa.gov',
    path: 'planetary/apod',
    apiKey: 'lWDf8cjsIXEw5hlCvK3oY6vQlel0PzqvjpwdaBdd'
}
const PORT = 3048

const getNasaImageBuffer = async (options = { hd: false }) => {

    const imageUrl = (await axios.get(`${NASA_API.baseUrl}/${NASA_API.path}`, {
        params: { api_key: NASA_API.apiKey }
    })).data[options.hd ? 'hdurl' : 'url'];

    const imageRaw = (await axios.get(imageUrl, {
        responseType: 'arraybuffer'
    })).data;

    return Buffer.from(imageRaw, 'utf-8');
}

app.get('/', async (req, res) => {
    res.contentType('image/jpeg');
    res.send(await getNasaImageBuffer());
});

app.get('/hd', async (req, res) => {
    res.contentType('image/jpeg');
    res.send(await getNasaImageBuffer({ hd: true }));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});