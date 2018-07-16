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
    modifiedTime = fs.statSync(uploadPath).mtimeMs;
    fs.readdir(uploadPath, (err, items) => {
        response.render('submission', { photo: request.file.filename })
    })

})

app.post('/latest', (request, response) => {
    // serverTime = Date.now()
    let newArray = []
    fs.readdir(uploadPath, (err, items) => {
        request.body.timeStamp = modifiedTime
        console.log(items)

        items.forEach((value) => {
            const fileModifiedTime = fs.statSync(`${uploadPath}/${value}`).mtimeMs

            if (fileModifiedTime > request.body.timeStamp) {
                console.log('this was cool')

                newArray.push([value, fileModifiedTime])
            }
        })

        response.status(201)
        response.send({ images: newArray })
    })

})






app.get("/", (req, res) => {
    modifiedTime = fs.statSync(uploadPath).mtimeMs;
    fs.readdir(uploadPath, (err, items) => {
        // console.log(items);
        res.render('index', { title: 'Kenzie Gram', photos: items })
    })
})

function getThis() {
    app.get("/", (req, res) => {
        fs.readdir(uploadPath, (err, items) => {
            // console.log(items);
            res.render('index', { title: 'Kenzie Gram', photos: items })
        })
    })
}



app.listen(port)