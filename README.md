# Flask Review Session - 08152023 - Game Lister

A user applicaiton where you can log in to review different games. A user can create and view games, create, edit, view, and delete reviews, create a profile. **Potentially as a stretch** sort by categories

### Models

User
---
username : string
password_hash : string (bcrypt)

Review
---
content : string
user_id : integer (foreign key)
game_id : integer (foreign key)

Game
---
title : string
description : string
image_url : string



### Requirements
Have at least three models on the backend, that include the following: - x
At least two one-to-many relationships. - x
At least one reciprocal many-to-many relationship. - x
Full CRUD actions for at least one resource. - x
Minimum of create and read actions for EACH resource. - x
Use forms and validation through Formik on all input.
At least one data type validation.
At least one string/number format validation.
Have at least three different client-side routes using React Router. Be sure to include a nav bar or other UI element that allows users to navigate between routes.
Connect the client and server using fetch().

