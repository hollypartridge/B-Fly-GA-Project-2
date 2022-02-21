# B-FLY | GA Project 2

![B-FLY](/assets/homepage.png)

## Table of Contents
* [Overview](#overview "Goto overview")
* [Deployed Version](#play-deployed-version "Goto play-deployed-version")
* [Brief](#brief "Goto brief")
* [Technologies Used](#technologies-used "Goto technologies-used")
* [Installation](#Installation "Goto Installation")
* [Process](#process "Goto process")
* [Bugs](#bugs "Goto bugs")
* [Challenges](#challenges "Goto challenges")
* [Wins](#wins "Goto wins")
* [Future Improvements](#future-improvements "Goto future-improvements")
* [Key Learning](#key-learning "Goto key-learning")

## Overview
* A React application that consumes a public API. 
* Pair Programming | Timeframe: 48 Hour Hackathon.

## Play Deployed Version
The deployed version can be found [**here.**](https://tarot-reading-react.netlify.app/ "here.")

## Brief
Your app must:

* Consume a public API.
* Have several components.
* Be deployed online and accessible to the public.

## Technologies used

* HTML
* SCSS
* React.js
* JavaScript (ES6)
* Axios
* React-Router-Dom
* [**Tarot Card API**](https://rws-cards-api.herokuapp.com/api/v1/cards/ "Tarot Card API")
* Git
* GitHub
* Netlify (deployment)

## Installation
* Access the source code via the 'Clone or download' button.
* Run `npm i` or `npm install` to install dependencies.
* Run `npm run dev` to start the development server.

## Process

### Planning
We spent the first day of our project finding an API to use and planning our React app. We decided on using a Tarot Card API, with the idea being to do a tarot reading for the user. We then began to plan the different components our app would need and created a plan for the next 48 hours. 

Day 1:
* Home Page
* Index Page
* Show Page
* Card Of The Day Page

Day 2:
* Tarot Reading Page
* Error Handling
* Debug
* CSS

### The Build
This project was created using a Live Share on VSCode while working together on Zoom. 

#### Tarot Reading
We created our app to produce a three card tarot reading for the user. To do this we used the API's end point to request 3 random cards from the deck. For the API requests we set up a `lib` file and used Axios to get the data. We used an `onClick` event and conditional rendering to display the cards when the `start reading` button is clicked. In a tarot deck the cards have different meanings depending on their orientation. To deal with this we mapped through our original array and used the spread operator to create a new array with 2 more keys: `time` and `isUp`. The value of `isUp` was a randomly generated Boolean value, then used in the JSX to determine which card meaning was displayed and the orientation of the card. This was changed by adding a class of `flipped` using a ternary operator.

```js
const newReadingCards = readingCards.map((card, index) => {
    return {
      ...card,
      time: times[index],
      isUp: Boolean(Math.round(Math.random())),
    }
  })
```

```js
 <img className={!card.isUp ? 'flipped' : ''} src={images[card.name_short]} alt={card.name} />
```

![Tarot Reading](/assets/tarot-reading.png)

#### All Cards
We created an index page in our app to display all the cards in the tarot deck, with each card linking to its own individual show page. Here we came up against a couple of issues with our API: it didn't have any images and it didn't have a single end point. To get around the images issue we uploaded the images to imgur and created an object in a seperate file `images.js` that contained links to these images, with keys that matched the `name_short` key of our API. To address the end point issue we linked to `/tarot/${card.name_short}` on the index page and then used `useParams` and a filter to access the data from the API on the show page.

```js
const [cards, setCards] = React.useState([])
const { cardId } = useParams()

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
    {cards.filter(card => card.name_short.includes(cardId)).map(filteredCard => ...
```

![Index](/assets/tarot-index.png)

#### Error Handling
We used error handling to display when there was an error or when the API was loading to create a better user experience. To do this we built `Error.js` and `Loading.js` files in our `common` folder, containing JSX to display loading or error text. In the files making API requests we created a variable `isError` and set this in the catch block of our `getData` function. We imported the Error component and used conditional rendering to display it if there was an error. To work out whether the page was loading we created a value `isLoading` with a Boolean value that calculates true if there is no error and if the array that contains the data is empty. Again, we imported the Loading component and used conditional rendering to display it if it was loading.

```js
const [cards, setCards] = React.useState([])
const [isError, setIsError] = React.useState(false)
const isLoading = (cards.length === 0) && !isError

React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllCards()
        setCards(res.data.cards)
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
    {!isLoading && !isError && cards &&
```

## Bugs

**Card of the Day | Produces different cards throughout the day:**  When we were planning the functionality of our application, we wanted the card of the day to produce a random card from the deck. We achieved this, however the card changes each time the page renders, which isn't ideal for the feature. We ran out of time during the hackathon to improve this but we would like to solve this by setting the card of the day in local storage.

![Card of the day](/assets/card-of-the-day.png)

## Challenges

**API | No single end point:** At first it was challenging that we didn't have a single end point, as this was our first time working with an API, and it took us a while to find a solution. However once we decided to use the `name_short` key to link to the individual show pages, I felt like this gave me a greater understanding of how `useParams` worked and it was fun to work out how we would use array methods to display the right card.

## Wins 

* I really enjoyed using React and working with an API for the first time. 
* Overcame challenges, such as the API not having images and an end point.
* We worked really well as a team, pair programming and problem solving together.
* I loved the styling of the application. 

## Future Improvements

* Add the card of the day to local storage.

## Key Learning

**React:** Creating our application was crucial in developing my skills in React, including my understanding of React-Router-Dom. It also helped consolidate my knowledge of JS, working with array methods in different contexts.

**Pair Programming:** I loved working on this project with Alex. It was our first time using Live Share to code along with each other and it was really fun working out solutions to problems together on Zoom. 
