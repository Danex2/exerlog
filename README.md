# Exerlog - Log your quarantine workouts 💪💪

![Staging CI](https://github.com/Danex2/exerlog/workflows/Build%20and%20Deploy%20app/badge.svg)

![Puppet working out](https://media.giphy.com/media/xUPGcKoAYCn5fHK0Zq/giphy.gif)

## About

Just a fullstack app made with express / react during a pandemic to help me get back into habit of coding in my free time as well as something to help people keep track of their at home workouts.

## Development

### Prerequisites

- At least **Node version 12** installed
- MongoDB installed
- Create a `.env` file in the root of the project with these variables

```javascript
PORT = 3000;
MONGODB_URI = YOUR_MONGO_URI_HERE;
```

### Installation

```javascript
git clone https://github.com/Danex2/exerlog.git
cd exerlog
npm install
```

### Running the project without Docker

To run the project just do `npm run app`, a new tab / browser will open for you.

### Running the project with Docker

TODO

## Testing

Tests are located in the `tests` folder, to run them just type `npm run test` or if you want to run in watch mode just type `npm run test:watch`.

## Author

[Dane Miller](https://twitter.com/hybridearth)

## License

This project is open source and available under the [MIT License](https://github.com/danex2/exerlog/blob/master/LICENSE).
