import Game from './game';

const App = () => {
   return (
      <div className="center">
       <h1>Hangman</h1>
       <p>Only guess letters!</p>
       <Game/>
      </div>
   )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
