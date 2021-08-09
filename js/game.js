import ManAndGallows, {maximumBadGuesses} from './manandgallows'
import Word from './word'
import wordlist from './wordlist'

function getRandomWord() {
  return wordlist[Math.floor(Math.random()*wordlist.length)].toLowerCase()
}

// get word -> for every letter in the word -> ???
function turnWordIntoBlanks(word) {
  let blankWord = ''
  for (let i=0; i<word.length; i++) {
    blankWord = blankWord + '_'
  }
  return blankWord
}

// maybe we should have written tests for this!
function isLetterInWord(letter, word) {
  const letterIndexes = getLetterIndexes(letter, word)
  return letterIndexes.length !== 0
}

function getLetterIndexes(letter, word) {
  let letterIndexes = []
  for (let i=0; i<word.length; i += 1) {
    // if any letter is our guess, just return true
    const isMatchingLetter = letter === word[i]
    if (isMatchingLetter) {
      letterIndexes.push(i)
    }
  }
  return letterIndexes
}

// simple version: restrict to letters
function guessIsValid(character) {
  if (character.length !== 1) {
    return false
  }

  const regex = /[a-zA-Z]/
  return character.match(regex) !== null
}

const GAMESTATE = {
  PLAYING: 'playing',
  WIN: 'win',
  LOSE: 'lose',
}

const Game = () => {
  const [currentLetter, setCurrentLetter] = React.useState('')

  const [word, setWord] = React.useState(getRandomWord())
  const [displayWord, setDisplayWord] = React.useState(turnWordIntoBlanks(word))
  const [badGuessesList, setBadGuessesList] = React.useState([])
  const [gameState, setGameState] = React.useState(GAMESTATE.PLAYING)

  const resetGame = () => {
    setGameState(GAMESTATE.PLAYING)
    const newWord = getRandomWord()
    setWord(newWord)
    setDisplayWord(turnWordIntoBlanks(newWord))
    setBadGuessesList([])
    setCurrentLetter('')
  }

  const guessLetter = () => {
    // save the letter for guess
    const guessedLetter = currentLetter.toLowerCase()

    // clear out the input
    setCurrentLetter('')

    // ignore guesses that arent letters
    if (!guessIsValid(guessedLetter)) {
      return
    }

    // prevent guessing the same wrong letter lots of times
    if (badGuessesList.includes(guessedLetter)) {
      return
    }

    const letterIsInWord = isLetterInWord(guessedLetter, word)
    if (letterIsInWord) {
      // do stuff -- (good guess)

      // make sure we find ALL the instances of this letter!
      const letterIndexes = getLetterIndexes(guessedLetter, word)

      // HOMEWORK - why did this work? this is not easy! javascript is async and so is react
      const wordLetters = displayWord.split('')
      // go through the blank word -> replace the _ with the right letter in the indexes
      for (let i = 0; i < letterIndexes.length; i++) {
        const letterIndex = letterIndexes[i]
        wordLetters[letterIndex] = guessedLetter
      }
      setDisplayWord(wordLetters.join(''))


      // winning??
      // no more dashes /// all the letters are revealed
      // ISSUE - cant use displayWord here because it hasnt been updated yet (next tick)
      if (word == wordLetters.join('')) {
        setGameState(GAMESTATE.WIN)
      }

    } else {
      // do other stuff -- (bad guess)

      // need to call setBadGuessesList with a new object so react definitely re-renders
      setBadGuessesList([...badGuessesList, guessedLetter])

      // did we lose?
      // maximumBadGuesses
      if (badGuessesList.length >= maximumBadGuesses) {
        setGameState(GAMESTATE.LOSE)
      }
    }
  }

  return (
    <>
      <ManAndGallows badGuessCount={badGuessesList.length} />

      {gameState === GAMESTATE.WIN ? <p>YOU WIN!</p> : null}
      {gameState === GAMESTATE.LOSE ? <p>YOU LOSE!</p> : null}
      <Word word={displayWord}/>
      <br/>

      {
        gameState === GAMESTATE.PLAYING ? (
          <>
            <input
              value={currentLetter}
              onChange={(e) => setCurrentLetter(e.target.value)}
              maxLength={1}
              id="letterguess"
              placeholder="guess a letter"
              disabled={gameState !== GAMESTATE.PLAYING}
              onKeyDown={e => e.key === 'Enter' && guessLetter()}
            />
            <button onClick={guessLetter} disabled={gameState !== GAMESTATE.PLAYING}>Guess</button>
          </>
        ) : (
          <button onClick={resetGame}>Play Again</button>
        )
      }

      <br/>
      <Word additionalClasses={["badletters"]} word={badGuessesList.join("")}/>
    </>
  )
}

export default Game;
