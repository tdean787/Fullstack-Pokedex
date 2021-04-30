### PokeDex created with ReactJS

This is a work in progress project intended to build familiarity with React and it's various features.

#### Some TODOS:


Add different database features e.g. favoriting pokemon, creating a team 

- MongoDB now connected to app. Currently, a user could write in a team name and submit their selected pokemon to that team. the teams and pokemon are each unique objects in the same collection. Teams are not segmented by collection or database.
 
Style app

Implement the data/display for pokemon that the selected evolves to. Complications with API endpoint and resulting data in the evolution chain 

- evolution chain rendering 95% complete. TODO: add method to handle pokemon with multiple evolution forms e.g. eevee

 ~~Add a filter search method based on stats, type, etc.~~
 
 ~~Implement routing functionality. Click a displayed pokemon/result and go into a more detailed page/component~~

~~The project is currently hosted on Netlify~~

~~[React PokeDex](https://cool-react-pokedex.netlify.app/)~~

Project is moving to Heroku for hosting, easier integration with newly created backend

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
