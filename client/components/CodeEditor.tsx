import React, { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import CodeRunner from './CodeRunner';
import { PiAirplaneTakeoffFill } from "react-icons/pi";

const languages = ['javascript', 'java', 'python', 'csharp', 'cpp', 'go'];

function CodeEditor() {
  const editorRef = useRef(null);
  const [code, setCode] = useState<string>('//start coding');
  const [language, setLanguage] = useState<string>('java');

  function onMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }

  function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setLanguage(event.target.value);
  }

  return (
    <div>
        <div className=''>
        <div className="flex gap-1">
            <div>
              <div className="bg-yellow-400 font-semibold p-1 rounded-md flex gap-1">
                <span className="p-1">PLACEMENT</span>
                <span className="bg-white text-black p-1 rounded-r-md">
                  Pilot
                </span>
              </div>
            </div>
            <div>
              <PiAirplaneTakeoffFill size={40} color='white'/>
            </div>
          </div>
        </div>
      <div className='flex'>
        <label htmlFor="language-select" className='bg-yellow-300'>Select Language: </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className='flex gap-2'>
        <div className='w-full'>
        <Editor
        height="100vh"
        width="50vw"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(newValue) => setCode(newValue || '')}
        onMount={onMount}
      />
        </div>
      
      <CodeRunner editorRef={editorRef} language={language}/>
      </div>
      
      
    </div>
  );
}

export default CodeEditor;
