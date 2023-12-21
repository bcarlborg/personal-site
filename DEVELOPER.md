# Notes

## Local testing

- to test the site locally, I recommend running a lightweight http server on your local machine to serve the assets. This is useful because it ensures that the root paths for the site in html don't take you to the root paths on your machine. (visit http://0.0.0.0:8080/ in the browser)
```
cd dist/
python3 -m http.server 8080
```

