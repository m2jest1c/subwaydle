# Subwaydle

A Wordle-inspired NYC Subway daily puzzle game. Contains some source code lifted from the [open-source clone](https://github.com/cwackerfuss/word-guessing-game) by Hannah Park. Subwaydle is a static JavaScript app, written using Create React App with React, Sass, Semantic UI React and Mapbox. A few Ruby scripts were written to generate JSON data files used by the app.

This version of Subwaydle does not calculate a route based on the date. I made a sloppy edit which randomizes the date and as a result you get a new question every refresh. 

The official version of Subwaydle resides at https://subwaydle.com.

This fork runs at https://subwaydle.plausibility.cloud.

## Running locally

`````
brew install yarn
yarn install
yarn start
`````
Yarn may be installed through `npm` as well, if desired.

* To show the map that is displayed after finishing the puzzle: sign up for an account with [Mapbox](https://www.mapbox.com), get a token and add it to an `.env` file as `REACT_APP_MAPBOX_TOKEN`. You will also have to add your own map style in `src/components/MapFrame.jsx`.

* Ruby scripts in the `scripts/` directory produce the JSON files in `src/data` that are used by the app. *Warning:* viewing the `src/data` can reveal spoilers to the puzzle! All guesses are checked against the keys in the respective `solutions.json` file to be a valid trip, and the `answers.json` contains an array for the answer of each day. The values of the `solutions.json` object contain an example trip of stations that are traveled through for the trip.

Subway Route Symbols ® Metropolitan Transportation Authority. Used with permission.

Inspirations:
* [Wordle](https://www.powerlanguage.co.uk/wordle/)
* [Chengyu Wordle](https://cheeaun.github.io/chengyu-wordle/)
* [Nerdle](https://nerdlegame.com/)
