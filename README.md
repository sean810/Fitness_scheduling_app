#  Fitness Scheduler- Full-Stack Fitness scheduling appp
**Fitness Scheduler** is a full-stack web application that allows users to schedule fitness workouts. It allows users to create their own users with their name and email and they can book fitness workouts based off what workouts they want to do.

## Features
-User can view available fitness classes  
-User can create bookings for specific fitness classes 
-User can delete the users they created
-User can delete bookings they created
-User can create their usernames and use their emails too
-User can view their user details that they created

## Technologies used
This project was built using the following technologies:

**React**: A JavaScript library for building user interfaces.
**React DOM**: A package used to manage the DOM in React applications.
**React Router DOM**: A library for routing and navigation in React applications.
**Formik**: A library for building forms with React, simplifying form management and validation.
**Yup**: A JavaScript schema validation library used in combination with Formik for form validation.
**React Scripts**: A set of scripts used to set up and manage React projects.
**Web Vitals**: A library to measure and track the performance of your app.

## Installation & Setup
### **Backend Setup (Flask)**  
1. Clone the repository:  
   ```sh
   git clone https://github.com/sean810/Fitness_scheduling_app
   cd fitness_schedule_app/backend

2. Create a virtual environment and install dependencies:
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt

3. Set up the database:
    flask db upgrade

4. Run the Flask server:
    flask run

### **Frontend Setup (React)**
1.  Go to the frontend directory:
    cd ../frontend

2.  Install dependencies:
    npm install

3.  Update API URLs in axios requests (point to deployed backend)

4.  Run the React app:
    npm start

## Running JSON Server
1.  Go to the frontend directory in another terminal:
    cd ../frontend

2.  Run the json server:
    json-server --watch db.json


## Author
*Sean Daniel*

https://github.com/sean810/Fitness_scheduling_app

## Contributing
Pull requests are welcome! Feel free to improve the project.
