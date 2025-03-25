
function Die(props: {value: number,id: number,isHeld: boolean,onClick: () => void}) {


    return (
            <button key={props.id} className={props.isHeld?'die-face dice-face-held':'die-face'} onClick={props.onClick}>
                {props.value}
            </button>
    )
}

export default Die;