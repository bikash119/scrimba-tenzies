import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Die from '@/components/Die';

function Dice(props: {diceCount: number}) {

    const { width, height } = useWindowSize()
    const getRandomNumber = () => (Math.floor(Math.random() * 6))+1
    const [diceFaces, setDiceFaces] = useState<number[]>(Array(props.diceCount).fill(0).map(() => getRandomNumber()));
    const [isLocked, setIsLocked] = useState<boolean[]>(Array(props.diceCount).fill(false));
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const fillDiceFaces = () => {
        return diceFaces.map((die,index) => !isLocked[index] ? getRandomNumber() : die)
    }
    const handleRollDice = () => {
        setDiceFaces(fillDiceFaces())
    }
    const startNewGame = () => {
        setIsLocked(Array(props.diceCount).fill(false));
        setDiceFaces(Array(props.diceCount).fill(0).map(() => getRandomNumber()));
        setIsGameOver(false);
    }
    
    function indicesWithEqualItems(newLocked: boolean[],die: number){
        return newLocked.map((_,index) => diceFaces[index] === die? true : false);
    }
    const handleClick = (die: number) => {
        setIsLocked(prev => indicesWithEqualItems(prev,die));
    }

    useEffect(() => {
        if(diceFaces.filter(item => item === diceFaces[0]).length === diceFaces.length){
            setIsGameOver(true);
        }
    }, [isLocked.filter(item => item === true).length]);

  return (
    <section className='dice-container'>
        <div className='dice'>
            {diceFaces.map((die,index) => (
                <Die key={index} id={index} value={die} isHeld={isLocked[index]} onClick={() => handleClick(die)}/>
            ))}
        </div>
        {isLocked.includes(false)? 
        <button 
            className='roll-dice'
            onClick={handleRollDice}
        >Roll</button> 
            : 
        <button 
            className='roll-dice'
            onClick={startNewGame}
        >New Game</button>}
        {isGameOver && <Confetti width={width} height={height} gravity={0.3} numberOfPieces={400}/>}
    </section>
  )
}

export default Dice;