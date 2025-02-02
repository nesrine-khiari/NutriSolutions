# NutriSolutions  
 
*NutriSolutions* is a comprehensive web application designed to help nutritionists and clients manage health and fitness goals. It allows nutritionists to interact with clients, track their progress, and offer tailored dietary advice. Clients can schedule appointments, track progress, and get personalized support.
<p align="center">
   <img src="https://github.com/user-attachments/assets/05093c53-a6e0-457b-b11b-e7e816dda4cf" alt="nutri-logo" style="margin-right: 10px;" />
</p>

---

## 🚀 Features

- *User Authentication*: Secure login and registration for both nutritionists and clients.
- *Appointment Management*: Clients can book and manage appointments with nutritionists.
- *Personalized Recipes*: Customized recipes for the different objectives of clients.
- *File Uploads*: Nutritionists can upload their certificates and recipes images.
- *User Friendly Catching Design*: Optimized for desktop.

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/b92ccbdd-17be-4965-84a5-1efb0aab15b1)
![image](https://github.com/user-attachments/assets/288ad9b6-6ad2-421f-adef-60040278eb50)
![image](https://github.com/user-attachments/assets/691ccbef-78a3-40fe-96c2-1f46da44ab28)
![image](https://github.com/user-attachments/assets/cd511b3f-79e1-4518-8e74-6ab9b55f18c0)




---

## 🛠️ Tech Stack

- *Frontend*: Angular
- *Backend*: NestJS
- *Database*:MySQL
- *Authentication*: JWT (JSON Web Tokens)

---

## 🔧 Installation

### Prerequisites

Before you start, make sure you have these installed:

- [Node.js](https://nodejs.org/en/) (version 22.13.1)
- [Angular CLI](https://angular.io/cli)
- [NestJS](https://nestjs.com/)

### 1. Clone the Repository
  
git clone https://github.com/nesrine-khiari/NutriSolutions.git

### 2. Install Dependencies

## Frontend (Angular)
1. Navigate to the nutrisolutions-frontend directory:
    
    cd Nutrisolutions-FRONT
    
2. Install the necessary dependencies:
    
    npm install
    
## Backed (NestJS)
1. Navigate to the nutrisolutions-frontend directory:
    
    cd nutri-solutions-back
    
2. Install the necessary dependencies:
    
    npm install
    

### 3. Environment Variables

Create an .env file in the backend folder and add the following configurations:

env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=<your_db_user>
DB_PASSWORD= <your_db_pass>
DB_DATABASE= <database_name>
JWT_SECRET= <your_jwt_secret>
 

### 4. Run the application

## Frontend (Angular)
1. Navigate to the nutrisolutions-frontend directory:
    
    cd Nutrisolutions-FRONT
    
2. Start the Angular frontend:
    
    ng serve
    
## Backed (NestJS)
1. Navigate to the nutrisolutions-frontend directory:
    
    cd nutri-solutions-back
    
2. Start the NestJS server:
    
    npm run start:dev
    
Visit the app at http://localhost:4200/ (or the port you configured).

### PS: 
- The goal of some commented code is to show the use of different approaches for the same problem ( example : Template Driven Form / Reactive Form)
