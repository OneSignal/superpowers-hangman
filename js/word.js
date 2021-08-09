// {word: string, additionalClasses?: string[]}
const Word = props => {
  const letters = props.word ? props.word.split('') : []
  const classes = props.additionalClasses ? props.additionalClasses : []
  classes.push("word")

  return (
    <div className={classes.join(" ")}>
      {letters.map(letter => (
        <>
         <span className="letter">{letter}</span>
         <span className="spacer" style={{"margin-left": "10px"}}></span>
        </>
      ))}
    </div>
  )
}

export default Word
