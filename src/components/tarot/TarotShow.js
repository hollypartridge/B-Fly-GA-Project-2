import React from 'react'
import { getAllCards } from '../../lib/api'
import { images } from '../../lib/images'
import { useParams } from 'react-router'
import Error from '../common/Error'
import Loading from '../common/Loading'

function TarotShow() {
  const [cards, setCards] = React.useState([])
  const { cardId } = useParams()
  const [isError, setIsError] = React.useState(false)
  const isLoading = (cards.length === 0) && !isError
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllCards()
        setCards(res.data.cards)
      } catch (err) {
        setIsError(err)
      }
    }
    getData()
  }, [])
  
  return (
    <>
      {isError && <Error />}
      {isLoading && <Loading />}
      {!isLoading && !isError && cards &&
        <div className='container'>
          {cards.filter(card => card.name_short.includes(cardId)).map(filteredCard => (
            <div key={filteredCard.name}>
              <div className='title-index'>
                <h4 className='title-reading info'><span>🧚‍♀️</span> {filteredCard.name} <span>🧚‍♀️</span></h4>
              </div>
              <div className='card-page'>
                <div className='card-page-img'>
                  <figure className='image'>
                    <img className='image-card' src={images[filteredCard.name_short]} />
                  </figure>
                </div>
                <div className='card-page-info'>
                  <p>&#9734; Meaning Upright &#8594; {filteredCard.meaning_up}</p>
                  < br/>
                  <p>&#9734; Meaning Upside Down &#8594; {filteredCard.meaning_up}</p>
                  < br/>
                  <p>&#9734; Description &#8594; {filteredCard.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  )
}

export default TarotShow