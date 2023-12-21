# TODOs
_a very loose list of TODOs that I keep for this project. These TODOs are relevant for code behind the site, not the content of the site itself_

Pimary TODOs
- [ ] contact form
- [ ] script to build posts
  - [ ] add a help message to the script
  - [ ] support images and other assets in the directory
    - [ ] change the interface of the script to have input dir and output dir
    - [ ] figure out how to copy all images from the source directory to the output directory
    - [ ] figure out how to normalize all image paths from the input to the output
          I think for this part what I want is to just use the file names in the post markdown, but then
          traverse the dom of the post and change each of the image names to the image path that we will use
          in the final output
- [ ] script to update rss
- [ ] script
- [ ] write documentation about the article processing code

small todos
- [ ] investigate if this project should be "type": "module" or not in the package.json
- [ ] move vscode config to git ignore
- [ ] add a linter for this project (prettier?) Ideally something that also fomats markdown
- [ ] figure out how to use node instead of ptyhon3 for the local server
- [ ] figure out a bettter system for using branches and squash commits etc for the work on this repo