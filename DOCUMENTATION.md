# Documentation

## Table of content

-   [Project goals](#project-goals)
    -   [Backend goals](#backend-goals)
    -   [Frontend goals](#frontend-goals)
-   [Program structure](#program-structure)
    -   [Backend structure](#backend-structure)
        -   [Backend routes](#backend-routes)
        -   [Controllers](#controllers)
        -   [Middlewares](#middlewares)
        -   [Database models](#database-models)
    -   [Frontend structure](#frontend-structure)
        -   [Pages](#pages)
        -   [State management](#state-management)

## Project goals

The project is a full stack application, that allows users to register, login, create helpdesk tickets, close tickets, and communicate with customer service by making notes under the tickets.

### Backend goals

The backend protects all data in the database from unauthorised requests. The backend accepts requests to register new users and to login existing users, and returns a JSON Web Token, that can be used to access the protected data.

### Frontend goals

The frontend allows users to register and login, and stores the JSON Web Token, that can be used to access protected data in the database. Logged in users can create, list and view their own helpdesk tickets, and create and read comments under their own helpdesk tickets.

## Program structure

### Backend structure

#### Backend routes

##### Customer authentication

-   Register a new user

    -   route: POST /api/users
    -   Access Public

-   Login a user

    -   route: POST /api/users/login
    -   Access Public

-   Get current user

    -   route: GET /api/users/me
    -   Access Private

##### Tickets

-   Get user tickets

    -   route: GET /api/tickets
    -   Access Private

-   Create a ticket

    -   route: POST /api/tickets
    -   Access Private

-   Get a single ticket

    -   route: GET /api/tickets/:ticketID
    -   Access Private

-   Update a ticket

    -   route: GET /api/tickets/:ticketID
    -   Access Private

-   Delete a ticket

    -   route: GET /api/tickets/:ticketID
    -   Access Private

##### Ticket notes

-   Get notes for a ticket

    -   route: GET /api/tickets/:ticketID/notes/
    -   Access Private

-   Create ticket note

    -   route: POST /api/tickets/:ticketID/notes/
    -   Access Private

#### Controllers

##### Customer authentication

##### Tickets

##### Ticket notes

#### Middlewares

-   body parser: express.json()
-   body parser: express.urlencoded({ extended: false })
-   authMiddleware
-   errorMiddleware

#### Database models

-   userModel
    -   name
    -   email
    -   password
    -   isAdmin
-   ticketModel
    -   user
    -   product
        -   iPhone / Macbook Pro / iMac / iPad
    -   description
    -   status
        -   new / open / closed
-   noteModel
    -   user
    -   ticket
    -   text
    -   isStaff
    -   staffId

### Frontend structure

#### Pages

##### Customer authentication

###### Register

-   Route: `/register`

###### Login

-   Route: `/login`

##### Customer ticket handling

###### Create ticket

-   Route: `/new-ticket`

###### List tickets

-   Route: `/tickets`

###### View ticket

-   Route: `/ticket/:ticketId`

#### State management

##### Authentication

-   authSlice
-   authService

##### Tickets

-   ticketSlice
-   ticketService

##### Notes

-   noteSlice
-   noteService
