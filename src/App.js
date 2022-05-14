import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImage = [
  {'src': '/img/helmet-1.png', method: false},
  {'src': '/img/potion-1.png', method: false},
  {'src': '/img/ring-1.png', method: false},
  {'src': '/img/scroll-1.png', method: false},
  {'src': '/img/shield-1.png', method: false},
  {'src': '/img/sword-1.png', method: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiseOne, setChoiseOne] = useState(null)
  const [choiseTwo, setChoiseTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffleCards = [...cardImage, ...cardImage]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random()}))

    setChoiseOne(null)
    setChoiseTwo(null)
    setCards(shuffleCards);
    setTurns(0)
  }

  const HandleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
  }

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true)
      if (choiseOne.src === choiseTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if(card.src === choiseOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiseOne, choiseTwo])

  console.log(cards)
  console.log(choiseOne)
  console.log(choiseTwo)
  const resetTurn = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            card={card} key={card.id} 
            HandleChoise={HandleChoise}
            flipped={ card === choiseOne || card === choiseTwo || card.matched } 
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
