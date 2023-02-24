import React, { useState } from "react";
import "./style.css";
import { generate } from "./ai"

function BlogPostGenerator() {
  const [topic, setTopic] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [maxLength, setMaxLength] = useState(2000);
  const [content, setContent] = useState("");
  const generatePost = () => {
    // Connect to Chat GPT API and generate post based on parameters
    // Update state with generated post
  };

  async function handleWrite() {
    // let ai = new OpenAI()
    // ai.generateText("Write a blog post about machine learning in the tone of a pirate", "text-davinci-003", 2000)
    console.log("Writing...")
    let prompt = `Write a blog post about ${topic} in a ${tone} tone with a max length of ${maxLength} words with the keywords: ${keyWords.length > 0 ? keyWords : ""}`;
    let res = await generate(prompt);
    console.log(res)
    setContent(res)
  }

  return (
    <div className="main">
      <div className="main-child">
        <h3>Topic / Description</h3>
        <textarea value={topic} onChange={(e) => { setTopic(e.target.value) }} />
        <h3>Keywords (Optional)</h3>
        <input type="text" value={keyWords} onChange={(e) => { setKeyWords(e.target.value) }} />
        <h3>Tone of Voice (Optional)</h3>
        <input type="text" value={tone} onChange={(e) => { setTone(e.target.value) }} />
        <h3>Max Length</h3>
        <select id="cars" name="cars">
          <option value={2000}> Please Select </option>
          <option value={500}> 500 words </option>
          <option value={1000}>1000 words</option>
          <option value={1500}>1500 words</option>
          <option value={2000}>2000 words</option>
        </select>
        <button onClick={handleWrite}>
          <b>Write</b>
        </button>
      </div>
      <div className="main-child">
        <h3>Content</h3>
        <textarea className="content" value={content} />
        <button>
          <b>Copy to clipboard</b>
        </button>
      </div>
    </div>
  );
}

export default BlogPostGenerator;
