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

    successLogin: async function(harga, tokenSarah){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + tokenSarah)
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
            price: harga
        })

        var txtRequest = requestMethod('POST', myHeaders, raw)

        let response = await getResponse(baseURL + "/transaksi", txtRequest);
        console.log("Berhasil mengirim request pembayaran");
        console.log(response);
        return JSON.parse(response);
    },

    pembayaran: async function(data_user, data, tokenSarah){
        if(tokenSarah == null){
            tokenSarah = await this.login(data_user);
            console.log(tokenSarah)

            if(tokenSarah.success == true){
                return this.successLogin(data, tokenSarah.token)
            }

            else return false;
        } else {
            return this.successLogin(data, tokenSarah)
        }
    }
}

module.exports = integration;