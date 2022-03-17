# sextant-calculator

Calculates the latitude with celestial navigation based on an elevation angle measurement of the sun using a sextant.

[Live Demo](https://sextant-calculator.pages.dev)

## Run

Install the dependencies

```bash
cd sextant-calculator
npm install
```

and start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see sextant-calculator running.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

---

Based on [sveltejs/template](https://github.com/sveltejs/template)
