import React from 'react'
import { getCardOfTheDay } from '../../lib/api'
import { images } from '../../lib/images'
import Error from '../common/Error'
import Loading from '../common/Loading'

function CardOfTheDay() {
  const [singleCard, setSingleCard] = React.useState([])
  const [isUp, setIsUp] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = (singleCard.length === 0) && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsUp(Boolean(Math.round(Math.random())))
        const res = await getCardOfTheDay()
        setSingleCard(res.data.cards[0])
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  return (
    <>
      {isError && <Error />}
      {isLoading && <Loading />}
      {!isLoading && !isError && singleCard && (
        <div>
          <div className='title-index'>
            <h2 className='title-reading info'><span>🧝🏼‍♀️</span> Card Of The Day <span>🧝🏼‍♀️</span></h2>
          </div>
          <div className='card-page'>
            <div className='card-page-img'>
              <figure className='image'>
                <img className={`image-card ${!isUp ? 'flipped' : ''}`} src={images[singleCard.name_short]} />
              </figure>
            </div>
            <div className='card-page-info'>
              <p>&#9734; Name &#8594; {singleCard.name}</p>
              < br/>
              <p>&#9734; Orientation &#8594; 
                {isUp ? <span> Upright</span> : <span> Upside Down</span>}</p>
              < br/>
              <p>&#9734; Meaning &#8594;
                {isUp ? <span> {singleCard.meaning_up}</span> : <span> {singleCard.meaning_rev}</span>}</p>
              < br/>
              <p>&#9734; Description &#8594; {singleCard.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CardOfTheDay