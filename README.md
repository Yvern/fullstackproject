********* Football Match Organisation Website *********

--------- Introduction ---------
This document provides an overview of the project contents and requirements to run the website locally.
The website designed in this project is one of the deliverables for the final year project of the
BSc Computing Science at the University of East Anglia. It is intended for the casual organisation of
football matches (specifically by members of staff) and is not currently meant to support a large user base.

The deployed website can be found on:

https://squadsquare.herokuapp.com

--------- Contents ---------

1.  Prerequisites
2.  Dependency Installation
3.  Launch Project
4.  Project File Structure
5.  Relevant NPM Packages
6.  Client Project File Structure
7.  Client Relevant NPM Packages

Appendices
Appendix A
Appendix B

--------- 1. Prerequisites ---------
To run the project locally, the following requirements will need to be met:

1.  Have Node.js Version 8.9.4+ and NPM version 5.6.0+ installed on the running machine
2.  Acquire keys for Google OAuth and setup OAuth
3.  Acquire keys for mLab to setup a mongoDB database
4.  Aquire keys for SendGrid to setup Email sending
5.  An internet connection

A guide to installing or acquiring each of these can be found in Appendix A.

For this project it is recommended to have some knowledge of Express, React and
Redux to understand and contribute to the project.

--------- 2. Dependency Installation ---------
To successfully run the project, the saved node package dependencies need to be installed
before running the project. To do this, open a command line window in the folder containing the
project (the folder that contains this README file).

Inside the command line window, run the following command:

npm install

This should initiate the installation of all dependencies to run the project. Leave it to install
the dependencies. If any errors occur, check the command line error log or check Appendix B for
help resolving the error.

--------- 3. Launch Project ---------
To launch the project, navigate to the project folder and set the following environment variable:

NODE_ENV="development"

On Windows powershell, this can be done using:
$Env:NODE_ENV="development"

On Linux this can be done using:
NODE_ENV="development"

This is to prevent the project from trying to run in the production environment.
Once the environment is set up, in the same project folder run the following command:

npm run dev

This should launch the project (server and client) and automatically load the website in your
preferred browser.

If any errors occur, try the resolutions suggested in the error messages or consult Appendix B.

--------- 4. Project File Structure ---------
The project's root folder is the folder this README.md is in, the 'server' folder. This folder
contains all files pertaining to the server logic, as well as a folder that contains the
client-side scripts while will be served up when loading the index.html file.

The server folder's contents can be further sub-divided into the following folders:

1.  Client - this folder contains all files served up when loading the website on the client's machine
2.  Config - this folder contains keys used to connect to third party servers and other secure services
3.  Middlewares - this folder contains middleware functions, specifically middleware to require login
4.  Models - this folder contains all Mongoose Schema models for the database content
5.  Node-modules - this folder contains all relevant NPM packages used in the project (not pushed to Git)
6.  Routes - this folder contains files with all possible enpoints for the server and how to respond to requests
7.  Services - this folder contains serve functions, such as the mail sending services and scheduled tasks

The main file that is run to start the server is the index.js file in the server directory (this directory).
The package.json file contains all NPM packages that have been installed and the exact versions which are installed.
This file is managed by npm or yarn and should not be manually edited.

A more detailed description of the file structure of the Client folder can be found in
section 6. Client Project File Structure

--------- Relevant NPM Packages ---------
This section discusses each of the NPM packages installed and their purpose within the project.

1.  @sendgrid/mail
    This package allows for sending automated emails using Sendgrid

2.  babel-polyfill
    This package is used to translate some ES6 style Javascript to ES5 style Javascript

3.  body-parser
    Used to parse JSON with Express

4.  concurrently
    Used to concurrently execute server and client side scripts

5.  cookie-session
    Enables the use of cookies

6.  express
    Express is a framework for setting up the server, including listening for requests and providing methods (that comply
    with REST standards) to respond to the requests made.

7.  mongoose
    A library that provides functionality to interact with a MongoDB database

8.  node-scheduled
    Allows for scheduling functions to execute at certain times of the day or at regular intervals

9.  passport
    A library that provides functionality for logging in securely

10. passport-google-oauth20
    The specific passport library that allows for logging in with Google OAuth 2.0

11. nodemon
    Nodemon allows the server scripts to restart when changes are made

--------- 6. Client Project File Structure ---------
Similar to the server side of the project, the client side was given a clear directory structure.
There are multiple levels, however, so the directories will be discussed per level.

Within the client folder, the following sub-folders exist:

1.  Node-modules - this folder contains all relevant NPM packages used in the project (not pushed to Git)
2.  Public - this folder contains all publicly available content, including the index.html file and images
3.  Src - this folder contains all React and Javascript source code

**_ 3 Src _**
The src directory can be explored further. It is the primary directory where the client side logic
is managed. As the client-side has a sub-architecture, the content of the src folder was sub-divided
according to the purpose of the source files in relation to the website architecture.

3.1. Actions - this folder contains Redux actions to modify the client side state
3.2. Components - this folder contains all React components to display content on the website
3.3. Css - this folder contains css styles (excluding materializeCSS sheets)
3.4. Reducers - this folder contains Redux reducers that determine the shape of the state and how it is modified
3.5. Utils - this folder contains general utility functions

The Actions and Reducers are both part of the Redux framework and provide State Handling functionality.

**_ 3.2 Components _**
The Components directory contains React Components. This folder is further subdivided to indicate
the structure of the website itself.
As per convention, within this folder all folders and files that contain React Components
as their primary exports are capitalised (e.g. Forms) whereas all folders and files
containing logic and functions as their primary exports are all lowercase (e.g. routes)

3.2.1 Forms - this folder contains all Form logic managed by redux-form, used to allow users to enter information
3.2.2 General - this folder contains general Components that may be relevant for use in any other Components
3.2.3 routes - this folder exports the mapping between Components and URLs, and all Components it may map to

This folder also contains the App.js Component that is inserted into the index.html file as the root of all
other React Components. The Nav.js, Footer.js and TestLayout.js components were also present alongside App.js,
as these Components form the base of the website's layout.

**_ 3.2.3 routes _**
This folder exports a mapping of URLs to the Components that are displayed for that URL. Each directory inside
routes corresponds to a specific 'page' on the website. Each of these directories also contains a file of the
same name as the directory which it exports as its main view.

3.2.3.1 AccountSettings - this directory contains the view Components for the account settings page
3.2.3.2 Dashboard - this directory contains the view Components for the dashboard page
3.2.3.3 EventCreate - this directory contains the view Components for the 'create new event' page
3.2.3.4 EventDetails - this directory contains the view Components for the event details page
3.2.3.5 EventResponse - this directory contains the view Components for the event response page view by recipients
3.2.3.6 Landing - this directory contains the view Components for the home page
3.2.3.7 SquadCreate - this directory contains the view Components for the 'create new squad' page
3.2.3.8 SquadDetails - this directory contains the view Components for the squad details page

Components from other directories may be used, as Components are meant to be reusable throughout the project
where appropriate.

--------- Relevant NPM Packages ---------
This section gives an overview of the NPM packages used in the client side of this project and their purpose.

1.  axios
    Axios allows for making RESTful API calls to the server and receiving information from the server

2.  materialize-css
    MaterializeCSS is a CSS library that provides a vast number of premade CSS rules and some Javascript functionality

3.  moment
    Moment is a package that is used to format and calculate with Time and Date values more easily

4.  react
    React is the primary library on which the client side was built

5.  react-datetime
    React-datetime provides a functional date and time picker

6.  react-dom
    A requirement for react which allows for use of a virtual DOM

7.  react-redux
    React integration library for Redux that provides function to connect the Redux state and React components

8.  react-router
    Allows for the emulation of serving up files for specific routes, instead serving up React Components

9.  react-routes-dom
    Specific version of React Router used for React for websites

10. redux
    Redux gives functions to manage state for the client-side

11. redux-form
    A package using redux specific for implemented forms

12. redux-logger
    Used to log each state change in a comprehensive way for developers to track the state changes

13. redux-thunk
    Used to handle asynchronous actions, such as retrieving data from the server, with Redux

--------- Appendix A ---------
Key guides

**_ GENERAL _**
The keys that will be acquired will be stored in the file that can be found at :

./config/dev-keys-template.js

Please follow the instructions to replace the key fields with their respective keys.
Once finished with the installation, save the file

dev-keys-template.js

with the file name:

dev.js

in the same location (./config) to ensure they work successfully.

**_ Node.js _**
To install Node.js, visit the website:

https://nodejs.org/en/downloads

Download Node version 8.9.4 or above for the appropriate OS (Windows/MacOS/Linux). Ensure NPM (Node Package Manager)
is included in the download. Follow the installation instructions to install Node.js and NPM.

**_ Google OAuth _**
Visit the Google API Console at:

https://console.developers.google.com

Log in using your Google account or create a new account.

Steps to acquire OAuth keys:

1.  Select Create New Project. Finish creating the project.
2.  From the API Library, search for or select the Google+ API.
3.  When found, click the option to 'Enable' the API.
4.  If a warning appears with 'To use this API, you may need credentials', click the
    'Create Credentials' button in the warning message to do so.
    4.1 From the dropdown under 'Where will you be calling the API from?', select the
    option 'Web browser (Javascript)'
    4.2 From the radio buttons under 'What data will you be using', select 'User data'
    4.3 Click the 'What credentials do I need?' button
    4.4 In the field under 'Authorised JavaScript origins', fill in the following URL:
    http://localhost:3000
    4.5 In the field under 'Authorised redirect URIs', fill in the following URL:
    http://localhost:3000/api/callback/oauth
    4.6 Click the 'Create client ID' button.
5.  Set up the consent screen as instructed. Click the button to submit.
6.  In the next part screen, follow these steps:
    6.1 Select 'Web application' under Application Type
    6.2 Under Restrictions, fill in http://localhost:5000 under the Authorised Javascript origins (no / at the end)
    6.3 Fill in http://localhost:5000/auth/google/callback under Authorised redirect URIs
    6.4 Fill in http://localhost:3000/auth/google/callback also under Authorised redirect URIs
    6.5 Click 'Create', the button's text will change to 'Creating...'
    6.6 Wait until it has finished creating
7.  Once created, navigate to the 'Credentials' section it is not already showing
8.  Under OAuth 2.0 client IDs, find the newly created Client ID and click on the name to navigate to its page
9.  At the top of the page, the Client ID and Client secret should be shown
10. Open the dev-keys-template.js file in a text editor
11. From the Google Credentials page, copy the text after Client ID and insert it in the dev-keys-template.js to replace --YOUR_GOOGLE_CLIENT_ID_HERE--
12. From the Google Credentials page, copy the Client Secret and insert it in the dev-keys-template.js file to replace --YOUR_GOOGLE_CLIENT_SECRET_HERE--
13. Save the file

**_ mLab _**
Visit mLab at:

https://mlab.com

Log using your existing account or sign up to mLab.

Steps to acquire mLab keys:

1.  Under MongoDB Deployments, click the 'Create New +' button.
2.  Under Plan Type, select SANDBOX (free)
3.  Click the 'Continue' button
4.  Select a region (any region will work but it is recommended to select the region closest to your location)
5.  Click the 'Continue' button
6.  Enter a name for the database under 'Database name'
7.  Click the 'Continue' button
8.  Ensure the MongoDB version is 3.4 or up
9.  Click 'Submit Order'
10. Return to the 'Home' screen if not already returned to the 'Home' screen
11. Navigate to the newly created database under MongoDB Deployments
12. At the top of the database, it should show two links to connect to the database
    12.1 Open the dev-keys-template.js file
    12.2 From the mLab website, copy the link underneath the header 'To connect using a driver via the standard MongoDB URI' to replace --YOUR_MONGO_URI_HERE--
    12.3 Replace <dbuser> with your mLab username (NOT your account name)
    12.4 Replace <dbpassword> with your mLab password
13. Save the file

**_ SendGrid _**
Visit SendGrid at:

https://sendgrid.com/

Log in using your existing acount or sign up to SendGrid.

Steps to acquire SendGrid keys:

1.  Navigate to 'Settings' > 'API Keys' from the menu (on the left hand side)
2.  Click the button 'Create API Key'
3.  Select Full Access under Permissions
4.  Copy the key under Api Key Created (Please note the key cannot be shown again so ensure it is saved)
5.  Open the dev-keys-template.js file
6.  Insert the copied key in the file to replace --YOUR_SENDGRID_KEY_HERE--
7.  Save the file

--------- Appendix B ---------
Guide to potential solutions to errors

**_ Dependency Installation _**
Potential errors in npm install:

Error: ENOENT: can't find file
Possible issue/resolution: Ensure that the npm install command is running in the
project main folder. This folder should contain a package.json and yarn.lock file.

Error: NPM gives a warning that its version is out of date
Possible issue/resolution: Run ' npm i -g ' in the command line OR follow the instructions on screen

**_ Launch Project _**

Potential errors when launching the project:
