const api_key = "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"

export async function generate(prompt, obj) {

    if (obj) {
        console.log("Obj exists: ", obj)
    } else {
        console.log("No Object")
    }

    let res = "None"
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(api_key)
        },
        body: JSON.stringify({
            'prompt': prompt,
            'temperature': obj ? obj.temperature : 0.1,
            'max_tokens': obj ? obj.max_tokens : Math.floor(2000),
            'top_p': 1,
            'frequency_penalty': obj ? obj.frequency_penalty : 0,
            'presence_penalty': obj ? obj.presence_penalty : 0.5,
            'stop': ["\"\"\""],
        })
    };
    await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
        .then(response => response.json())
        .then(data => {
            res = data.choices[0].text
        }).catch(err => {
            console.log("Ran out of tokens for today! Try tomorrow!");
            res = "Ran out of tokens"
        });
    return res
}



