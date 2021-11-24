This was created during our time as a student at Code Chrysalis.
# 🐶🐢🐱🐰 Pet Rental App (Client) 🦜🐷🐭🦦

1. [About　💁](#about-)
2. [Features　✨](#features-)
3. [Requirement　🙏](#requirement-)
4. [Getting Started　🎬](#getting-started-)
5. [Note　📝](#note-)
6. [Tech Stack　🤖](#tech-stack-)

# About 💁
This is an application that connects the people who want to interact with animals with pet owners.  
If you want to have an animal, but can't for some reasons, this app can allow you to connect a pet owner who has the pet which you want to interact with and meet it in parson.  
If you already have pets, but can't look after them well for some reasons, this app can allow you to connect people who love animals and ask them to look after them safely.
# Features ✨
#### 1. Questionnaire
Pet owners can request carers (people who search pets) to answer some questions to comfirm if the carer is a safe person. Only when an owner checks an answer of questionnaire and accepts the offer from a carer, the carer can meet the pets in person.
#### 2. Tag Search
Carers can easily search pets which they are interested in with tag system. They can register the tags as their interests in advance, and change the tags in search page anytime.
#### 3. Chat Functionality
When an owner accept offers from a carer, they can use chat functionality to talk more concretely with each other. This functionality removes the anxiety of both owners and carers by communicating with each other directly.
#### 4. Notification
When a carer sends a request to meet a pet, it will be notified to the owner in real time. Also, when an owner approves a carer's request, it will be notified in real time to the carer. With this feature, both will not overlook the action from the other.
# Requirement 🙏
To use this application, 
* This is the client side repository. You need to run the server side at the same time. This is [Server Repository](https://github.com/Team-Freshly-Washed-Turtles/pet-server).
* You need Node.js, yarn installed on your computer. Also, you need to use mongodb on your computer or on cloud.
# Getting Started 🎬
#### 1. Install Dependency
To install all dependency, run this code in your terminal.
```
yarn
```
#### 2. Set Up Environment Variables
To set up environment variables, create ```.env``` file and set up your own environment variables in the file.
```
REACT_APP_SERVER_URL=//your local host url
REACT_APP_WS=ws://localhost: //your local host port number
SKIP_PREFLIGHT_CHECK=true
```
#### 3. Access To Your Local Host
To see the app, open your browser and access your local host url which you set up in ```.env``` file.

#### 4. Let's start!
<img width="500" alt="Screen Shot 2021-11-24 at 19 17 11" src="https://user-images.githubusercontent.com/83794734/143219860-ee33732a-67ce-4038-8d9d-40a292b4e1ab.png">  

# Note 📝  
# Tech Stack 🤖  
