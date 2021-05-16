# Chi

![Gitlab pipeline status](https://img.shields.io/gitlab/pipeline/zenotta/chi/master)
![NPM](https://img.shields.io/npm/l/chi-ui)

Chi is Zenotta's no-frills front end component library for use in blockchain UI applications, written for React. For when your blockchain projects don't need fancy, and want to ship fast and flexible.

..

## 📦 Installation

```
npm install chi-ui
```

```
yarn add chi-ui
```

..

## 💻 Usage

```javascript
import { Button, Search } from 'chi-ui';

const App = () => (
  <>
    <Button variant="contained">PRESS ME</Button>
    <Search label="Search here..." />
  </>
);
```

..

## 🔨 Development

You can clone the repo locally:

```
$ git clone git@gitlab.com:zenotta/chi.git
$ cd chi
$ npm install
$ npm start
```

This will run [Storybook](https://storybook.js.org/) at http://127.0.0.1:6006.

..

## 🤝 Contributing

Chi is still at an early stage of development and we welcome all contributions. You can submit any ideas as pull requests or as GitLab issues. We particularly welcome any new components which you feel will improve the development of 
blockchain-related UIs.

We will soon be creating a set of guidelines for any and all contributions, so stay tuned!

..

## 🏛 License

Chi is licensed under the [MIT License](https://gitlab.com/zenotta/chi/-/blob/master/LICENSE).
