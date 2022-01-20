<div style="display: flex; justify-content: center; padding-bottom: 50px">
    <img src="https://www.testntrack.com/assets/images/logo.png" alt="testntrack"/>
</div>

# TestnTrack

> testntrack [website](https://www.testntrack.com/)

TestnTrack backend service

Production api route [api.testntrack.com](https://api.testntrack.com).  
Production api latest postman [collection](https://www.getpostman.com/collections/fb50ca09ace0c8f55363)

> Entry point of our project is `server.js` file from where we start the server.

Server deployment folder path "var/www/api_server"  
Server logs folder path "var/www/logs"  
Server data folder path "var/www/data"

1. audio
2. docs
3. image
4. pdf

Webstie deployment folder path "var/www/html"

1. Master admin folder "var/www/html/admin"

    > admin url [admin.testntrack.com](https://admin.testntrack.com)

2. School admin folder "var/www/html/school"

    > school admin url [school.testntrack.com](https://school.testntrack.com)

3. TestnTrack website folder "var/www/html/main"

    > testntrack [website](https://www.testntrack.com/)

## Npm scripts to run

Install dependenices and dev-dependenices

```
npm install
```

Development server

```
npm run dev
```

Production server (local)

```
npm run start
```

Eslint (development)

```
npm run eslint
```

## Commands for production server

Production server (hosted/e2e)

```
pm2 start server.js
```

Production server restart (hosted/e2e)

```
pm2 restart [project_name/id]
```

## Folder structures

-   app
    -   v1
        1. controller
        2. routes
    -   app.js
-   database
    -   models
    -   mongo.connection.js
-   middleware
-   services
-   views
-   utils
-   views
-   config

### app

app folder consists routes folder and controllers folder

> `app.js` file is to build fastify server and use that server in server.js file

### config

config folder consists all the important config files for the project for production and development.

1. firebase-service-account.json
2. google.json
3. config.json

### service

service folder have all the services related files.  
db folder have database related services and auth folder have authentication  
related files and all services on the root path.  
eg. otp, firebase, push notification

### views

view consists all the email related template views and have the other views.
currently views only consists email related template for users.

### database

database folder consists all the models and database connection related files.
models folder consists all database schemas and models.

# Hosted on

<img src="https://www.e2enetworks.com/wp-content/themes/e2enetworks/images/E2Enetworks-logo.svg" alt="E2E Networks" width="100"/>

our server and all the other websites are hosted on e2e networks and all the server credentials can obtained from the department.

<!-- <svg viewBox="0 0 105 36" role="img" width="105px" height="41px" aria-hidden="true"><path fill="#222222" d="M11.679 26.754h2.353v6.423h4.111v2.06H11.68v-8.483zM20.58 31.02v-.024c0-2.436 1.965-4.412 4.584-4.412 2.62 0 4.56 1.951 4.56 4.387v.025c0 2.436-1.965 4.41-4.584 4.41-2.618 0-4.56-1.95-4.56-4.386zm6.743 0v-.024c0-1.223-.885-2.291-2.183-2.291-1.285 0-2.147 1.042-2.147 2.266v.025c0 1.222.886 2.29 2.171 2.29 1.298 0 2.159-1.042 2.159-2.266zM32.604 31.517v-4.763h2.389v4.714c0 1.223.618 1.806 1.564 1.806.946 0 1.564-.557 1.564-1.745v-4.775h2.39v4.7c0 2.74-1.564 3.939-3.978 3.939s-3.93-1.223-3.93-3.878M44.112 26.755h3.274c3.032 0 4.79 1.744 4.79 4.192v.025c0 2.447-1.782 4.265-4.838 4.265h-3.226v-8.483zm3.31 6.397c1.408 0 2.34-.775 2.34-2.146v-.024c0-1.357-.932-2.145-2.34-2.145h-.958v4.316l.959-.001zM55.596 26.754h6.791v2.06h-4.438v1.442h4.014v1.951h-4.014v3.03h-2.353v-8.483zM65.661 26.754h2.353v6.423h4.111v2.06h-6.464v-8.483zM78.273 26.693h2.268l3.614 8.544h-2.522l-.62-1.515H77.74l-.606 1.515h-2.474l3.614-8.544zm2.062 5.2l-.946-2.413-.959 2.412h1.905zM87.186 26.754H91.2c1.298 0 2.195.34 2.765.921.498.485.752 1.14.752 1.976v.024c0 1.296-.693 2.156-1.746 2.605l2.025 2.957H92.28l-1.71-2.57h-1.03v2.57h-2.353v-8.483zm3.905 4.072c.8 0 1.262-.388 1.262-1.006v-.024c0-.667-.486-1.006-1.275-1.006h-1.54v2.038l1.553-.002zM98.112 26.754h6.827v2h-4.498v1.284h4.075v1.854h-4.075v1.346H105v1.999h-6.888v-8.483zM6.528 32.014c-.33.744-1.023 1.272-1.944 1.272-1.286 0-2.171-1.067-2.171-2.29v-.025c0-1.223.86-2.266 2.146-2.266.97 0 1.708.595 2.02 1.406h2.48c-.398-2.02-2.173-3.526-4.475-3.526-2.62 0-4.584 1.977-4.584 4.41v.024c0 2.436 1.94 4.388 4.56 4.388 2.24 0 3.991-1.45 4.453-3.393H6.528z"></path><path d="M89.012 22.355l.257-.887c.306-1.056.192-2.031-.321-2.748-.472-.66-1.259-1.049-2.214-1.094l-18.096-.229a.358.358 0 01-.285-.151.367.367 0 01-.04-.326.481.481 0 01.42-.321l18.263-.232c2.166-.099 4.512-1.856 5.333-3.998L93.37 9.65a.659.659 0 00.028-.36C92.216 3.975 87.468 0 81.792 0c-5.23 0-9.67 3.373-11.263 8.061a5.34 5.34 0 00-3.756-1.039 5.356 5.356 0 00-4.637 6.644c-4.099.12-7.386 3.475-7.386 7.6 0 .368.028.735.082 1.1a.354.354 0 00.348.305l33.408.004h.009a.44.44 0 00.415-.32z" fill="#F6821F"></path><path d="M95.04 9.847c-.167 0-.334.004-.5.013a.28.28 0 00-.079.017.285.285 0 00-.182.192l-.712 2.456c-.305 1.055-.192 2.03.322 2.746.471.661 1.258 1.05 2.213 1.094l3.858.232a.351.351 0 01.275.149.365.365 0 01.041.328.484.484 0 01-.42.32l-4.008.232c-2.176.1-4.521 1.856-5.342 3.998l-.29.756a.212.212 0 00.095.262c.03.017.062.027.096.028h13.802a.366.366 0 00.356-.265 9.846 9.846 0 00.367-2.677c-.001-5.457-4.429-9.88-9.891-9.88z" fill="#FBAD41"></path></svg> -->
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAAVxcR_2mZUF_lyOa1f8p2QLWWgioe8JOuPnKpjORe-N0_ufcK9PvOu0EMjxhMFZMWXE&usqp=CAU" alt="Cloudflare" width="100"/>

cloudflare as reverse proxy for api and websites
