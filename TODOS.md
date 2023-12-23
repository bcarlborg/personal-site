# TODOs
_a very loose list of TODOs that I keep for this project. These TODOs are relevant for code behind the site, not the content of the site itself_

Pimary TODOs
- [ ] contact form
- [ ] script to build posts
  - [ ] support images and other assets in the directory
    - [ ] for a given post, identify the images in the dom of that post, then copy those images from the
          the input directory to the output directory
    - [ ] normalize the image paths in the output blog post dom.
          I think for this part what I want is to just use the file names in the post markdown, but then
          traverse the dom of the post and change each of the image names to the image path that we will use
          in the final output
    - [ ] update interface to dynamically pass an assets folder
- [ ] write documentation about the article processing code

small todos
- [ ] investigate if this project should be "type": "module" or not in the package.json
- [ ] move vscode config to git ignore
- [ ] add a linter for this project (prettier?) Ideally something that also fomats markdown
- [ ] figure out how to use node instead of ptyhon3 for the local server
- [ ] figure out a bettter system for using branches and squash commits etc for the work on this repo
- [ ] move the build scripts into npm scripts