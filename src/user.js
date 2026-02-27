const BACKEND_URL = "http://192.168.9.105:4000/users";

export async function register(email, username, psw) {
    const res = await fetch(`${BACKEND_URL}/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email, username, psw})
        
    })
    const data = await res.json();
    // console.log(data);
    if (data.error) {
        return data
    }
    return data
}


export async function login(email, psw){
    const res = await fetch(`${BACKEND_URL}/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email, psw})
    })
    const data = await res.json()
    if (data.error) {
        return data
    }
    return data
}

