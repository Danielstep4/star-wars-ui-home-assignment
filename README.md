# Star Wars User Interface Home Assignment 

![DEMO](https://s9.gifyu.com/images/ezgif.com-gif-maker9684f8142dc3a657.gif)

## Getting Started
To get a local copy up and running follow these steps.

### Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js
* Docker

### Cloning The GitHub Repository

```sh
git clone https://github.com/Danielstep4/star-wars-ui-home-assignment.git
cd star-wars-ui-home-assignment
```


<hr>

## Building Docker container 

```sh
docker build -t star-wars-ui . 
```
## Running Your Application 

start the app server:

```sh
docker run -d -p 3000:3000 star-wars-ui
```

# Usage 
- Once the app is up and running the user interface will be exposed to port 3000

<hr>

## Basic Design Link
[Basic Design](https://www.figma.com/file/iyWZ2Go3uSMo2sb5fMYf7j/Star-Wars-UI-Desi?node-id=0%3A1)