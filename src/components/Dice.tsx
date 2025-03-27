import { useEffect, useState ,useRef} from 'react';
import Confetti from 'react-confetti'
import Die from '@/components/Die';
import {nanoid} from 'nanoid';

function Dice(props: {diceCount: number}) {

    const randomNumbers:number[] = Array(props.diceCount).fill(0).map(() => Math.ceil(Math.random() * 6))
    const buttonRef = useRef<HTMLButtonElement>(null)
    const fillDice = (): {id: string, value: number, isHeld: boolean}[] => {
        return randomNumbers.map((value) => ({id: nanoid(), value:value, isHeld: false}))
    }
    const [dice, setDice] = useState<{id: string, value: number, isHeld: boolean}[]>(() => fillDice());
    const gameOver = dice.every(dieObj => dieObj.isHeld) && dice.every(dieObj => dieObj.value === dice[0].value)
    
    const rollDice = () => {
        gameOver ? setDice(fillDice()) : setDice(prev => prev.map(dieObj => dieObj.isHeld ? dieObj : {...dieObj, value: Math.ceil(Math.random() * 6)}))

    }
    const freezeDice = (id:string) => {
        setDice( (prev) => prev.map(dieObj => dieObj.id === id ? {...dieObj, isHeld: !dieObj.isHeld} : dieObj))
    }
    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.focus()
        }
    }, [gameOver])
    
  return (
    <>
    {gameOver && <Confetti />}
    <div aria-live='polite' className="sr-only">
        {gameOver && <p>Congratulations! You won! Press "New Game" to start a new game.</p>}
    </div>
    <section className='dice-container'>
        <div className='dice'>
            {dice.map(dieObj => (
                <Die 
                    key={dieObj.id} 
                    id={dieObj.id}
                    value={dieObj.value} 
                    isHeld={dieObj.isHeld} 
                    onClick={() => freezeDice(dieObj.id)}
                />
            ))}
        </div>
        <button
            ref={buttonRef}
            className='roll-dice'
            onClick={() => rollDice()}
            aria-label={gameOver ? 'New Game' : 'Roll'}
        >
        {gameOver ? 'New Game' : 'Roll'}
        </button>
    </section>
    </>
  )
}

export default Dice;