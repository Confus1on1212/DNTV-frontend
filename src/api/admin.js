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