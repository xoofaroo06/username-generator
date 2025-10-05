'use client';

import { useState } from 'react';

const adjectives = ['Quick','Brave','Clever','Bold'];
const nouns = ['Tiger','Eagle','Lion','Fox'];
const letters = 'abcdefghijklmnopqrstuvwxyz';
const fantasyPrefixes = ['Dragon','Wizard','Elf','Dwarf'];
const fantasySuffixes = ['rider','king','mage','hunter'];
const techPrefixes = ['Cyber','Quantum','Matrix','Nano'];
const techSuffixes = ['Tech','Pro','Guru','Bot'];
const cutePrefixes = ['Fluffy','Panda','Kitty','Bunny'];
const cuteSuffixes = ['Bear','Puff','Bee','Pop'];

function randomElement(arr:string[]) {return arr[Math.floor(Math.random()*arr.length)];}

function generateMeaningful() {
  return Array.from({length:10},() => `${randomElement(adjectives)}${randomElement(nouns)}${Math.floor(Math.random()*100)}`);
}

function generateGibberish() {
  return Array.from({length:10},() => {
    let len = 5 + Math.floor(Math.random()*5);
    let s = '';
    for (let i=0; i<len; i++) s += letters[Math.floor(Math.random()*letters.length)];
    return s;
  });
}

function generateNumeric() {
  return Array.from({length:10},() => Math.floor(100000 + Math.random()*900000).toString());
}

function generateFantasy() {
  return Array.from({length:10},() => `${randomElement(fantasyPrefixes)}${randomElement(fantasySuffixes)}`);
}

function generateTechy() {
  return Array.from({length:10},() => `${randomElement(techPrefixes)}${randomElement(techSuffixes)}${Math.floor(Math.random()*100)}`);
}

function generateCute() {
  return Array.from({length:10},() => `${randomElement(cutePrefixes)}${randomElement(cuteSuffixes)}`);
}

const categories = [
  {id:'meaningful',label:'Meaningful',gen:generateMeaningful},
  {id:'gibberish',label:'Gibberish',gen:generateGibberish},
  {id:'numeric',label:'Numeric',gen:generateNumeric},
  {id:'fantasy',label:'Fantasy',gen:generateFantasy},
  {id:'techy',label:'Techy',gen:generateTechy},
  {id:'cute',label:'Cute',gen:generateCute},
];

export default function Page() {
  const [names,setNames] = useState(() => {
    const obj:any = {};
    categories.forEach(c => obj[c.id] = c.gen());
    return obj;
  });
  const [best,setBest] = useState<string[]>([]);
  const [showBest,setShowBest] = useState(false);

  const regenerate = (id:string) => {
    setNames((prev:any) => ({...prev, [id]: categories.find(c => c.id===id)!.gen()}));
  };

  const toggleBest = (name:string) => {
    setBest(prev => prev.includes(name) ? prev.filter(n => n!==name) : [...prev,name]);
  };

  const copy = (name:string) => {
    navigator.clipboard.writeText(name).then(() => alert('Copied!'));
  };
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Random Username Generator</h1>
      <button onClick={() => setShowBest(!showBest)} className="mb-4 px-3 py-1 bg-blue-600 text-white rounded">
        {showBest ? 'Hide Best Picks' : 'Show Best Picks'}
      </button>
      {showBest && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Best Picks</h2>
          {best.length ? (
            <ul>
              {best.map(name => (
                <li key={name} className="flex justify-between items-center p-1 bg-gray-100 mb-1 rounded">
                  <span>{name}</span>
                  <button onClick={() => copy(name)} className="text-blue-600 text-sm">Copy</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No picks yet.</p>
          )}
        </div>
      )}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(cat => (
          <div key={cat.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-2">{cat.label}</h3>
            <button onClick={() => regenerate(cat.id)} className="mb-2 px-3 py-1 bg-green-600 text-white text-sm rounded">Generate 10</button>
            <ul>
              {names[cat.id].map((n: string) => (
                <li key={n} className="flex justify-between items-center p-1 border-b last:border-none">
                  <span>{n}</span>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => copy(n)} className="text-blue-600 text-sm">Copy</button>
                    <button onClick={() => toggleBest(n)} className="text-sm">{best.includes(n) ? '★' : '☆'}</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
