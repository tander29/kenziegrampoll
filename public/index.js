clientTime = Date.now()

function fetchThis() {
    console.log('neat also???')

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
            console.log(data)
        })
    // .catch(response => { console.log("error") })
    let startMe = setTimeout(fetchThis, 5000)
}

fetchThis()

