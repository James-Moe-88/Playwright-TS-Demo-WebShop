import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { LoginPage } from '../Pages/LoginPage';
import { VALID_USER } from '../Data/Data';
import { CheckoutPage } from '../Pages/CheckoutPage';
import { WishlistPage } from '../Pages/WishlistPage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Goto 'Home' page and click 'Log in' link button
    await homePage.goto();
    await homePage.clickLogin();

    // Login with valid username and password
    await loginPage.loginUser(VALID_USER.email, VALID_USER.password);
});

test("Search Products and Add to Wishlist", async ({ page }) => {
    const homePage = new HomePage(page);
    const wishlistPage = new WishlistPage(page);

    // Clear the items from Wishlist before add wishlist item
    await wishlistPage.clearWishlist();

    // Search and add products to wishlist
    await wishlistPage.addFirstProductToWishlist();
    await page.waitForTimeout(2000); // just wait 2 seconds after choosing first product
    await wishlistPage.addSecondProductToWishlist();
    await page.waitForTimeout(2000); // just wait 2 seconds after choosing second product

    // Go to wishlist page
    await homePage.clickWishlist();
    await page.waitForTimeout(2000); // just wait 2 seconds before retrieve the data

    // Retrieve wishlist items text data
    const dataValue = await wishlistPage.getWishlistData();

    // Check the Wishlist items
    await expect(dataValue).toContain("Digital SLR Camera - Black");
    await expect(dataValue).toContain("670.00");
    await expect(dataValue).toContain("Black & White Diamond Heart");
    await expect(dataValue).toContain("130.00");
});

test("Purchase Desktop and Notebook", async ({ page }) => {
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);

    // Clear the items from Cart before add product
    await checkoutPage.clearCart();

    // Add products to cart
    await checkoutPage.addCustomDesktopToCart();
    await checkoutPage.addNotebookToCart();

    // Go to cart
    await homePage.clickShopping();

    // Checkout process
    await checkoutPage.proceedCheckout();

    // Verify order totals before confirmation
    const orderSummary = page.locator('#checkout-confirm-order-load');
    await expect(orderSummary).toContainText('Payment method additional fee: 7.00');
    await expect(orderSummary).toContainText('Shipping: (Next Day Air) 0.00');
    await expect(orderSummary).toContainText('Sub-Total: 3650.00');
    await expect(orderSummary).toContainText('Tax: 0.00');
    await expect(orderSummary).toContainText('Total: 3657.00');

    // Confirm and verify final order details
    await checkoutPage.confirmOrder();

    // Check the final order
    const orderBody = page.locator('body');
    await expect(orderBody).toContainText(VALID_USER.country);
    await expect(orderBody).toContainText(VALID_USER.state);
    await expect(orderBody).toContainText(VALID_USER.city);
    await expect(orderBody).toContainText(VALID_USER.address);
    await expect(orderBody).toContainText(VALID_USER.zipCode);
    await expect(orderBody).toContainText(VALID_USER.phoneNo);
    await expect(orderBody).toContainText('Order Total: 3657.00');
    await expect(orderBody).toContainText('Payment Method Cash On Delivery (COD)');
    await expect(orderBody).toContainText('Shipping Method Next Day Air Product(s)');
    await expect(orderBody).toContainText('Build your own expensive computer Processor: Fast [+100.00]RAM: 8GB [+60.00]HDD: 320 GBSoftware: Office Suite [+100.00] Price: 2060.00');
    await expect(orderBody).toContainText('Quantity: 1 Total: 2060.00');
    await expect(orderBody).toContainText('14.1-inch Laptop Price: 1590.00');
    await expect(orderBody).toContainText('Quantity: 1 Total: 1590.00');
    await expect(orderBody).toContainText('Sub-Total: 3650.00');
    await expect(orderBody).toContainText('Shipping: 0.00 Payment method additional fee: 7.00 Tax: 0.00 Order Total: 3657.00');
});