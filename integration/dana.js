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

async function getResponse(requestMethod){
    try {
        let res = await fetch(url, requestMethod)
        console.log("Fetch berhasil");
        return await (res.text());
    } catch(error) {
        console.log('error', error)
    };
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

        let response = await getResponse(baseURL + "/register", requestMethod('POST', myHeaders, raw));
        console.log(JSON.parse(response));
    }
}

module.exports = integration;