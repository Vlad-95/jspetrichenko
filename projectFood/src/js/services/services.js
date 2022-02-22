const postData = async function(url, data) {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: data
    });

    return await result.json(); // Это промис
};

const getResource = async function(url) {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Сould not fetch ${url}, status ${result.status}`);
    }

    return await result.json(); // Это промис
};

export {postData};
export {getResource};