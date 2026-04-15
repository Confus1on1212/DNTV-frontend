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

export async function getTopRatedTVseries(count) {
    const res = await fetch(`/videos/getTopRatedTVseries/${count}`, {
        method: 'GET',
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function getTopRatedTVMovies(count) {
    const res = await fetch(`/videos/getTopRatedMovies/${count}`, {
        method: 'GET',
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function getTopRatedTVSeriesAndMovies(count) {
    const res = await fetch(`/videos/getTopRatedTVSeriesAndMovies/${count}`, {
        method: 'GET',
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function getMovie(id) {
    const res = await fetch(`/videos/getMovie?movieid=${id}`, {
        method: 'GET',
        credentials: "include"
    })
    const data = await res.json()
    if (!res.ok) {
        console.error("Szerverhiba:", data);
        
        throw new Error(data.error || 'Ismeretlen hiba történt a film lekérésekor.');
    }
    return data[0];
}

export async function getShowEpisodes(id) {
    const res = await fetch(`/videos/getShowEpisodes?showid=${id}`, {
        method: 'GET',
        credentials: "include"
    })
    const data = await res.json()
    if (!res.ok) {
        console.error("Szerverhiba:", data);
        
        throw new Error(data.error || 'Ismeretlen hiba történt a film lekérésekor.');
    }
    return data;
}

export async function getEpisode(id, episode, season) {
    const res = await fetch(`/videos/getShow?showid=${id}&episode=${episode}&season=${season}`, {
        method: 'GET',
        credentials: "include"
    })
    const data = await res.json()
    if (!res.ok) {
        console.error("Szerverhiba:", data);
        
        throw new Error(data.error || 'Ismeretlen hiba történt a episode lekérésekor.');
    }
    // console.log(data[0]);
    return data[0];
}