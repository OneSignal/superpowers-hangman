# Simple Hangman from Coding Superpowers

We made this hangman game as a group in the coding superpowers channel! We
started with some basics already set up so we could focus on writing the logic
of hangman -- how to get words and deal with them and interact with the user and
their guesses. Overall it was a good showcase for the constant decisions and
choices going on when taking a project from idea to execution and we ended up
with a playable (if a bit clunky/ugly) hangman game!


# How to learn from this

Play with the code! There is a section below with instructions on how
to build this locally. Once you have it running on your computer you
can do anything you like! If you make something neat you can even
share it back with the main repository as a pull request!


# Next Steps

We used this as a platform to think about and implement the hangman logic and
most of the UI but we started with some useful building blocks (the canvas that
draws the hanged man and a component to show the letters). Now that we've made
the logic, it would be a great exercise to delete the manandgallows component
and the word component and reimplement them yourself, perhaps in a nicer looking
or more configurable way.

Also, like all things and games especially, there is always lots and lots of
room to polish this. Make a new, better interface, make the winning and losing
more interesting than just some ugly text, or anything else!

If you want to learn more about the behind-the-scenes part there is plenty of
work that could be done in the 'project hygene' department like adding linters,
switching to typescript, or creating a deploy script.


# Set up

After cloning the project go into the project folder and run the following
commands (you'll need yarn installed globally):

`yarn install`


# How to run locally

After the initial set up you can start the build server with this command:

`yarn start`


# How to make a 'production' build

If you want to make a standalone build you can run the server locally with
the instructions above and then host the resulting `dist` folder. This will have
everything you need for a standalone static build you can host anywhere.
