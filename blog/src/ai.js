const api_key = 'Enter your API key here';

export async function generate(prompt, obj) {
    let res = 'None';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(api_key),
        },
        body: JSON.stringify({
            prompt: prompt,
            temperature: obj ? obj.temperature : 0.1,
            max_tokens: obj ? obj.max_tokens : Math.floor(2000),
            top_p: 1,
            frequency_penalty: obj ? obj.frequency_penalty : 0,
            presence_penalty: obj ? obj.presence_penalty : 0.5,
            stop: ['"""'],
        }),
    };
    await fetch(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            res = data.choices[0].text;
        })
        .catch((err) => {
            res = 'Ran out of tokens';
        });
    return res;
}

export async function generateCSVLine(obj, dataObj) {
    let prompt = 'Write a blog about ' + dataObj.topic;

    if (dataObj.title) {
        prompt += ' with the title ' + dataObj.title;
    }
    if (dataObj.keywords) {
        prompt += ' using the keywords ' + dataObj.keywords;
    }
    if (dataObj.tone) {
        prompt += ' with a ' + dataObj.tone + ' tone';
    }
    if (dataObj.audience) {
        prompt += ' for the audience ' + dataObj.audience;
    }
    if (dataObj.maxLength) {
        prompt += ' with a maximum length of ' + dataObj.maxLength;
    }
    if (dataObj.subheadings) {
        prompt += ' with the subheadings ' + dataObj.subheadings;
    }

    let res = 'None';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(api_key),
        },
        body: JSON.stringify({
            prompt: prompt,
            temperature: obj ? obj.temperature : 0.1,
            max_tokens: obj ? obj.max_tokens : Math.floor(2000),
            top_p: 1,
            frequency_penalty: obj ? obj.frequency_penalty : 0,
            presence_penalty: obj ? obj.presence_penalty : 0.5,
            stop: ['"""'],
        }),
    };
    await fetch(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            res = data.choices[0].text;
        })
        .catch((err) => {
            res = 'Ran out of tokens';
        });
    return res;
}
