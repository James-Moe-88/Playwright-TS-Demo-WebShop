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
- Go to **File > Open Folder...** and select the project folder (`Playwright-TS-Demo-nopCommerce`).
- When VS Code asks *"Do you trust the authors of the files in this folder?"*, click **"Yes, I trust the authors"**.

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

### 1. User Registration Scenarios (`tests/Register.spec.ts`)
Our project implements both positive and negative testing for the user registration module.

* **Register New User (Positive Test)**[cite: 7]:
  * **Flow:** Navigates from the Home Page to the Register Page[cite: 3, 6].
  * **Dynamic Data:** Generates a unique email address using `Date.now()` to ensure test independence and prevent duplicate email conflicts across runs[cite: 6].
  * **Form Submission:** Accepts parameterized values for Gender, First Name, Last Name, Email, and Password (`registerPage.registerUser()`)[cite: 6].
  * **Assertions:** 
    * Verifies the success message (`Your registration completed`) is visible[cite: 6].
    * Continues to the account page and validates that the unique email is displayed in the header alongside the "Log out" link[cite: 6].
    * Performs a logout action and verifies that the "Register" and "Log in" links reappear on the home page[cite: 6].

* **Register Existing User (Negative Test)**[cite: 4, 5]:
  * **Flow:** Navigates to the Register page and attempts to register using an already existing email address (`james.moe@yopmail.com`)[cite: 5].
  * **Assertions:** 
    * Verifies that the validation summary error container (`div.validation-summary-errors`) is visible[cite: 4, 5].
    * Asserts the exact error message: `"The specified email already exists"`[cite: 4, 5].