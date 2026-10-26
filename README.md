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
* **Flow:** Navigates from the Home Page to the Register Page.
* **Test Data:** Utilizes centralized test data (`VALID_USER`) for standard user attributes (gender, first name, last name, and password) combined with a dynamically generated unique email address using `Date.now()` to ensure test independence.
* **Form Submission:** Fills out the registration form using the combined dataset (`registerPage.registerUser()`).
* **Assertions:** 
  * Verifies the success message (`Your registration completed`) is visible.
  * Continues to the account page and validates that the unique email is displayed in the header alongside the "Log out" link.
  * Performs a logout action and verifies that the "Register" and "Log in" links reappear on the home page.

---

### Scenario 2: Register Existing User
* **File:** `tests/Register.spec.ts`
* **Flow:** Navigates to the Register page and attempts to register using already existing user information from the centralized dataset (`VALID_USER`).
* **Form Submission:** Submits the form with pre-existing credentials via `registerPage.registerUser()`.
* **Assertions:** 
  * Verifies that the validation summary error container (`div.validation-summary-errors`) is visible.
  * Asserts the exact error message: `"The specified email already exists"`.

---

### Scenario 3: Login with Valid Credentials
* **File:** `tests/Login.spec.ts`
* **Flow:** Navigates from the Home Page to the Login Page using centralized test data (`VALID_USER`).
* **Form Submission:** Enters valid user credentials via `loginPage.loginUser()`.
* **Assertions:** 
  * Verifies that the account link displaying the user's email (`VALID_USER.email`) is visible in the header.
  * Verifies that the "Log out" link is visible and correctly structured.

---

### Scenario 4: Login with Invalid Credentials
* **File:** `tests/Login.spec.ts`
* **Flow:** Tests negative validation scenarios for user authentication.
* **Test Cases Covered:**
  * **Wrong Password:** Attempts login using a valid email (`VALID_USER.email`) and an incorrect password (`'wrong'`), asserting the validation summary error messages: `Login was unsuccessful. Please correct the errors and try again.` and `The credentials provided are incorrect`.
  * **Non-registered Email:** Attempts login using an unregistered email (`invalid.email@yopmail.com`) and password, asserting the validation summary error messages: `Login was unsuccessful. Please correct the errors and try again.` and `No customer account found`.

---

### 💡 Upcoming Scenarios (5 to 6)
* **Scenario 5:** Search Product & Add to Shopping Cart
* **Scenario 6:** End-to-End Product Checkout Process