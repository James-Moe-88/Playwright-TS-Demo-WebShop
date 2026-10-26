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

### Scenario 1: Register New User (Positive Test)
* **File:** `tests/Register.spec.ts`
* **Flow:** Navigates from the Home Page to the Register Page.
* **Dynamic Data:** Generates a unique email address using `Date.now()` to ensure test independence and prevent duplicate email conflicts across test execution runs.
* **Form Submission:** Accepts parameterized values for Gender, First Name, Last Name, Email, and Password (`registerPage.registerUser()`).
* **Assertions:** 
  * Verifies the success message (`Your registration completed`) is visible.
  * Continues to the account page and validates that the unique email is displayed in the header alongside the "Log out" link.
  * Performs a logout action and verifies that the "Register" and "Log in" links reappear on the home page.

---

### Scenario 2: Register Existing User (Negative Test)
* **File:** `tests/Register.spec.ts`
* **Flow:** Navigates to the Register page and attempts to register using an already existing email address (`james.moe@yopmail.com`).
* **Assertions:** 
  * Verifies that the validation summary error container (`div.validation-summary-errors`) is visible.
  * Asserts the exact error message: `"The specified email already exists"`.

---

### 💡 Upcoming Scenarios (3 to 6)
* **Scenario 3:** User Login with Valid Credentials (Positive Test)
* **Scenario 4:** User Login with Invalid Password (Negative Test)
* **Scenario 5:** Search Product & Add to Shopping Cart
* **Scenario 6:** End-to-End Product Checkout Process