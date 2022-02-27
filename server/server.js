import express from 'express';
const app = express()
const port = 3000
import fs from 'fs';
import path from 'path';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../src/App'

app.use('^/$', function (req, res, next) {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("err");
        } else {
            res.send(data.replace('<div id="root"></div>', `<div id="root">${ReactDOMServer.renderToString(<App></App>)}</div>`))
        }
    })
})

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
