'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Copy } from 'lucide-react';

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMeaningful() {
  const adjectives = ['Quick','Silent','Brave','Nimble','Mighty','Happy','Clever'];
  const nouns = ['Tiger','Eagle','Lion','Wolf','Fox','Hawk','Bear'];
  return Array.from({ length: 10 }, () => `${randomElement(adjectives)}${randomElement(nouns)}${Math.floor(Math.random()*100)}`);
}

function generateGibberish() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length: 10 }, () => {
    let str = '';
    for (let i = 0; i < 8; i++) {
      str += letters[Math.floor(Math.random() * letters.length)];
    }
    return str;
  });
}

function generateNumeric() {
  return Array.from({ length: 10 }, () => Math.floor(10000000 + Math.random() * 90000000).toString());
}

function generateFantasy() {
  const prefixes = ['Dragon','Phoenix','Wizard','Elf','Dwarf','Knight','Fairy'];
  const suffixes = ['Slayer','Rider','Lord','Hunter','Walker','Mage'];
  return Array.from({ length: 10 }, () => `${randomElement(prefixes)}${randomElement(suffixes)}`);
}

function generateTechy() {
  const prefixes = ['Cyber','Quantum','Neo','Byte','Pixel','Data','Robo'];
  const suffixes = ['Guru','Ninja','Master','Hero','Wizard','Coder'];
  return Array.from({ length: 10 }, () => `${randomElement(prefixes)}${randomElement(suffixes)}`);
}

function generateCute() {
  const adjectives = ['Fluffy','Sparkly','Lovely','Sunny','Cheery','Sweet'];
  const animals = ['Bunny','Kitty','Panda','Puppy','Duck','Bear'];
  return Array.from({ length: 10 }, () => `${randomElement(adjectives)}${randomElement(animals)}`);
}

const categories = [
  { title: 'Meaningful Names', generator: generateMeaningful },
  { title: 'Gibberish Names', generator: generateGibberish },
  { title: 'Numeric Names', generator: generateNumeric },
  { title: 'Fantasy Names', generator: generateFantasy },
  { title: 'Techy Names', generator: generateTechy },
  { title: 'Cute Names', generator: generateCute },
];

export default function Page() {
  const [windows, setWindows] = useState(categories.map(cat => ({ title: cat.title, names: cat.generator() })));
  const [best, setBest] = useState([]);

  const regenerate = (index) => {
    setWindows(prev => prev.map((w, i) => {
      if (i === index) return { ...w, names: categories[i].generator() };
      return w;
    }));
  };

  const togglePick = (name) => {
    setBest(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const copyName = (name) => {
    navigator.clipboard.writeText(name);
  };

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2">
      {windows.map((win, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{win.title}</h2>
              <Button variant="outline" onClick={() => regenerate(i)}>Generate</Button>
            </div>
            <ul className="space-y-1 max-h-40 overflow-y-auto">
              {win.names.map(name => (
                <li key={name} className="flex justify-between items-center text-sm">
                  <span>{name}</span>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => copyName(name)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => togglePick(name)}>
                      <Star className={`w-4 h-4 ${best.includes(name) ? 'fill-yellow-400' : ''}`} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      {best.length > 0 && (
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Best Picks</h2>
            <ul className="flex flex-wrap gap-2 text-sm">
              {best.map(name => (
                <li key={name} className="px-2 py-1 bg-gray-200 rounded">{name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
