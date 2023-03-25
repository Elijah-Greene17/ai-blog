import React, { useRef, useState } from 'react';
import { generateCSVLine } from './ai';

const CSV = ({ obj }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const fileInput = useRef(null);

    function handleButtonClick() {
        setIsProcessing(true);
        fileInput.current.click();
    }

    async function handleProcessCSV(event) {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = async () => {
                const data = reader.result;

                // Process the CSV data line by line
                const lines = data.split('\n');
                for (let index = 0; index < lines.length; index++) {
                    const line = lines[index];
                    // Process each line here
                    if (index !== 0) {
                        // Split the line into an array of values
                        const values = line.split(',');

                        // Create an object for each line
                        const dataObj = {
                            topic: values[0],
                            title: values[1],
                            keywords: values[2].replace(/:/g, ','),
                            tone: values[3],
                            audience: values[4],
                            maxLength: values[5],
                            subheadings: values[6].replace(/:/g, ','),
                        };

                        const finalText = await generateCSVLine(obj, dataObj);
                        // Create a text file with the result
                        const filename = `${dataObj.title}.txt}`;
                        const blob = new Blob([finalText], {
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
                    } else {
                    }
                }

                setIsProcessing(false);
            };
            reader.onerror = () => {
                console.error('Error reading CSV file');
            };
        } else {
            alert('Please select a CSV file');
        }
    }

    return (
        <div>
            <input
                ref={fileInput}
                type="file"
                accept=".csv"
                onChange={handleProcessCSV}
                style={{ display: 'none' }}
            />
            <button
                onClick={handleButtonClick}
                className={isProcessing ? 'csv-btn disabled' : 'csv-btn'}
            >
                {isProcessing ? <b>Processing...</b> : <b>Process .csv</b>}
            </button>
        </div>
    );
};

export default CSV;
