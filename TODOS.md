# TODOs
_a very loose list of TODOs that I keep for this project. These TODOs are relevant for code behind the site, not the content of the site itself_

Pimary TODOs
- [ ] add a README
- [ ] contact form
- [ ] script to build posts
  - [x] create a json metadata file that has all the info about the post
  - [x] parse the h2 headings and put those into the content
  - [x] move all <head> content into the generator
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
- [ ] add a linter for this project