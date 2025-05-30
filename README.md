# GameHUB

------ 1. High-level architecture diagram ---------

![Untitled Diagram drawio](https://github.com/user-attachments/assets/b9b281c9-2420-4df7-89cf-756a8281f7a0)



------ 2. Frontend–Backend Interaction ---------

       Frontend (React + Tailwind):

            Handles authentication redirects (OAuth flow)
            Fetches user profile, friends, achievements, and chat via REST API
            Uses WebSockets for real-time chat and presence updates
            Displays calendar using fullcalendar.io

       Backend (Express + Socket.io):
            Handles API requests
            Manages authentication and token storage
            Fetches data from external APIs and stores in MongoDB
            Sends updates through WebSockets


------ 3. Database Schema ---------

       Collections:
            Users
            Accounts
            Games
            Achievements
            Friends
            Sessions
            Messages
            Notifications

![Untitled](https://github.com/user-attachments/assets/c32b9bd5-f84d-4027-bd21-da07562df568)



       Basic CRUD:
            Users: register, update preferences, delete account
            Accounts: add/remove external gaming accounts
            Games: add game metadata via APIs
            Achievements: sync with platform APIs
            Friends: manage cross-platform friend list
            Sessions: schedule, join/leave, delete
            Messages: send, edit, delete
            Notifications: mark as seen, delete

------ 4. API Contracts ---------

       Auth
            Endpoint	Method	Description
            /auth/:provider	GET	Initiate OAuth with Steam/Xbox/PSN
            /auth/callback	GET	Handle OAuth callback and store tokens
            /logout	POST	Logout user
            
       Users
            GET /api/users/me
            PATCH /api/users/me
            DELETE /api/users/me
            
       Linked Accounts
            GET /api/accounts
            POST /api/accounts  // Connect platform account
            DELETE /api/accounts/:accountId
            
       Dashboard
            GET /api/dashboard  // Aggregated playtime, activity feed, achievements
            
       Games
            GET /api/games
            GET /api/games/:id
            
       Achievements
            GET /api/achievements
            GET /api/achievements/:id
            PATCH /api/achievements/:id  // Mark manually or update notes
            
       Sessions (Calendar)
            GET /api/sessions
            POST /api/sessions
            PATCH /api/sessions/:id
            DELETE /api/sessions/:id
            
       Chat (Socket.io + REST fallback)
            WS Event: connect, message, presence, typing

            REST:
              GET /api/messages/:chatId
              POST /api/messages/:chatId
              
       Friends
            GET /api/friends
            POST /api/friends
            DELETE /api/friends/:friendId
            
       Notifications
            GET /api/notifications
            PATCH /api/notifications/:id
            
       Authorization
            OAuth2 tokens stored per user account
            JWT for session authentication
            WebSocket handshake via token


------ 5. Wireframe [WIP]  ---------

xxxxx

------ 6. UI [WIP]  ---------

xxxxx


