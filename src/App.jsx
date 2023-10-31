import './App.css';
import Card from './components/Card';
import { useState } from 'react';


// Arpoo satunnaisluvun
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

//luodaan kortti, eli tehdää tämä, jotta pystytään lupmaan korttipalkka
const kortti= (index) => ({
    image: 'http://placekitten.com/120/100?image=' + index,
    ominaisuudet: [
        {name: 'cuteness', value: getRandomInt(3, 20)},
        {name: 'loving', value: getRandomInt(10, 200)},
        {name: 'speed', value: getRandomInt(1, 220)},
    ],
    // Luodaan id, koska React vaatii korttipakkalistaan key-propin
    id: crypto.randomUUID(),
  });

function shuffle(array) {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}  

const testikortti = kortti(4);

//tehdään korttipakka
const korttipakka = Array(16).fill(null).map((_, index) => kortti(index));

console.log(korttipakka);

//Jaetaan korttipakka puoliksi tai itseasiassa etsitään sen puolivälin paikka
const puolivali = Math.ceil(korttipakka.length / 2);

function jaaKortit() {
    shuffle(korttipakka);
    return {
      pelaaja: korttipakka.slice(0, puolivali),
      vastustaja: korttipakka.slice(puolivali),
    };
  }

//console.log(jaaKortit())




// Arpoo satunnaiskuvat: Math.floor(Math.random() * (max - min + 1) + min);
const kissakuvaP = Math.floor(Math.random() * (8 - 0 + 1) + 0);
const pelaajankortti = {
    image: 'http://placekitten.com/120/100?image=' + kissakuvaP,
    ominaisuudet: [
        {name: 'cuteness', value: getRandomInt(3, 20)},
        {name: 'loving', value: getRandomInt(10, 200)},
        {name: 'speed', value: getRandomInt(1, 220)},
    ],
};

const kissakuvaV = Math.floor(Math.random() * (16 - 9 + 1) + 9);
const vastustajankortti = {
    image: 'http://placekitten.com/120/100?image=' + kissakuvaV,
    ominaisuudet: [
        {name: 'cuteness', value: getRandomInt(3, 20)},
        {name: 'loving', value: getRandomInt(10, 200)},
        {name: 'speed', value: getRandomInt(1, 220)},
    ],
};


export default function App(){
    const [result, setResult] = useState('');
    const [kortit, setCards] = useState(jaaKortit);

    function compareCards() {
        // molempien korttien ensimmäinen status
        const pelaajanStatus = kortit.pelaaja[0].ominaisuudet[0];
        const vastustajanStatus = kortit.vastustaja[0].ominaisuudet[0];

        

        // verrataan tuloksia
        if (pelaajanStatus.value === vastustajanStatus.value) setResult('tasapeli');
        else if (pelaajanStatus.value > vastustajanStatus.value) setResult('voitto');
        else setResult('häviö');

        
    }

    return (
        <>
            <h1> Kissapeli </h1>

            <div className='pelialue'>

                <div className='hand'>
                    <p> Pelaajan kortti </p>
                    <ul className='korttirivi'>
                    {kortit.pelaaja.map(pelaajanKortti => (
                        <li className='korttirivin-kortti pelaaja'>
                            <Card card={pelaajanKortti}/>
                        </li>
                    ))}
                    </ul>
                </div>
                
                <div className="nappi-alue">
                    <p> { result || 'Press the button'} </p>
                    <button onClick={compareCards} type="button" className='playButton'> Play </button>
                </div>

                <div className='hand'>
                    <p> Vastustajan kortti </p>
                    <ul className='korttirivi vastustaja'>
                    {kortit.vastustaja.map(vastustajanKortti => (
                        <li className='korttirivin-kortti vastustaja'>
                            <Card card={vastustajanKortti}/>
                        </li>
                    ))}
                    </ul>
                </div>

            </div>
            
        </>
    );
}