export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

export function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;Secure; SameSite=None";
    }
}

export function callApi(token){
    const url = 'https://auth-server-fmp.vercel.app/test'
    const option ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
    }
    return fetch (url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error=>alert(error))
}

export function logOut(token){
    const url = 'https://auth-server-fmp.vercel.app/auth/logout'
    const option ={
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${token}`,
          }
    }
    return fetch (url, option)
        .then(response => response.json())
        .then(info=>info)
        .catch(error=>alert(error))
}

export function refreshToken(token){
    const url = 'https://auth-server-fmp.vercel.app/auth/refresh-token'
    const option ={
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${token}`,
          }
    }
    return fetch (url, option)
        .then(response => response.json())
        .then(info=>info)
        .catch(error=>alert(error))
}

export function logIn(email, password){
    let url = 'https://auth-server-fmp.vercel.app/auth/login'
    let data = {
        email: email,
        password: password
    }
    let option= {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    }
    return fetch (url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function register(email, fullName, password){
    let url = 'https://auth-server-fmp.vercel.app/auth/register'
    let data = {
        email: email,
        fullName: fullName,
        password: password
    }
    let option= {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    }
    return fetch (url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}