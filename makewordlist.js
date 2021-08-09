const fs = require('fs')

let englishWords
try {
  const wordsContent = fs.readFileSync('google-10000-english-usa.txt', 'utf8')
  englishWords = wordsContent.split(/\s/g);
} catch (err) {
  console.error(err)
}

// what makes a good hangman word?
// LONGER -- greater than 6 letters

const goodWords = englishWords.filter(word => {
  // return true if good
  return word.length >= 6
})

console.log(goodWords.length, 'good words')
console.log(goodWords)


let outputString = "const wordlist = [\n"
const quotedWords = goodWords.map(word => {
return `"${word}"`
})
outputString += quotedWords.join(",\n");

outputString += `\n];
export default wordlist;`

fs.writeFileSync('js/wordlist.js', outputString)
