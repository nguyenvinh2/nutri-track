# nutri-track
Meal Nutritional Content Tracker

# Group: NutriTrack
-Project for tracking nutritional info around meals
-Jeff Borda, Vinh Nguyen, Joey Eisenzimmer

# Communication Plan:
-In-Person
-Slack
-Email
-jeff.borda@gmail.com
-vinh.nguyen@gmail.com
-joey.eisenzimmer1@gmail.com

# Conflict Plan:
-How can I help?
-Resolve internally
-No bad ideas
-Everything in the group is safe
-We leave any situation on the same page
-Group Vote
-Instructor/TA sanity check

# Work Plan:
-Team official hours – 9 a.m. – 6 p.m.
-Pair Programming
-Planned breaks – 12 p.m. – 1 p.m.
-3 p.m. break
-Daily tasks identified and assigned during stand up (and as needed based on group input)

# Git Process:
-Confirm All Merges to Master
-See Something, Say Something
-Verify status with insights/network

# Standup Time:
-10 a.m. Instructor Check

# Code Style:
-All functions have comments
-Comment, comment, comment
-Functions get verbs
-Variables get nouns

# User Stories
-Nutri-TrackTM allows health conscious users to view the nutritional content of their meals to aid them in their meal decisions.

The application will allow the user to create custom made meals. The user will start by selecting the “Create a Meal” button located on the landing page of the application. This will redirect the user to a form asking for the “Title” and the “Description” of the meal. This data will be stored in a database with a unique identifier for each meal. Once submitted, the application will redirect the user back to the landing page with a newly created meal icon that the user can select.

Upon selecting the meal, the application will direct the user to the “Meal Details” page. Initially, the contents of this page will be empty and the user needs to add ingredients to the meal by clicking on the “Add ingredients” button located on this page. This will direct the user to a search bar, where the user can input the ingredient for search. An API request to the USDA database will locate all relevant search items, where the USDA ID number can be retrieved once the user clicks on the item he/she desires. A second query is made to USDA using that ID where it will return the nutritional content results via a certain set of units (i.e. per 100g, per tablespoon). The user then has the option to “Add” this ingredient to the meal. The user will repeat until all the ingredients are added to the meal.

Once the meal ingredients portion is completed, the user can manually adjust the amount of each ingredient is part of the meal. This will adjust the actual nutritional content of each ingredient. A total will be displayed at the bottom telling the user the nutritional content of the entire meal.
The API request has the following format:  
User has a meal recipe and wants to check the nutritional content of each ingredient.
One recipe is butter, user looks up USDA database via API query:
https://api.nal.usda.gov/ndb/search/?format=json&q=butter&ds=Standard%20Reference&sort=r&max=50&offset=0&api_key=DEMO_KEY
It displays the following result in JSON format:
 
User selects the most relevant result and obtains the ID. User makes a second API request based on the ID number (highlighted in red).
https://api.nal.usda.gov/ndb/V2/reports?ndbno=01145&type=b&format=json&api_key=DEMO_KEY
Returns the following results:
 
The data can then be used to rendered an informational page and stored in a database if the user chooses.
Postgres will be used to store data in two tables. The first table will have the Name of the meal and Description along with a PRIMARY KEY. The second table will store the Ingredient Name, relevant nutritional content, and a meal_id as a FOREIGN KEY linked to the meals PRIMARY KEY.
HTML will be rendered server side using EJS and Express with other dependencies as necessary. 

# PROJECT SCOPE
## MVP:
-Successfully make API request to USDA Food Database and display results based on user query.
-Successfully store nutritional data of ingredients in a SQL database in a normalized table, allowing the application to render appropriate data based on stored values.
-Keep track of ingredients based on the meal (link each ingredient to the meal).
-Calculate nutritional content based on the amount of the ingredient set by the user.
-Sum the nutritional content for a “Total” result.
-Clean looking UI and styling via HTML/CSS/JS.

## Stretch Goals:
-Calculate the percent of the total daily recommended dietary requirements based on the meal content.
-Have a page that allows users to plan their daily meals, allowing users to add/remove the number of meals and compare the total nutritional content to the recommended requirements.

# Project Timeline:

## 01 October 2018 (Monday):
-Project Proposal (VN/JB/JE)
-Complete Wireframes (JB)
-Finalize User Stories (VN)
-Finalize Pitch
-Finalize Communication Plan (JE)
-Finalize PM Plan (JE)
-Finalize Conflict Plan (JE)
-Domain/Data Models (VN)
-Scaffold Project (VN/JB/JE)

## 02 October 2018 (Tuesday):
-Complete setup of main features (VN/JB/JE)

## 03 October 2018 (Wednesday):
-Reach MVP by EOD

## 04 October 2018 (Thursday):
-Polishing and tech check
-User experience -> final walk through
-EOD -> presentation ready

## 05 October 2018 (Friday):
-Verify tech before presentation
-Present