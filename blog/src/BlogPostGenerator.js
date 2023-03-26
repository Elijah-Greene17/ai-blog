import React, { useRef, useState } from 'react';
import './style.css';
import { generate } from './ai';
import CSV from './CSV';

function BlogPostGenerator() {
    const [topic, setTopic] = useState('');
    const [keyWords, setKeyWords] = useState('');
    const [tone, setTone] = useState('');
    const [audience, setAudience] = useState('');
    const [maxLength, setMaxLength] = useState(-1);
    const [content, setContent] = useState('');
    const [contentIsLoading, setContentIsLoading] = useState(false);
    const [contentIsWriting, setContentIsWriting] = useState(false);

    // AI control Feaqtures
    const [temp, setTemp] = useState(0.1);
    const [max_tok, setMaxTok] = useState(2000);
    const [freq, setFreq] = useState(0);
    const [pres, setPres] = useState(0.5);

    //Wordpress Markdown Feature
    const [isWordPressMarkdown, setIsWordPressMarkdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const textareaRef = useRef();
    const modalRef = React.useRef();

    function openModal() {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        setShowModal(false);
        document.body.style.overflow = 'auto';
    }

    function handleChange(event, setter) {
        setter(event.target.value);
    }

    async function handleWrite() {
        let p = '';
        if (topic) {
            p += 'write a blog post about ' + topic;
        }
        if (tone) {
            p += ' in a ' + tone + ' tone';
        }
        if (audience) {
            p += ' for a ' + audience + ' audience';
        }
        if (maxLength > 0) {
            p += ' with a max length of ' + maxLength + ' words';
        }
        if (keyWords.length > 0) {
            p += ' with the keywords: ' + keyWords;
        }

        // Wordpress Markdown Feature
        if (isWordPressMarkdown) {
            p += '. Include markdown for wordpress.';
        }

        const obj = {
            temperature: temp,
            max_tokens: Math.floor(max_tok),
            frequency_penalty: freq,
            presence_penalty: pres,
        };

        setContentIsWriting(true);
        setContentIsLoading(true);
        let res = await generate(p, obj);

        var i = 0;
        var txt = res;
        var speed = 10;
        var total = '';

        typeWriter();

        function typeWriter() {
            if (i < txt.length) {
                total += txt.charAt(i);
                setContent(total);
                speed = Math.floor(Math.random() * 21) + 5;
                const { current: textarea } = textareaRef;
                if (textarea) {
                    textarea.scrollTop = textarea.scrollHeight;
                }
                i++;
                setTimeout(typeWriter, speed);
            } else {
                setContentIsWriting(false);
            }
        }

        setContentIsLoading(false);
    }

    function handleDropdownChange(e) {
        const value = e.target.value;
        setMaxLength(value);
    }

    return (
        <div className="main">
            {showModal && (
                <div className="modal" ref={modalRef}>
                    <div className="modal-content">
                        <form>
                            <label>
                                Temperature:
                                <input
                                    type="text"
                                    value={temp}
                                    onChange={(event) =>
                                        handleChange(event, setTemp)
                                    }
                                />
                            </label>
                            <br />
                            <label>
                                Maximum Tokens:
                                <input
                                    type="text"
                                    value={max_tok}
                                    onChange={(event) =>
                                        handleChange(event, setMaxTok)
                                    }
                                />
                            </label>
                            <br />
                            <label>
                                Frequency Penalty:
                                <input
                                    type="text"
                                    value={freq}
                                    onChange={(event) =>
                                        handleChange(event, setFreq)
                                    }
                                />
                            </label>
                            <br />
                            <label>
                                Presence Penalty:
                                <input
                                    type="text"
                                    value={pres}
                                    onChange={(event) =>
                                        handleChange(event, setPres)
                                    }
                                />
                            </label>
                            <br />
                            <button onClick={closeModal}>Update</button>
                            <button
                                onClick={() => {
                                    setTemp(0.1);
                                    setMaxTok(2000);
                                    setFreq(0);
                                    setPres(0.5);
                                    closeModal();
                                }}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="main-child">
                <h3>Topic / Description</h3>
                <textarea
                    value={topic}
                    onChange={(e) => {
                        setTopic(e.target.value);
                    }}
                />
                <h3>Keywords (Optional)</h3>
                <input
                    type="text"
                    value={keyWords}
                    onChange={(e) => {
                        setKeyWords(e.target.value);
                    }}
                />
                <h3>Tone of Voice (Optional)</h3>
                <input
                    type="text"
                    value={tone}
                    onChange={(e) => {
                        setTone(e.target.value);
                    }}
                />
                <h3>Audience</h3>
                <input
                    type="text"
                    value={audience}
                    onChange={(e) => {
                        setAudience(e.target.value);
                    }}
                />
                <h3>Max Length</h3>
                <select id="cars" name="cars" onChange={handleDropdownChange}>
                    <option value={-1}> Please Select </option>
                    <option value={500}>500 words</option>
                    <option value={1000}>1000 words</option>
                    <option value={1500}>1500 words</option>
                    <option value={2000}>2000 words</option>
                </select>

                {/* WordPress Markdown Feature Start */}
                <h3>Wordpress Markdown</h3>
                <div className="flex-row">
                    <div className="flex-col">
                        <label>Include</label>
                    </div>
                    <div className="flex-col">
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={isWordPressMarkdown}
                            onChange={() => {
                                setIsWordPressMarkdown(!isWordPressMarkdown);
                            }}
                        />
                    </div>
                </div>
                {/* WordPress Markdown Feature End */}
                <div className="btn-row">
                    <button
                        onClick={handleWrite}
                        className={contentIsWriting && 'disabled'}
                    >
                        {contentIsWriting ? <b>Writing...</b> : <b>Write</b>}
                    </button>
                    <button className="settings-btn" onClick={openModal}>
                        <span>ai settings</span>
                    </button>
                </div>
            </div>
            <div className="main-child">
                <CSV
                    obj={{
                        temperature: temp,
                        max_tokens: Math.floor(max_tok),
                        frequency_penalty: freq,
                        presence_penalty: pres,
                    }}
                />
                <h3>Content</h3>
                {contentIsLoading ? (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <textarea
                        ref={textareaRef}
                        className="content"
                        value={content}
                    />
                )}
                <button
                    onClick={async () => {
                        try {
                            await navigator.clipboard.writeText(content);
                        } catch (error) {
                            console.error(
                                'Failed to copy to clipboard: ',
                                error
                            );
                        }
                    }}
                >
                    <b>Copy to clipboard</b>
                </button>

                {/* Save As Text Feature Start */}
                <button
                    onClick={() => {
                        const text = content;
                        const filename = `${topic}.txt`;
                        const blob = new Blob([text], {
                            type: 'text/plain;charset=utf-8',
                        });

                        if (window.navigator.msSaveOrOpenBlob) {
                            // for Internet Explorer
                            window.navigator.msSaveOrOpenBlob(blob, filename);
                        } else {
                            // for other browsers
                            const elem = window.document.createElement('a');
                            elem.href = window.URL.createObjectURL(blob);
                            elem.download = filename;
                            document.body.appendChild(elem);
                            elem.click();
                            document.body.removeChild(elem);
                        }
                    }}
                >
                    <b>Save as txt</b>
                </button>

                {/* Save As Text Feature End */}
            </div>
        </div>
    );
}

export default BlogPostGenerator;
