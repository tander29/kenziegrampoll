clientTime = Date.now()
let errCount = 0
fetchThis()
function fetchThis() {


    const postRequestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'clientTime': clientTime })
    }

    fetch('/latest', postRequestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('I was runnin--Forest')
            if (data.timeStamp > clientTime) {
                console.log('ltn Dan!')
                appendNewImages(data)

            }
            errCount = 0
            setTimeout(fetchThis, 5000)
        })
        .catch(err => {
            errCount++
            console.log(err)
            if (errCount === 1) {
                console.log("Failed once")
                alert("Losing Connection, click to attempt to reconnect to server")
                setTimeout(fetchThis, 3000)
            }
            if (errCount === 2) {
                console.log("Failed twice")
                alert("Unable to connect to server")
                document.getElementById("wrapper").textContent = "Lost Connection"
            }

        })

    // .catch(response => { console.log("error") })

}

function appendNewImages(data) {

    console.log("update")
    data.images.forEach(element => {
        if (element[1] > clientTime) {

            let newImage = document.createElement("img")
            newImage.src = "/uploads/" + element[0]
            // document.getElementById("newPhoto").appendChild(newImage)
            document.getElementById("wrapper").prepend(newImage)
        }


    });
    clientTime = data.timeStamp

}




