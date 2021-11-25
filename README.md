This was created during our time as a student at Code Chrysalis.
# 🐶🐢🐱🐰 Pet Pals (Client) 🦜🐷🐭🦦
This is the client side repository. You need to run the server side at the same time. This is [Server Repository](https://github.com/Team-Freshly-Washed-Turtles/pet-server).

1. [About　💁](#about-)
2. [Features　✨](#features-)
3. [Requirements　🙏](#requirements-)
4. [Getting Started　🎬](#getting-started-)
5. [Tech Stack　🤖](#tech-stack-)
6. [Authors 📝](#authors-)

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
# Requirements 🙏
To use this application, 
* This is the client side repository. You need to run the server side at the same time. This is [Server Repository](https://github.com/Team-Freshly-Washed-Turtles/pet-server).
* You need **Node.js**, **yarn** installed on your computer. Also, you need to use **mongodb** on your computer or on cloud.
# Getting Started 🎬
#### 1. Install Dependencies
To install all dependencies, run this code in your terminal.
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
#### 4. Let's get started!
<img width="500" alt="Screen Shot 2021-11-24 at 19 17 11" src="https://user-images.githubusercontent.com/83794734/143219860-ee33732a-67ce-4038-8d9d-40a292b4e1ab.png"> 
  
# Tech Stack 🤖  
|<img src="https://user-images.githubusercontent.com/83794734/143388086-2f543482-4c32-4d1b-9c10-00ea95769c8c.png" alt="React image" width="100">|<img src="https://user-images.githubusercontent.com/83794734/143385316-257a292f-799f-493e-967e-d721a2771734.png" alt="Redux image" width="100">|<img src="https://user-images.githubusercontent.com/83794734/143388023-1728a310-6365-4572-8dd3-8b3e29b7c99e.png" alt="Bulma image" width="100">|<img src="https://user-images.githubusercontent.com/83794734/143388046-8e246ed1-c551-4729-ba5c-97ba3fdc4e02.png" alt="JWT image" width="100">|<img src="https://user-images.githubusercontent.com/83794734/143386343-31b0b2a3-1211-4b7e-9533-bfc3f9d388a4.png" alt="Socket.io image" width="100">|
|---|---|---|---|---|
|[React](https://reactjs.org/)|[Redux](https://redux-toolkit.js.org/)|[Bulma](https://bulma.io/)|[JWT](https://jwt.io/)|[Socket.io](https://socket.io/)|
# Authors 📝  
- [Callum Koike Marshall](https://github.com/marsc0388)
- [Karin Umehara](https://github.com/karin0216)
- [Yu Takaki](https://github.com/YuTakaki)
- [Eiko Imai](https://github.com/eiko0705)
