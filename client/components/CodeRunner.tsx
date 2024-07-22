import axios from 'axios';
import React, { useState } from 'react';

function CodeRunner({ editorRef, language }: { editorRef: any, language: string }) {
  const [output, setOutput] = useState<string>("");

  async function apiCall(sourceCode: string) {
    const API = axios.create({
      baseURL: "https://emkc.org/api/v2/piston"
    });

    try {
      const response = await API.post("/execute", {
        language: language,
        version: "*", // Use wildcard for the latest version; adjust if needed
        files: [
          {
            name: `main.${getFileExtension(language)}`, // Provide file name with proper extension
            content: sourceCode,
          }
        ],
        stdin: "",
        args: [], // Add any required arguments here
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1
      });

      if (response && response.data) {
        setOutput(response.data.run.output || ''); // Update output based on API response structure
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("API Error:", error.response.data);
        setOutput(`Error: ${error.response.data.message || 'An error occurred'}`);
      } else {
        console.error("Error:", error.message);
        setOutput(`Error: ${error.message}`);
      }
    }
  }

  const runCode = async () => {
    if (editorRef && editorRef.current) {
      const sourceCode = editorRef.current.getValue(); // Get code from the editor
      await apiCall(sourceCode); // Call the API with the source code
    }
  };

  function getFileExtension(language: string): string {
    switch (language) {
      case 'javascript': return 'js';
      case 'java': return 'java';
      case 'python': return 'py';
      case 'typescript': return 'ts';
      case 'csharp': return 'cs';
      case 'cpp': return 'cpp';
      case 'go': return 'go';
      default: return 'txt';
    }
  }

  return (
    <div className='w-full'>
      <button onClick={runCode} className=' text-yellow-400 font-bold border rounded-lg p-2'>Run Code</button>
      <div className='text-white'>{output}</div>
    </div>
  );
}

export default CodeRunner;
