//Change second url to deployed api url when api is deployed
const BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}';

export async function getFetch(url: string) {
    const response = await fetch(BASE_URL + url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function postData<T>(url: string, data: T) {
    const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function putData<T>(url: string, data: T) {
    const response = await fetch(BASE_URL + url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function deleteData(url: string) {
    const response = await fetch(BASE_URL + url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
