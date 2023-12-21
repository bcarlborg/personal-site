# Notes to the developer
Presumably, I (beau) am going to be the only person acting as a developer in this repository... so I guess these are really just notes to myself about how I set things up.

## Project dependencies
This project has a few dependencies for building the sites html from the markdown content in `src/`.
- `node`: all build scripts... but most likely any other js runtime would work
- `npm`: this project uses npm for package managment
- `python3`: python3 is used to serve the website locally during development

## Deploying the site
Cloudflare is configured to publish the dist directory every time new content is pushed to that directory in this repository.
So... to udpate the site, simply push new or updated content to the `/dist` directory on the main branch of this repo.

## Building the site
TODO -- still in the process of implementing a lightweight build system. I will write more here once the approach is solidified.

## Serving the site locally
There is a simple npm script defined in `package.json` that will the http server module from python3 to deploy the site locally.
Simply run `npm run serve-local` to serve the site at [http://0.0.0.0:8080/](http://0.0.0.0:8080/).
```

