# Getting Started

<!-- This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps. -->

<!-- ### Prerequisites

This is an example of how to list things you need to use the software and how to install them. -->

## Installation

1. Clone the repo
   <!-- ```sh
   git clone https://github.com/github_username/repo_name.git
   ``` -->

### BACKEND

@ Backend/venue-booking-system-backend

2. Install NPM packages
   ```sh
   npm install
   ```
3. DB Setup

- install and setup postgres DB if not
- create a db named `venue_system`
  - Steps:
    - open postgres
      ```sh
        psql
      ```
    - then
      ```sh
      create database `venue_system`;
      ```
- create a user with name `pulkit` and password `pulkit`
  - Steps:
    - make user
      ```sh
      create user pulkit with password 'pulkit';
      ```
    - then, grant all privileges to that user
      ```sh
      grant all on database venue_system to pulkit;
      ```
- exit

4. Migrate the DB

- ```sh
  npm run migrate
  ```
