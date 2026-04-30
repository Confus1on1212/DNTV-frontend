export async function getAllUsers() {
    const res = await fetch(`/admin/getAllUsers`, {
        method: 'GET',
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function bulkUpdateUsers(changedUsers) {
    const res = await fetch("/admin/bulk-update-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changedUsers)
    });
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function bulkUpdateMovies(changedMovies) {
    const res = await fetch("/admin/bulk-update-movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changedMovies)
    });
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function bulkUpdateShows(changedShows) {
    const res = await fetch("/admin/bulk-update-shows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changedShows)
    });
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}