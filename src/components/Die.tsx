
function Die(props: {value: number,id: string,isHeld: boolean,onClick: () => void}) {
    const numberToString = (num: number): string => {
        return numbers[num]
    }
    const numbers: Record<number, string> = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six'
    }

    const dips = Array(props.value).fill(0).map((_,index) => 
            <p key={index} className={`dots ${numberToString(props.value)}-${numberToString(index+1)}`}>&bull;</p>)
    const valueText = <span className='die-value-light'>{props.value}</span>
    return (
            <button key={props.id} 
                className={props.isHeld?'die-face dice-face-held':'die-face'} 
                onClick={props.onClick}
                aria-pressed={props.isHeld}
                aria-label={`Die with a value of ${props.value}, ${props.isHeld ? 'Held' : 'Not Held'}`}

            >
            <div className="dots-container">
                {valueText}
                {dips}
            </div>
            </button>
    )
}

export default Die;