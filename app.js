const express = require("express");
const multer = require("multer");
const fs = require("fs");

const publicPath = "public/";
const port = 3000;
const app = express();
const uploadPath = './public/uploads';
const upload = multer({ dest: uploadPath });

app.use(express.static(publicPath));
app.use(express.json())
app.set('view engine', 'pug')
let modifiedTime = 0;

app.post('/public/upload', upload.single('myPhoto'), (request, response, next) => {
    fs.readdir(uploadPath, (err, items) => {
        //think about making the file name the current time
        response.render('submission', { photo: request.file.filename })
    })

})

app.post('/latest', (request, response) => {
    // serverTime = Date.now()
    let newArray = []

    fs.readdir(uploadPath, (err, items) => {

        let mostRecentTime = request.body.clientTime
        items.forEach((value) => {
            const fileModifiedTime = fs.statSync(`${uploadPath}/${value}`).mtimeMs
            if (fileModifiedTime > request.body.clientTime) {

                newArray.push([value, fileModifiedTime])
                if (mostRecentTime < fileModifiedTime) { mostRecentTime = fileModifiedTime }

            }
        })

        response.status(201)
        response.send({ images: newArray, timeStamp: mostRecentTime })
    })

})


app.get("/", (req, res) => {
    fs.readdir(uploadPath, (err, items) => {
        // console.log(items);
        res.render('index', { title: 'Kenzie Gram', photos: items })
    })
})





app.listen(port)