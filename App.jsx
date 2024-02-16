import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copiedPassword, setCopiedPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+';

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    setCopiedPassword(password);

    // Clear the copied password message after 3 seconds
    setTimeout(() => {
      setCopiedPassword('');
    }, 3000);
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-600 to-purple-800 text-white font-poppins'>
      <nav className='bg-gray-800 p-4'>
        <div className='text-3xl font-bold'>Password Generator</div>
      </nav>
      <div className='flex-1 w-full max-w-md mx-auto shadow-lg rounded-md p-6 my-8 bg-gray-700 text-white'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex items-center space-x-2'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer w-full'
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor='length' className='text-lg'>
              Length:{length}
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor='number' className='text-lg'>
              Include Numbers
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor='charInput' className='text-lg'>
              Include Special Characters
            </label>
          </div>
        </div>
        <div className='flex flex-col items-center space-y-4 mt-8'>
          <div className='flex shadow-lg rounded-md overflow-hidden transition-transform transform hover:scale-105'>
            <input
              type='text'
              value={password}
              className='outline-none w-full py-3 px-4 bg-gray-800 text-orange-400 text-lg font-mono'
              placeholder='Your Password'
              readOnly
              ref={passwordRef}
              onClick={copyPasswordToClipboard}
            />
            <button
              onClick={copyPasswordToClipboard}
              className='bg-blue-500 text-white px-6 py-3 hover:bg-blue-700 transition-all'
            >
              Copy
            </button>
          </div>
          {copiedPassword && (
            <p className='text-sm text-gray-300 animate-fade-out'>
              Copied: {copiedPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

