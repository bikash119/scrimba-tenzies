
function Die(props: {value: number,id: string,isHeld: boolean,onClick: () => void}) {


    return (
            <button key={props.id} 
                className={props.isHeld?'die-face dice-face-held':'die-face'} 
                onClick={props.onClick}
                aria-pressed={props.isHeld}
                aria-label={`Die with a value of ${props.value}, ${props.isHeld ? 'Held' : 'Not Held'}`}

            >
                {props.value}
            </button>
    )
}

export default Die;