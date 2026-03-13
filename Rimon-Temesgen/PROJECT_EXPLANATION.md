# Project Explanation

## Project Structure

This project is inside `Rimon-Temesgen`.

It has:

- `frontend` for the Vue app
- `backend` for the Express and MongoDB server
- `README.md` for setup steps
- `.gitignore` for files that should not be pushed

## Frontend

The frontend is inside `frontend`.

Main files:

- `frontend/src/main.js`
- `frontend/src/App.vue`
- `frontend/src/router/index.js`

### How frontend starts

`main.js` starts the Vue app.

It loads:

- Vue
- Pinia
- Vue Router
- global CSS

`App.vue` is very small. It only shows the current page using `RouterView`.

### Pages

The frontend has two pages:

- `HomeView.vue`
- `RegistrationForm.vue`

`HomeView.vue` is the first page.

It shows:

- FCA logo
- title
- Register button

When the user clicks Register, the app moves to `/registration`.

### Router

The routes are in `frontend/src/router/index.js`.

Routes:

- `/` goes to home page
- `/Home` also goes to home page
- `/registration` goes to the registration form

### Registration Form

The main form logic is in `frontend/src/pages/RegistrationForm.vue`.

This file:

- stores the form data
- stores which fields the user touched
- checks if fields are valid
- sends data to the backend
- shows success or error messages

### Form Components

The form uses reusable components inside:

`frontend/src/components/registration`

These components are:

- `RegistrationBrandPanel.vue`
- `RegistrationTextField.vue`
- `RegistrationSelectField.vue`
- `RegistrationGenderField.vue`
- `RegistrationSuccessBanner.vue`

This makes the page easier to read and maintain.

### Validation in frontend

Frontend validation checks:

- first name is required
- last name is required
- names must look valid
- date of birth is required
- date of birth must be before registration date
- place of birth is required
- nationality is required
- marital status is required
- settlement camp is required
- settlement date is required
- settlement date must be on or after registration date

The registration date is treated as today.

### Sending data to backend

The API file is:

`frontend/src/services/beneficiaryApi.js`

It uses Axios.

It sends:

- `POST /api/beneficiaries`

The API base URL comes from:

- `frontend/.env`

or from the fallback:

- `http://localhost:5000/api`

### Global CSS

The shared CSS is in:

`frontend/src/styles.css`

It contains:

- app colors
- fonts
- form layout
- button styles
- responsive styles

Main colors:

- pale green: `#99CC32`
- deep green: `#385723`

Fonts:

- `Agency FB`
- `Arial Narrow`

## Backend

The backend is inside `backend`.

Main files:

- `backend/src/server.js`
- `backend/src/app.js`
- `backend/src/config/db.js`

### How backend starts

`server.js`:

- reads environment variables
- connects to MongoDB
- starts the Express server

`app.js`:

- creates the Express app
- enables CORS
- enables JSON requests
- adds routes

### Database

MongoDB is connected using Mongoose.

The connection file is:

- `backend/src/config/db.js`

The database model is:

- `backend/src/models/Beneficiary.js`

This model stores:

- firstName
- lastName
- dateOfBirth
- placeOfBirth
- gender
- nationality
- maritalStatus
- settlementCamp
- settlementDate

### Backend routes

Routes are in:

- `backend/src/routes/beneficiaryRoutes.js`

The backend has:

- `GET /api/beneficiaries`
- `POST /api/beneficiaries`

### Backend controller

The controller is:

- `backend/src/controllers/beneficiaryController.js`

It handles:

- saving one beneficiary
- getting all beneficiaries

### Backend validation

The validation middleware is:

- `backend/src/middleware/validateBeneficiary.js`

This checks the same rules as the frontend before saving data.

So even if someone skips the frontend, bad data still cannot be saved easily.

It checks:

- required fields
- valid names
- valid dropdown values
- date of birth before registration date
- settlement date on or after registration date

## Full Flow

1. User opens the app.
2. Home page appears.
3. User clicks Register.
4. Registration form opens.
5. User fills in the fields.
6. Frontend validates the values.
7. If valid, Axios sends data to backend.
8. Backend validates again.
9. Backend saves data to MongoDB.
10. Backend sends back a success message.
11. Frontend shows the success alert.
12. When the alert is closed, the form resets.

## How To Run

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend default URL:

```powershell
http://localhost:5173
```

### Backend

```powershell
cd backend
npm install
npm run dev
```

Backend default URL:

```powershell
http://localhost:5000
```

