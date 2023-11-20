
function airtablePost(myState,ctx) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
    "Authorization",
    "Bearer patbAqdmJO0ntHHYL.e784ce069516df6c8f7cbcda8279ed0ca28cae0d4f1b1f0a3320c6d7529e0f14"
    );
    myHeaders.append(
    "Cookie",
    "brw=brwANjCWu7Pu0BFn0; AWSALB=29fABRZxwFwYM9gpP6AE7pgXMo0Q2pyDchvwjUVMC4C0Xx0Vthryuhep5rYnKKEk3iYvxSX0l8toSue5q0gJ6HHJ1rJkUS4BcKnaWBW8PMaPpv4YDX+HhHjxM9Tz; AWSALBCORS=29fABRZxwFwYM9gpP6AE7pgXMo0Q2pyDchvwjUVMC4C0Xx0Vthryuhep5rYnKKEk3iYvxSX0l8toSue5q0gJ6HHJ1rJkUS4BcKnaWBW8PMaPpv4YDX+HhHjxM9Tz"
    );

    var raw = JSON.stringify({
    fields: {
        nombre: `${myState.nombre}`,
        telefono: `${ctx.WaId}`,
        correo: `${myState.correo}`,
    },
    });

    var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "manual",
    };

    fetch(
    "https://api.airtable.com/v0/appbSfEIG0OB8UdVa/tbl7cuRpSiWy7ySgv/",
    requestOptions
    )
};

function airtableAnswers(myState,ctx) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
    "Authorization",
    "Bearer patbAqdmJO0ntHHYL.e784ce069516df6c8f7cbcda8279ed0ca28cae0d4f1b1f0a3320c6d7529e0f14"
    );
    myHeaders.append(
    "Cookie",
    "brw=brwANjCWu7Pu0BFn0; AWSALB=29fABRZxwFwYM9gpP6AE7pgXMo0Q2pyDchvwjUVMC4C0Xx0Vthryuhep5rYnKKEk3iYvxSX0l8toSue5q0gJ6HHJ1rJkUS4BcKnaWBW8PMaPpv4YDX+HhHjxM9Tz; AWSALBCORS=29fABRZxwFwYM9gpP6AE7pgXMo0Q2pyDchvwjUVMC4C0Xx0Vthryuhep5rYnKKEk3iYvxSX0l8toSue5q0gJ6HHJ1rJkUS4BcKnaWBW8PMaPpv4YDX+HhHjxM9Tz"
    );
    var id = ctx.WaId ? ctx.WaId : '0';
    var motivo = myState.motivo ? myState.motivo : '0';
    var cotizar = myState.cotizar ? myState.cotizar : '0';
    var ciudad = myState.ciudad ? myState.ciudad : '0';
    var catalogo = myState.catalogo ? myState.catalogo : '0';


    var raw = JSON.stringify({
        
    fields: {
        Id: `${id}`,
        motivo: `${motivo}`,
        cotizar: `${cotizar}`,
        ciudad: `${ciudad}`,
        catalogo: `${catalogo}`
    },
    });
    console.log(raw)

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "manual",
        };
    
        fetch(
        "https://api.airtable.com/v0/appbSfEIG0OB8UdVa/tblWYZzt9qqoxybuY/",
        requestOptions
        )
};

async function airtableGetFlows() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer patbAqdmJO0ntHHYL.e784ce069516df6c8f7cbcda8279ed0ca28cae0d4f1b1f0a3320c6d7529e0f14");
    myHeaders.append("Cookie", "brw=brwANjCWu7Pu0BFn0; AWSALB=55Rj3MkFGMbzvYDKV2YHkUyj9qvLprF/bLMGVdCCoEYotDVQpYNHJP9KxFuQHWHWSSFtOVET9G7Aieo6OvIZYuYIVNZxUuH+d3GMk9rf3Vs74HRvYAs7kIVA324V; AWSALBCORS=55Rj3MkFGMbzvYDKV2YHkUyj9qvLprF/bLMGVdCCoEYotDVQpYNHJP9KxFuQHWHWSSFtOVET9G7Aieo6OvIZYuYIVNZxUuH+d3GMk9rf3Vs74HRvYAs7kIVA324V");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'manual'
    };

    var response = await fetch("https://api.airtable.com/v0/appbSfEIG0OB8UdVa/tblQeHrH14o89qJx4/", requestOptions)
    var text = await response.text();

    return JSON.parse(text)
};

async function airtableGet() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer patbAqdmJO0ntHHYL.e784ce069516df6c8f7cbcda8279ed0ca28cae0d4f1b1f0a3320c6d7529e0f14");
    myHeaders.append("Cookie", "brw=brwANjCWu7Pu0BFn0; AWSALB=55Rj3MkFGMbzvYDKV2YHkUyj9qvLprF/bLMGVdCCoEYotDVQpYNHJP9KxFuQHWHWSSFtOVET9G7Aieo6OvIZYuYIVNZxUuH+d3GMk9rf3Vs74HRvYAs7kIVA324V; AWSALBCORS=55Rj3MkFGMbzvYDKV2YHkUyj9qvLprF/bLMGVdCCoEYotDVQpYNHJP9KxFuQHWHWSSFtOVET9G7Aieo6OvIZYuYIVNZxUuH+d3GMk9rf3Vs74HRvYAs7kIVA324V");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'manual'
    };

    var response = await fetch("https://api.airtable.com/v0/appbSfEIG0OB8UdVa/tbl7cuRpSiWy7ySgv/", requestOptions)
    var text = await response.text();

    return text
};

module.exports = { airtablePost,airtableGet,airtableAnswers,airtableGetFlows }