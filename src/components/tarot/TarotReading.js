import React from 'react'
import { getCardsForReading } from '../../lib/api'
import { images } from '../../lib/images'
import Error from '../common/Error'
import Loading from '../common/Loading'


function TarotReading() {
  const [readingCards, setReadingCards] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = (readingCards.length === 0) && !isError
  const times = ['Past', 'Present', 'Future']
  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getCardsForReading()
        setReadingCards(res.data.cards)
      } catch (err) {
        setIsError(err)
      }

    }
    getData()

  }, [])

  const newReadingCards = readingCards.map((card, index) => {
    return {
      ...card,
      time: times[index],
      isUp: Boolean(Math.round(Math.random())),
    }
  })

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <div>
        <div className='intro'>
          <h2 className="title-reading">🦋 Tarot Reading 🦋</h2>
          <p className='info'>
          Three cards are generated for you.<br />
          The first card represents the past,<br />
          the second represents the present,<br />
          and the third represents the future.<br />
          Each card has a different meaning.</p> 
          <p className='ready'>Are you ready to meet your fate?</p>
          {isPlaying ? 
            <button 
              onClick={handleClick}
            >
              Play Again
            </button>
            :
            <button 
              onClick={handleClick}
            >
            Start Reading
            </button>}
        </div>
        {isPlaying && 
        <div className='reading'>
          {isError && <Error />}
          {isLoading && <Loading />}
          {readingCards &&
          newReadingCards.map(card => (
            <><div key={card.name_short} className='individual-columns'>
              <p className='card-info'>🧝🏼‍♀️ {card.time} 🧝🏼‍♀️</p>
              <p className='card-info'>🕸 {card.name} 🕸</p>
              {card.isUp ?
                <span>🍄<em> Upright </em>🍄</span>
                :
                <span>🍄<em>Upside Down </em>🍄</span>}
              <figure>
                <img 
                  className={!card.isUp ? 'flipped' : ''} src={images[card.name_short]} alt={card.name} />
              </figure>
              {card.isUp ? 
                <>
                  <p>✨✨✨</p>
                  <p className='card-meaning-reading'> {card.meaning_up}
                  </p>
                  <p>✨✨✨</p>
                </> 
                :
                <>
                  <p>✨✨✨</p>
                  <p className='card-meaning-reading'> {card.meaning_rev}
                  </p>
                  <p>✨✨✨</p>
                </>}
            </div>
            </>
          ))}
        </div>}
      </div>
    </>
  )
}

export default TarotReading