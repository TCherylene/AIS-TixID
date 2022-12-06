var baseURL = "https://dana-api.glitch.me/api";

function requestMethod (method, headers, raw){
    var request = {
        method: method,
        headers: headers,
        body: raw,
        redirect: 'follow'
    }

    return request;
}

const integration = {
    registrasi: async function(data){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
            "nama_user": data.nama,
            "no_hp":data.nomorhp,
            "pass":data.password
        })

        console.log("Data json" + raw);

        await fetch(baseURL + "/register", requestMethod('POST', myHeaders, raw))
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log ('error', error))
    }
}

module.exports = integration;