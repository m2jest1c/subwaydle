import weekdayAnswers from './../data/weekday/answers.json';
import weekdaySolutions from './../data/weekday/solutions.json';
import weekdayRoutings from './../data/weekday/routings.json';
<<<<<<< HEAD
import transfers from './../data/transfers.json';

=======
import weekendAnswers from './../data/weekend/answers.json';
import weekendSolutions from './../data/weekend/solutions.json';
import weekendRoutings from './../data/weekend/routings.json';
import nightAnswers from './../data/night/answers.json';
import nightSolutions from './../data/night/solutions.json';
import nightRoutings from './../data/night/routings.json';
import transfers from './../data/transfers.json';

const ROUTES_WITH_NO_WEEKEND_SERVICE = ['B', 'W'];
const ROUTES_WITH_NO_NIGHT_SERVICE = ['B', 'C', 'W', 'GS'];
>>>>>>> main
const GAME_EPOCH = new Date('January 29, 2022 00:00:00').valueOf();
export const NIGHT_GAMES = [350, 351];
const DEKALB_AV_FLATBUSH_STOP = "R30";

const today = new Date();
const now = Date.now();

const isSimilarToAnswerTrain = (guess, index) => {
  let begin;
  let end;
  const answer = todaysTrip()[index];
  const solution = todaysSolution();
  const routings = todaysRoutings();
  switch (index) {
    case 0:
      begin = solution.origin;
      end = solution.first_transfer_arrival;
      break;
    case 1:
      begin = solution.first_transfer_departure;
      end = solution.second_transfer_arrival;
      break;
    default:
      begin = solution.second_transfer_departure;
      end = solution.destination;
  }

  const guessSubrouting = retrieveSubrouting(guess, routings, begin, end);

  if (!guessSubrouting) {
    return false;
  }

  const answerSubrouting = retrieveSubrouting(answer, routings, begin, end);

  if (guessSubrouting.includes(begin) && guessSubrouting.includes(end) && answerSubrouting.includes(begin) && answerSubrouting.includes(end)) {
    return true;
  }

  const guessSubroutingInner = guessSubrouting.slice(1, guessSubrouting.length).filter(s => s !== DEKALB_AV_FLATBUSH_STOP);
  const answerSubroutingInner = answerSubrouting.slice(1, answerSubrouting.length).filter(s => s !== DEKALB_AV_FLATBUSH_STOP);


  if (guessSubroutingInner.every(s => answerSubroutingInner.includes(s)) || answerSubroutingInner.every(s => guessSubroutingInner.includes(s))) {
    return (guessSubrouting.includes(begin) && answerSubrouting.includes(begin)) || (guessSubrouting.includes(end) && answerSubrouting.includes(end));
  }

  return false;
}

const retrieveSubrouting = (train, routings, begin, end) => {
  let trainLookup;
  if (train === 'A') {
    if (routings['A1'].includes(begin) && routings['A1'].includes(end)) {
      trainLookup = 'A1';
    } else {
      trainLookup = 'A2';
    }
  } else {
    trainLookup = train;
  }

  const beginIndex = [begin, transfers[begin]].flat().filter(n => n).map(s => routings[trainLookup].indexOf(s)).find(i => i > -1);
  const endIndex = [end, transfers[end]].flat().filter(n => n).map(s => routings[trainLookup].indexOf(s)).find(i => i > -1);

  if (beginIndex == null || endIndex == null) {
    return;
  }

  if (beginIndex < endIndex) {
    return routings[trainLookup].slice(beginIndex, endIndex + 1);
  }
  return routings[trainLookup].slice(endIndex, beginIndex + 1);
}

export const routesWithNoService = () => {
<<<<<<< HEAD
=======
  if (isNight) {
    return ROUTES_WITH_NO_NIGHT_SERVICE;
  }
  if (isWeekend) {
    return ROUTES_WITH_NO_WEEKEND_SERVICE;
  }
>>>>>>> main
  return [];
}

export const isValidGuess = (guess) => {
  const flattenedGuess = guess.join('-');
<<<<<<< HEAD
=======
  if (isNight) {
    return !!nightSolutions[flattenedGuess];
  }
  if (isWeekend) {
    return !!weekendSolutions[flattenedGuess];
  }
>>>>>>> main
  return !!weekdaySolutions[flattenedGuess];
}

/* This is pretty sloppy I think, I've basically never done much with JS. The intent of this is to keep the random number constant throughout the 
session and then on refresh it changes the stations. It's to eliminate the daily wait, which I sorta dislike. This is the sole edit I made.*/

const randomNo = Math.random();

export const todayGameIndex = () => {
  // return Math.floor(daysBetween(GAME_EPOCH, now));
  return new Date(Math.floor(randomNo * (now - GAME_EPOCH + 1) + GAME_EPOCH));
}

const treatAsUTC = (date) => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

const daysBetween = (startDate, endDate) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

export const isNight = NIGHT_GAMES.includes(todayGameIndex());

const todaysRoutings = () => {
<<<<<<< HEAD
=======
  if (isNight) {
    return nightRoutings;
  }
  if (isWeekend) {
    return weekendRoutings;
  }
>>>>>>> main
  return weekdayRoutings;
}

export const todaysTrip = () => {
  // const index = todayGameIndex();
  const index = todayGameIndex();
<<<<<<< HEAD
=======
  if (isNight) {
    return nightAnswers[index % nightAnswers.length];
  }
  if (isWeekend) {
    return weekendAnswers[index % weekendAnswers.length];
  }
>>>>>>> main
  return weekdayAnswers[index % weekdayAnswers.length];
}

export const flattenedTodaysTrip = () => {
  return todaysTrip().join('-');
}

export const todaysSolution = () => {
<<<<<<< HEAD
=======
  if (isNight) {
    return weekendSolutions[todaysTrip().join("-")];
  }
  if (isWeekend) {
    return weekendSolutions[todaysTrip().join("-")];
  }
>>>>>>> main
  return weekdaySolutions[todaysTrip().join("-")];
}

export const isWinningGuess = (guess) => {
  return guess.join('-') === todaysTrip().join('-');
}

export const updateGuessStatuses = (guesses, setCorrectRoutes, setSimilarRoutes, setPresentRoutes, setAbsentRoutes, setSimilarRoutesIndexes, correctRoutes, similarRoutes, presentRoutes, absentRoutes, similarRoutesIndexes) => {
  const correct = correctRoutes || [];
  let similar = similarRoutes || [];
  const present = presentRoutes || [];
  const absent = absentRoutes || [];
  const similarIndexes = similarRoutesIndexes || {};

  guesses.forEach((guess) => {
    const remainingRoutes = [];
    const remainingGuessPositions = [];

    todaysTrip().forEach((routeId, index) => {
      if (guess[index] === routeId) {
        correct.push(routeId);
        Object.keys(similarIndexes).forEach((r) => {
          const s = similarIndexes[r];
          if (s.includes(index)) {
            similarIndexes[r] = s.filter(t => t !== index);
            if (similarIndexes[r].length === 0) {
              delete similarIndexes[r];
              similar = similar.filter(t => t !== r);
            }
          }
        })
      } else {
        remainingRoutes.push(routeId);
        remainingGuessPositions.push(index);

        if (isSimilarToAnswerTrain(guess[index], index)) {
          similar.push(guess[index]);
          if (similarIndexes[guess[index]] && !similarIndexes[guess[index]].includes(index)) {
            similarIndexes.push(index);
          } else if (!similarIndexes[guess[index]]) {
            similarIndexes[guess[index]] = [index];
          }
        }
      }
    });

    remainingGuessPositions.forEach((index) => {
      if (remainingRoutes.includes(guess[index])) {
        present.push(guess[index]);
      } else {
        absent.push(guess[index]);
      }
    });
  });

  setCorrectRoutes(correct);
  setSimilarRoutes(similar);
  setPresentRoutes(present);
  setAbsentRoutes(absent);
  setSimilarRoutesIndexes(similarIndexes);
}

export const checkGuessStatuses = (guess) => {
  const results = ['absent', 'absent', 'absent'];
  const remainingRoutes = [];
  const remainingGuessPositions = [];

  todaysTrip().forEach((routeId, index) => {
    if (guess[index] === routeId) {
      results[index] = 'correct';
    } else {
      remainingRoutes.push(routeId);
      remainingGuessPositions.push(index);
      if (isSimilarToAnswerTrain(guess[index], index)) {
        results[index] = 'similar';
      }
    }
  });

  remainingGuessPositions.forEach((index) => {
    if (remainingRoutes.includes(guess[index])) {
      results[index] = 'present';
    }
  });

  return results;
}
