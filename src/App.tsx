import '@/App.css'
import Dice from '@/components/Dice'

function App() {

  return (
    <main className='main-container'>
      <section className='game-container'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <Dice diceCount={10}/>
        
      </section>
    </main>
  )
}

export default App
