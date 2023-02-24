const { Configuration, OpenAIApi } = require("openai");
const api_key = "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"

// export class OpenAI {
//     constructor() {
//         // Create the Configuration and OpenAIApi instances
//         this.openai = new OpenAIApi(new Configuration({ api_key }));
//     }
//     // Asynchronous function to generate text from the OpenAI API
//     async generateText(prompt, model, max_tokens, temperature = 0.85) {
//         try {
//             // Send a request to the OpenAI API to generate text
//             const response = await this.openai.createCompletion({
//                 model,
//                 prompt,
//                 max_tokens,
//                 n: 1,
//                 temperature,
//             });
//             console.log(`request cost: ${response.data.usage.total_tokens} tokens`);
//             // Return the text of the response
//             console.log(response.data.choices[0].text)
//             return response.data.choices[0].text;
//         } catch (error) {
//             throw error;
//         }
//     }
// }


export async function generate(prompt) {
    // let prompt = "Write a blog post about machine learning in the tone of a pirate"
    let res = "None"
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(api_key)
        },
        body: JSON.stringify({
            'prompt': prompt,
            'temperature': 0.1,
            'max_tokens': Math.floor(2000),
            'top_p': 1,
            'frequency_penalty': 0,
            'presence_penalty': 0.5,
            'stop': ["\"\"\""],
        })
    };
    await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
        .then(response => response.json())
        .then(data => {
            // Do something with data
            //console.log(data.choices[0].text)
            res = data.choices[0].text
        }).catch(err => {
            console.log("Ran out of tokens for today! Try tomorrow!");
            res = "Ran out of tokens for today! Try tomorrow!"
        });
    return res
}



