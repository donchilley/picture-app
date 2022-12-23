## To build and run the client and server containers in Linux environment
## Open two terminals, navigate to the picture-app directory in both
## In first terminal run
cd server && npm i && npm run start
## In second terminal run
cd client && npm i && npm run start

Would have liked to
- add a popup notification for status after uploading a new image.
- reload images when overwriting an already existing image
- containerize both the client and server with docker.
- style the input file button