# Scandiweb Test Assignment

## Table of Contents

- [Overview](#overview)
- [Description](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)

### Overview

Scandiweb Junior Fullstack Test Assignment. This web app was built with the following:

- Frontend: React.js, SASS, GraphQL
- Backend: PHP, GraphQL
- Database: MySQL
- Dependencies: phpdotenv, dompurify, html-react-parser

### Description

A simple eCommerce application consisting of two main views:

1. Product Listing Pages (PLP)

- These pages shall be shown whenever a category is chosen and it’s the default view of the website

2. Product Details Page (PDP)

- These pages shows all Product details, images and description, Allowing the user to configure it before adding it to the cart

### Prerequisites

You only need [Docker](https://www.docker.com/get-started/) to install this app

### Getting Started

To get started, follow these steps:

1.  Clone the Repository:

        git clone https://github.com/Marwan-98/scandiTest.git

2.  Navigate to your Project Directory

3.  Create `.env` file in the `root` directory containing the following variables

        DB_SERVER_NAME="mysql"
        USER_NAME="root"
        PASSWORD="temppassword"
        DB_NAME="SCANDI_TEST"

4.  Create `.env` file in the `/src` directory containing the following variable

        REACT_APP_BASE_URL="http://localhost:8000/"

5.  Build your Docker Containers

        docker compose build

6.  Start Built Containers

        docker compose up -d

7.  Populate the Database

        docker exec scandi-test-php php /var/www/database-setup.php

8.  Navigate to your localhost
        http://localhost:3000/
