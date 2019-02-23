# nutri-track
Meal Nutritional Content Tracker

# Description

This web application queries the USDA Food Composition Database to obtain ingredient nutritional content to allow the user to tabulate meal nutritional data.

Visit:

http://www.nutri-track.fit

for a live demonstration of the application.

# Authors:
-Jeff Borda, Vinh Nguyen, Joey Eisenzimmer

# Set Up instructions

Clone the this repo and execute the server.js code (requires knowledge and usage of nodeJS). The port is set to 3000. Ensure all dependencies listed below are installed prior to running. 

#Languages and Tools

This project utilizies the following:

HTML/CSS/JS
  Meyer reset to initially clear default styles.

jQuery

nodeJS with the following dependencies:
  Express for framework
  dotenv to securely store API Keys
  Postgres for Database
  superagent for URL requests
  EJS for rendering html

Heroku for PAAS

#API Requests

Obtain an API Key from the USDA website: https://api.data.gov/signup/

Sample Query to obtain ingredient results from search:

https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY 

{
    "list": {
        "q": "butter",
        "sr": "1",
        "ds": "any",
        "start": 0,
        "end": 25,
        "total": 4671,
        "group": "",
        "sort": "n",
        "item": [
            {
                "offset": 0,
                "group": "Branded Food Products Database",
                "name": "ABBOTT, EAS, MYOPLEX 30 BUILD MUSCLE BAR, CHOCOLATE PEANUT BUTTER, UPC: 791083622813",
                "ndbno": "45258948",
                "ds": "LI",
                "manu": "Ross Products Division"
            }
        ]
    }
}

Sample Query to obtain nutritional content from Food ID:

https://api.nal.usda.gov/ndb/V2/reports?ndbno=35193&type=b&format=json&api_key=DEMO_KEY

{"foods":[{"food":{"sr":"1","type":"b","desc":{"ndbno":"35193","name":"Agave, cooked (Southwest)","ds":"Standard Reference","manu":"","ru":"g"},"nutrients":[{"nutrient_id":"255","name":"Water","derivation":"NONE","group":"Proximates","unit":"g","value":"65.40","measures":[]},{"nutrient_id":"208","name":"Energy","derivation":"NC","group":"Proximates","unit":"kcal","value":"135","measures":[]},{"nutrient_id":"203","name":"Protein","derivation":"BFSN","group":"Proximates","unit":"g","value":"0.99","measures":[]},{"nutrient_id":"204","name":"Total lipid (fat)","derivation":"BFSN","group":"Proximates","unit":"g","value":"0.29","measures":[]},{"nutrient_id":"205","name":"Carbohydrate, by difference","derivation":"NC","group":"Proximates","unit":"g","value":"32.00","measures":[]},{"nutrient_id":"291","name":"Fiber, total dietary","derivation":"NONE","group":"Proximates","unit":"g","value":"10.6","measures":[]},{"nutrient_id":"269","name":"Sugars, total","derivation":"NONE","group":"Proximates","unit":"g","value":"20.87","measures":[]},{"nutrient_id":"301","name":"Calcium, Ca","derivation":"NONE","group":"Minerals","unit":"mg","value":"460","measures":[]},{"nutrient_id":"303","name":"Iron, Fe","derivation":"NONE","group":"Minerals","unit":"mg","value":"3.55","measures":[]},{"nutrient_id":"304","name":"Magnesium, Mg","derivation":"NONE","group":"Minerals","unit":"mg","value":"39","measures":[]},{"nutrient_id":"305","name":"Phosphorus, P","derivation":"NONE","group":"Minerals","unit":"mg","value":"9","measures":[]},{"nutrient_id":"306","name":"Potassium, K","derivation":"NONE","group":"Minerals","unit":"mg","value":"59","measures":[]},{"nutrient_id":"307","name":"Sodium, Na","derivation":"NONE","group":"Minerals","unit":"mg","value":"13","measures":[]},{"nutrient_id":"309","name":"Zinc, Zn","derivation":"NONE","group":"Minerals","unit":"mg","value":"0.25","measures":[]},{"nutrient_id":"401","name":"Vitamin C, total ascorbic acid","derivation":"NONE","group":"Vitamins","unit":"mg","value":"0.3","measures":[]},{"nutrient_id":"404","name":"Thiamin","derivation":"NONE","group":"Vitamins","unit":"mg","value":"0.012","measures":[]},{"nutrient_id":"405","name":"Riboflavin","derivation":"NONE","group":"Vitamins","unit":"mg","value":"0.099","measures":[]},{"nutrient_id":"406","name":"Niacin","derivation":"NONE","group":"Vitamins","unit":"mg","value":"0.162","measures":[]},{"nutrient_id":"415","name":"Vitamin B-6","derivation":"NONE","group":"Vitamins","unit":"mg","value":"0.087","measures":[]},{"nutrient_id":"435","name":"Folate, DFE","derivation":"NC","group":"Vitamins","unit":"\u00b5g","value":"3","measures":[]},{"nutrient_id":"418","name":"Vitamin B-12","derivation":"NONE","group":"Vitamins","unit":"\u00b5g","value":"0.00","measures":[]},{"nutrient_id":"320","name":"Vitamin A, RAE","derivation":"AS","group":"Vitamins","unit":"\u00b5g","value":"6","measures":[]},{"nutrient_id":"318","name":"Vitamin A, IU","derivation":"AS","group":"Vitamins","unit":"IU","value":"113","measures":[]},{"nutrient_id":"323","name":"Vitamin E (alpha-tocopherol)","derivation":"NONE","group":"Vitamins","unit":"mg","value":"0.36","measures":[]},{"nutrient_id":"328","name":"Vitamin D (D2 + D3)","derivation":"NONE","group":"Vitamins","unit":"\u00b5g","value":"0.0","measures":[]},{"nutrient_id":"324","name":"Vitamin D","derivation":"NONE","group":"Vitamins","unit":"IU","value":"0","measures":[]},{"nutrient_id":"430","name":"Vitamin K (phylloquinone)","derivation":"NONE","group":"Vitamins","unit":"\u00b5g","value":"4.9","measures":[]},{"nutrient_id":"601","name":"Cholesterol","derivation":"NONE","group":"Lipids","unit":"mg","value":"0","measures":[]},{"nutrient_id":"262","name":"Caffeine","derivation":"NONE","group":"Other","unit":"mg","value":"0","measures":[]}],"footnotes":[]}}],"count":1,"notfound":0,"api":2.0}

#Database Structure:
  Two tables:
    meals table to store individually created meals
    ingredients table to store ingredients added and nutritional content. Each ingredient is attached to a meal by specifying the meal ID number from the meals table.

See schema.sql file for structure for meals
See ingredients.sql file for structure for ingredients


# Version History

10/4/2018 9:00 AM - Version 1.0.0 - Basic Functionality Verified
10/4/2018 3:30 PM - Version 1.1.0 - Live Deployment with Custom URL
10/5/2018 10:30 AM - Version 1.2.0 - Functional Deployment with Logic fixes


# Project Planning

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
