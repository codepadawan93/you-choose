# YouChoose - choose your favourite movies!

### ASE Web Technologies Project
Small web app that allows users to build and publicly share lists of favourite movies. 

### Usage
#### Installation
1. Clone this repo:
```bash
git clone https://github.com/codepadawan93/you-choose.git

cd you-choose
```
2. Install dependencies:
```bash
npm install
```
3. Navigate to ```config/config.json``` and change the values to connect to your database. Alternatively, set up a user and database using the deafaults found in the JSON file. Afterwards run migrations:
```bash
npm run migrate
``` 
This will set up all tables that the app needs.

4. Run app in development mode:
```bash
npm run start-dev
```
5. Navigate to [http://localhost:8080](http://localhost:8080) and share your movies with your friends!

## API Documentation
### Users
``` GET /api/users ```
Returns a list of users

``` GET /api/users/id ```
Returns a single user with user_id = id or a 404 status code if provided id does not match any user

``` POST /api/users ```
The request body has to have header ``` Content-Type: application/json``` set and respect the following schema:
```json
{
    "user_name": "ekovacs",
    "password": "password123",
    "firstname": "Erik",
    "lastname": "Kovacs",
    "role_id": 1
}
```

``` PUT /api/users/id ```
Updates the user with user_id = id. Returns a 404 status code if it is not present. The request body has to have header ``` Content-Type: application/json``` set and respect the schema specified above.

``` DELETE /api/users/id ```
Deletes the user with user_id = id. Returns a 404 status code if it is not present. 

### Roles
``` GET /api/roles ```
Returns a list of roles

``` GET /api/roles/id ```
Returns a single role with user_id = id or a 404 status code if provided id does not match any role

``` POST /api/roles ```
The request body has to have header ``` Content-Type: application/json``` set and respect the following schema:
```json
{
    "role_name": "admin"
}
```

``` PUT /api/roles/id ```
Updates the role with role_id = id. Returns a 404 status code if it is not present. The request body has to have header ``` Content-Type: application/json``` set and respect the schema specified above.

``` DELETE /api/roles/id ```
Deletes the role with role_id = id. Returns a 404 status code if it is not present. 

### Lists
``` GET /api/lists ```
Returns a list of lists (as in lists of movies defined by users)

``` GET /api/lists/id ```
Returns a single list with list_id = id or a 404 status code if provided id does not match any list

``` POST /api/lists ```
The request body has to have header ``` Content-Type: application/json``` set and respect the following schema:
```json
{
    "user_id" : 1,
    "personal_rating" : 0
}
```

``` PUT /api/lists/id ```
Updates the list with list_id = id. Returns a 404 status code if it is not present. The request body has to have header ``` Content-Type: application/json``` set and respect the schema specified above.

``` DELETE /api/lists/id ```
Deletes the list with list_id = id. Returns a 404 status code if it is not present. 

### List Items
``` GET /api/list_items ```
Returns a list of list items

``` GET /api/list_items/id ```
Returns a single list item with list_item_id = id or a 404 status code if provided id does not match any list item

``` POST /api/list_items ```
The request body has to have header ``` Content-Type: application/json``` set and respect the following schema:
```json
{
	"list_id": 1,
	"movie_id" : 2,
	"personal_rating": 3
}
```

``` PUT /api/list_items/id ```
Updates the list item with list_item_id = id. Returns a 404 status code if it is not present. The request body has to have header ``` Content-Type: application/json``` set and respect the schema specified above.

``` DELETE /api/list_items/id ```
Deletes the list item with list_item_id = id. Returns a 404 status code if it is not present. 

### Movies
``` GET /api/movies ```
Returns a list of movies

``` GET /api/movies/id ```
Returns a single movie with movie_id = id or a 404 status code if provided id does not match any movie

``` POST /api/movies ```
The request body has to have header ``` Content-Type: application/json``` set and respect the following schema:
```json
{
    "tmdb_guid" : 550,
    "budget" : 63000000,
    "genres" : "Drama",
    "homepage" : "http://www.foxmovies.com/movies/fight-club",
    "imdb_id" : "tt0137523",
    "original_language" : "en",
    "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    "popularity": 21.879,
    "poster_path": "/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg",
    "release_date": "1999-10-15",
    "revenue": 100853753,
    "runtime": 139,
    "status" : "released",
    "tagline" : "Mischief. Mayhem. Soap.",
    "title" : "Fight Club",
    "vote_average": 8.4,
    "vote_count": 14239
}
```

``` PUT /api/movies/id ```
Updates the movie with movie_id = id. Returns a 404 status code if it is not present. The request body has to have header ``` Content-Type: application/json``` set and respect the schema specified above.

``` DELETE /api/movies/id ```
Deletes the movie with movie_id = id. Returns a 404 status code if it is not present. 

## General requirements
1. At least four entities of which one is parent and one is  a child, stored in a relational database and accessed through an ORM
2. Operations on the entities exposed through a REST interface
3. SPA front-end with React.js
4. External service integration

## Phases
1. Detailed specifications, project description, presence of a git project - delivered after tutorial 5
2. Functional RESTful service present in the repository + instructions to run said sevice - delivered after tutorial 9
3. Complete application - deliveded in the last tutorial (demo)

## Functional requirements
### Entities
- User
- Role
  - Admin
  - Normal User
- List
  - List Item
- Movie

### Possible user actions

Normal User
- Create account
- Log in
- Search for Movie
- Create List
- Add, Modify, Delete Movies in List
- Share

Admin 
- Everything a Normal User can do
- Add, Modify, Delete Users from DB

### Technologies used
Database
- MySQL accessed through Sequelize

Backend
- NodeJS with Express

Frontend
- React JS

### Integration with TMDB
- To be implemented, documentation available at [TMDB](https://www.themoviedb.org/documentation/api?language=en-US)

#### TMDB API JSON Schema
```json
{
    "adult": false,
    "backdrop_path": "/87hTDiay2N2qWyX4Ds7ybXi9h8I.jpg",
    "belongs_to_collection": null,
    "budget": 63000000,
    "genres": [
        {
            "id": 18,
            "name": "Drama"
        }
    ],
    "homepage": "http://www.foxmovies.com/movies/fight-club",
    "id": 550,
    "imdb_id": "tt0137523",
    "original_language": "en",
    "original_title": "Fight Club",
    "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    "popularity": 21.879,
    "poster_path": "/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg",
    "production_companies": [
        {
            "id": 508,
            "logo_path": "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
            "name": "Regency Enterprises",
            "origin_country": "US"
        },
        {
            "id": 711,
            "logo_path": "/tEiIH5QesdheJmDAqQwvtN60727.png",
            "name": "Fox 2000 Pictures",
            "origin_country": "US"
        },
        {
            "id": 20555,
            "logo_path": null,
            "name": "Taurus Film",
            "origin_country": ""
        },
        {
            "id": 54051,
            "logo_path": null,
            "name": "Atman Entertainment",
            "origin_country": ""
        },
        {
            "id": 54052,
            "logo_path": null,
            "name": "Knickerbocker Films",
            "origin_country": "US"
        },
        {
            "id": 25,
            "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
            "name": "20th Century Fox",
            "origin_country": "US"
        },
        {
            "id": 4700,
            "logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
            "name": "The Linson Company",
            "origin_country": ""
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "DE",
            "name": "Germany"
        },
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "1999-10-15",
    "revenue": 100853753,
    "runtime": 139,
    "spoken_languages": [
        {
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "Mischief. Mayhem. Soap.",
    "title": "Fight Club",
    "video": false,
    "vote_average": 8.4,
    "vote_count": 14239
}
```

### Database structure
- User
  - user_id
  - user_name
  - password
  - firstname
  - lastname
  - role_id
    
- Role
  - role_id
  - role_name

- Movie
  - movie_id
  - cmdb_guid:integer
  - budget:number
  - genres:string
  - homepage:string
  - imdb_id:string
  - original_language:string
  - overview:text
  - popularity:number
  - poster_path:string
  - release_date:string
  - revenue:number
  - runtime:number
  - status:string
  - tagline:string
  - title:string
  - vote_average:number
  - vote_count:number

- List
  - list_id
  - user_id
  - personal_rating

- List item 
  - list_item_id
  - list_id
  - movie_id
  - personal_rating

### Authors
- Kovacs Erik Robert
- Ganea Raluca
- Frentescu Adela
