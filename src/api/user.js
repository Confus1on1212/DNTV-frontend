export async function register(email, username, psw) {
    const res = await fetch(`/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, psw })

    })
    const data = await res.json();
    console.log(data);
    return data
}

export async function login(email, psw) {
    const res = await fetch(`/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, psw })
    })
    const data = await res.json()
    return data
}

export async function whoami() {
    const res = await fetch(`/users/whoami`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function logout() {
    const res = await fetch(`/users/logout`, {
        method: 'POST',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json() 
        return {error: data?.error}
    }
    return await res.json()
}

export async function sendFeedback(feedbackData) {
    // console.log("Adatok küldése a szervernek:", feedbackData);

    const res = await fetch(`/feedback/postFeedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(feedbackData)
    });

    const responseData = await res.json();
    
    if (!res.ok) {
        console.log(responseData.error);
        throw new Error(responseData.error || 'Hiba a visszajelzés küldésekor.');
    }
    
    return responseData;
}

export function updateUser(userData) {
    
}