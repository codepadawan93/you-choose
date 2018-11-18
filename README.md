# YouChoose - choose your favourite movies!

### ASE Web Technologies Project
Small web app that allows users to build and publicly share lists of favourite movies. 

### Usage
#### Installation
1. Install dependencies:
```bash
npm install
```
2. Run in development mode:
```bash
npm run start-dev
```

## General requirements
1. At least four entities of which one is parent and one is  a child, stored in a relational database and accessed through an ORM
2. Operations on the entities exposed through a REST interface
3. SPA front-end with React.js
4. External service integration

## Functional requirements
### Entities
- User
- Role
  - Admin
  - Normal User
- List
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
- MySQL

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
  - tmdb_guid
  - *to be decided once we see what is available in tmdb

- List
  - list_id
  - user_id
  - movie_id
  - personal_rating

### Authors
- Kovacs Erik Robert
- Ganea Raluca
- Frentescu Adela
