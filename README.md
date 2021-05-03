### PokeDex created with ReactJS

This is a work in progress MERN (MongoDB, Express, React, Node) project originally intended to get familiar with React. The project is now currently my main focus for its value in providing many fullstack learning opportunities and challenges.

#### Some TODOS:

Add different database features e.g. favoriting pokemon, creating a team.

- MongoDB now connected to app. A user can write in their team name and add pokemon to that team. Future addition should allow user to select an already created team and add to that one instead of writing in each time. Most likely can be implemented by checking if text input is blank or dropdown is selected.

- Users can delete a pokemon from a team now. TODO: add the ability to delete an entire team at once: mongoose library to delete many:

#### mongoose deleteMany({team: "whatever team is selected" }).then(do something - tell user team is deleted, render a new view, etc.)

Learn about user authentication; attempt to implement - Auth0?

Style app - Tailwind, Material UI, styled-components

Implement the data/display for pokemon that the selected evolves to. Complications with API endpoint and resulting data in the evolution chain

- evolution chain rendering 95% complete. TODO: add method to handle pokemon with multiple evolution forms e.g. eevee

~~Add a filter search method based on stats, type, etc.~~

~~Implement routing functionality. Click a displayed pokemon/result and go into a more detailed page/component~~

~~The project is currently hosted on Netlify~~

~~[React PokeDex](https://cool-react-pokedex.netlify.app/)~~

Project is on Heroku now, serves build file and is connected to mongoDB

https://react-pokedex-tdean787.herokuapp.com/

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
