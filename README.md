# :sparkles: :sparkles: Customer Subscriptions :sparkles: :sparkles:

The Customer Subscriptions project generates a table of data that displays users' subscription activity stored in a database. Subscription data is displayed in descending order, based on the time the subscription occured (most recent first). The project allows users to search for specific data by customer email, product name, or subscription type (monthly or yearly). Note that the table does not display the subscription type.

Customer Subscriptions is built on Rails (Ruby on Rails) and makes use of the npm package `rails/webpacker` to manage JavaScript modules for front-end purposes. 

## Front End
- Retrieves, caches and displays data from the API.
- Searches for specific data using fetch() to access the API (Online Search).
- Searches for specific data by filtering cached data by query (Offline Search).
- Makes use of React components, vanilla JavaScript and CSS (Sass) for rendering the UI.
- Includes responsive views (mobile, tablet, desktop). 

#### Searching For Data
To provide quick search results and great UX, the Customer Subscriptions project caches data returned from searches to display it while further searches are being executed. The cached data is updated only when search results return data that isn't currently stored. The mechanism was implemented due to the maximum result restriction of the REST API. 

When a search is executed, it initially obtains the first page (of the api) result data and stores it in a redux store connected to the table component. After also storing the data the cache (if needed), the front-end will request the rest of the pages with the same query from the api and concatenate the results onto the existing stored data. Each time results are returned the componenet updates to display them. If data for the search has already been returned in a previous search, the front-end will display it instantly from cached data while this process is finishing. 

<br />

## Backend
- Consists of 3 ActiveRecord models (Customer, Product, Subscription).
- Contains 2 routes (`/`, `api/subscriptions`)
- Returns data in JSON format using the default Ruby `json` library.  
- Paginates result data using Ruby gem `will_paginate`. Has 50 results per page restriction.
- Seeds data from `sample_data.json` into Sqlite3 database.
- Includes Rspec tests for the api endpoint (`api/subscriptions`).

<br />

# Requirements
- Ruby 2.2+
- Rails 4.2+
- Node.js 6.14.4+
- Yarn 1.x+

# Setup

- Clone the project and `cd` into the root directory of the cloned project.
- Run `yarn install` to install JavaScript dependencies (node_modules).
- Run `bundle install` to install Ruby gems. 
- Run `bin/rake db:setup` to create the db, load the schema and seed the sample data to the database.
    Note - The individual commands for the above are.  
        - `bin/rake db:create`, 
        - `bin/rake db:schema:load`, 
        - `bin/rake db:seed`
- Run `rails s` to start the server.
- Go to `localhost:3000` in your web browser to view the project.

# Running Rspec Tests

- `cd` into the root directory of the cloned project.
- Run `rspec`.

<br />

# Developer

## Front End 
The front end of this project is managed in the `app/javascript` directory. 
#### Modules

- ApiClient - `app/javascript/client/api.js`

The ApiClient module contains one method, `getSubscriptions(query="", page=1)` which obtains subscription data. 

#### Components
- Header - `app/javascript/components/header.jsx`
- SearchBar - `app/javascript/components/search_bar.jsx`
- SubscriptionsTable - `app/javascript/components/subscriptions_table.jsx`

__Header__ - The header component is a static component that merely displays a logo, title and description. 
Usage: `<Header title="CUSTOMERS" desc="Most recent activity..." img={require('./img.png')} />`


__SearchBar__ - The search bar component's `submit` property takes in a function from the parent component to obtain and use the current value of the input of the search bar.
Usage: 
```
const searchForResults = (query) {...}

<SearchBar submit={(inputVal) => this.searchForResults(inputVal)} />
```  

__SubscriptionsTable__ - The subscriptions table component combines a search bar with an html table to display the subscription date. It does not take any properties. _This component depends on the redux store defined in `app/javascript/pages/home/index.jsx`_.

<br />

## Backend

The backend takes care of the API routes, and seeding sample data into an Sqlite3 database. It contains 3 ActiveRecord models found in `app/models` (Customer, Product, Subscription).

### Routes

Routes are mapped to controllers in the `config/routes.rb` file. It contains configurations for routing the `/` route to the index, and the `api/subscriptions` route to the `subscriptions` function in the api controller, `app/controllers/api_controller.rb`.

### Route Testing

Route tests for the api controller can be found in `spec/controllers/api_controller_spec.rb`.

### Database Schema

The database consists of 3 tables (customers, products, subscriptions). The customers table has a unique index for the email column to prevent duplicate customers. The products table has a unique index for the name column to prevent duplicate products. The subscriptions table has a unique index for (customer_id, product_id) to prevent duplicate subscriptions. 

