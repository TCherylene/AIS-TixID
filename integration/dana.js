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

async function getResponse(url, requestMethod){
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
        return JSON.parse(response);
    },

    login: async function(data){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
            "nama_user": data.nama,
            "no_hp":data.nomorhp,
            "pass":data.password
        })

        let response = await getResponse(baseURL + "/login", requestMethod('POST', myHeaders, raw));
        return JSON.parse(response);
    },

    pembayaran: async function(data_user, data){
        console.log (data_user)
        let dataToken = await this.login(data_user);
        console.log(dataToken)

        if(dataToken.success == true){
            console.log("Login berhasil");

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + dataToken.token)
            myHeaders.append("Content-Type", "application/json")
    
            var raw = JSON.stringify({
                price: data
            })
    
            let response = await getResponse(baseURL + "/transaksi", requestMethod('POST', myHeaders, raw));
            console.log("Berhasil mengirim request pembayaran");
            console.log(response);
            return JSON.parse(response);
        } 
    }
}

module.exports = integration;