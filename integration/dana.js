const fetch = require('node-fetch')

var baseURL = "https://dana-api.glitch.me/api";

function requestMethod (method, headers, raw){
    var myHeader = new fetch.Headers();
    for (let i = 0; i < headers.length; i += 2){
        myHeader.append(headers[i], headers[i + 1])
    }
    
    var request = {
        method: method,
        headers: myHeader,
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
        const myHeaders = [
            "Content-type",
            "application/json"
        ]

        var raw = JSON.stringify({
            "nama_user": data.nama,
            "no_hp":data.nomorhp,
            "pass":data.password
        })

        let response = await getResponse(baseURL + "/register", requestMethod('POST', myHeaders, raw)).catch(e => { console.log(e) });
        return JSON.parse(response);
    },

    login: async function(data){
        const myHeaders = [
            "Content-type",
            "application/json"
        ]
        var raw = JSON.stringify({
            "nama_user": data.nama,
            "no_hp":data.nomorhp,
            "pass":data.password
        })

        let response = await getResponse(baseURL + "/login", requestMethod('POST', myHeaders, raw)).catch(e => { console.log(e) });
        return JSON.parse(response);
    },

    successLogin: async function(harga, tokenSarah){
        console.log("Berhasil login")
        const myHeaders = [
            "Content-type",
            "application/json",
            "Authorization",
            "Bearer " + tokenSarah
        ]
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
            tokenSarah = await this.login(data_user).catch(e => { console.log(e) });
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