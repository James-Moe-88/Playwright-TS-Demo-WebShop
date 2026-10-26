# Playwright-TS-Demo-WebShop
Playwright automation testing for the 'Demo Web Shop' website using TypeScript

## Prerequisites
Before running the tests, make sure you have the following installed on your machine:
- **Node.js** (v16 or higher) - [Download Node.js](https://nodejs.org/)
- **Visual Studio Code (VS Code)** - [Download VS Code](https://code.visualstudio.com/)

You can check if Node.js is installed by running this command in your terminal:
```bash
node -v
```

## Getting Started
Follow these steps to set up and run the project locally:

### 1. Clone or Download the Repository
Clone the repository to your local machine.

### 2. Open the Project in VS Code
- Open **VS Code**.
- Go to **File > Open Folder...** and select the project folder (`Playwright-TS-Demo-WebShop`).
- When you open the project, if you see **"Restricted Mode"** at the top, click on **Manage**.
- In the Workspace Trust window that appears, click the **Trust** button to enable all features and extensions.

### 3. Install Dependencies
Open the integrated terminal in VS Code and run the following command to install required packages:
```bash
npm install
```
### 4. Install Playwright Browsers
Run the following command to install the required browsers:
```bash
npx playwright install
```

## 📝 Test Scenarios & Implementation

Our automated test suite is designed to cover 6 key end-to-end scenarios using Playwright, TypeScript, and the Page Object Model (POM) architecture.

---

### Scenario 1: Register New User
* **File:** `tests/Register.spec.ts`
* **Test Name:** `Register New User`
* **Flow:** Creates a new user successfully with valid details.
* **Steps:** 
  * Opens the home page and clicks the Register link.
  * Fills out the form using shared data (`VALID_USER`) and a unique email (`Date.now()`).
  * Submits the form.
* **Expected Result:** 
  * Shows the success message: `"Your registration completed"`.
  * Verifies the user email appears in the header and can log out successfully.

---

### Scenario 2: Register Existing User
* **File:** `tests/Register.spec.ts`
* **Test Name:** `Register Existing User`
* **Flow:** Prevents registration using an email that already exists.
* **Steps:** 
  * Opens the register page.
  * Tries to register again using the existing email from `VALID_USER`.
* **Expected Result:** 
  * Shows the error message: `"The specified email already exists"`.

---

### Scenario 3: Login with Valid Credentials
* **File:** `tests/Login.spec.ts`
* **Test Name:** `Login with Valid Credentials`
* **Flow:** Allows a registered user to log in successfully.
* **Steps:** 
  * Opens the home page and clicks Login.
  * Enters valid email and password from `VALID_USER`.
* **Expected Result:** 
  * The user's email is visible in the header.
  * The "Log out" link appears correctly.

---

### Scenario 4: Login with Invalid Credentials
* **File:** `tests/Login.spec.ts`
* **Test Name:** `Login with Invalid Credentials`
* **Flow:** Shows errors when logging in with incorrect details.
* **Test Cases:**
  * **Wrong Password:** Uses a valid email with a wrong password (`'wrong'`). Expects the error message: `"Login was unsuccessful. Please correct the errors and try again."` and `"The credentials provided are incorrect"`.
  * **Unregistered Email:** Uses an email that doesn't exist. Expects the error message: `"Login was unsuccessful. Please correct the errors and try again."` and `"No customer account found"`.

---

### 💡 Upcoming Scenarios (5 to 6)
* **Scenario 5:** Search Product & Add to Shopping Cart
* **Scenario 6:** End-to-End Product Checkout Process