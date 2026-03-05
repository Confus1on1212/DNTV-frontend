const BACKEND_URL = "http://192.168.9.105:4000/videos";

export async function getFeatured(count) {
    const res = await fetch(`${BACKEND_URL}/getFeatured`,{
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