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

### 5. Run Tests
You can execute the test suite using the following commands:

* **Run all test scenarios:**
```bash
npx playwright test
```
* **Run a specific test file (e.g., Register test):**
```bash
npx playwright test tests/Register.spec.ts
```
* **View the HTML test report:**
```bash
npx playwright show-report
```

### ⚙️ Test Configuration & Customization

* **Playwright Settings (`playwright.config.ts`):**
  * **Retries (`retries: 1`):** Automatically retries a failed test once to handle potential flaky tests.
  * **Trace (`trace: 'on-first-retry'`):** Captures a trace file during the first retry for easier failure debugging.
  * **Screenshot (`screenshot: 'only-on-failure'`):** Automatically takes a screenshot only when a test fails.
  * **Workers (`workers: 1`):** 
    > **⚠️ IMPORTANT:** Tests must run sequentially with a single worker (`workers: 1`) in both Local and CI/CD environments. Since multiple tests share the same user account (`VALID_USER`), parallel execution will cause state conflicts (e.g., cart/wishlist management overlapping between tests).

* **Customizing Test Data:**
  * If you already have an existing account or want to use specific user credentials, you can easily update them by editing the `VALID_USER` object inside the **`Data/Data.ts`** file.

## 📝 Test Scenarios & Implementation

This project consists of six automated test scenarios designed to cover common user interactions, including registration, login, product navigation, and shopping cart operations using Playwright, TypeScript, and the Page Object Model (POM).

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

### Scenario 5: Search Products and Add to Wishlist
* **File:** `tests/Wishlist.spec.ts`
* **Test Name:** `Search Products and Add to Wishlist`
* **Flow:** Searches for specific products, adds them to the wishlist, and verifies their details.
* **Steps:** 
  * Automatically logs in using valid credentials via the `beforeEach` hook.
  * Clears any existing items from the wishlist to ensure a clean test state.
  * Searches for products and adds them to the wishlist.
  * Navigates to the wishlist page to retrieve the items' text data.
* **Expected Result:** 
  * Verifies that the wishlist contains the correct product names and prices (`"Digital SLR Camera - Black"`, `"670.00"`, `"Black & White Diamond Heart"`, and `"130.00"`).

  ---

### Scenario 6: Purchase Desktop and Notebook
* **File:** `tests/Shopping.spec.ts`
* **Test Name:** `Purchase Desktop and Notebook`
* **Flow:** Adds custom desktop and notebook products to the cart and completes the end-to-end checkout process.
* **Steps:** 
  * Automatically logs in using valid credentials via the `beforeEach` hook.
  * Clears any existing items from the Shopping Cart to ensure a clean test state.
  * Adds a customized desktop and a notebook to the shopping cart using the page object methods.
  * Navigates to the shopping cart and proceeds through the checkout steps (terms agreement, billing address, shipping method, and payment method).
* **Expected Result:** 
  * Verifies that the order summary totals (fees, shipping, sub-total, tax, and total) match correctly before confirmation.
  * Confirms the order and verifies final order details including billing address, email, phone, and purchased item list.
