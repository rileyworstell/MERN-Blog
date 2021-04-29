1) create react app in folder called client
    npx create-react-app client
    cd client // to go into folder
    npm start // to run react

To use concurrency (need it installed):
    add the following to scripts in package.json:
        "client": "npm start --prefix client",
        "dev": "concurrently \"npm run server\" \"npm run client\""

INSTALL CLIENT SIDE DEPENDENCIES:
    npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment uuid

optional:
    cd into client and then rn `rm -rf .git` to delete git folder in react folder


REDUX: Tutorial:
    State Manager:
