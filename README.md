Frontend (HTML, CSS, JavaScript)
HTML: Builds the structure with two forms – Login and Sign Up.

CSS: Styles the forms with modern design (buttons, toggle switch, inputs).

JavaScript:

Toggles between Login and Sign Up forms.

Sends data to the backend using fetch() via POST requests.

Shows messages and stores the JWT token after successful login.

🖥️ Backend (Node.js + Express)
Express: Handles server and API routes (/register, /login).

cors: Allows frontend and backend to communicate (CORS enabled).

bcryptjs: Hashes passwords for secure storage.

jsonwebtoken: Creates a secure token (JWT) after login.

body-parser: Parses JSON data sent from the frontend.
