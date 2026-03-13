export async function getRandomProjects(count) {
    const res = await fetch(`/videos/getRandomProjects`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({count})
        
    })
    const data = await res.json();
    // console.log(data);
    if (data.error) {
        return []
    }
    return data
}

export async function getAllMovies() {
    const res = await fetch(`/videos/getAllMovies`, {
        method: 'GET',
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}


export async function getAllShows() {
    const res = await fetch(`/videos/getAllShows`, {
        method: 'GET',
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}