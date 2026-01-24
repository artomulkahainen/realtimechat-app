const GET_METHOD = 'GET';
const POST_METHOD = 'POST';

export async function get<T>(url: string): Promise<T> {
    return (
        await fetch(url, {
            method: GET_METHOD,
        })
    ).json();
}

export async function post<T, V>(url: string, body: V): Promise<T> {
    return (
        await fetch(url, {
            method: POST_METHOD,
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
    ).json();
}
