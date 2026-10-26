import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { LoginPage } from '../Pages/LoginPage';
import { VALID_USER } from '../Data/Data';
import { CheckoutPage } from '../Pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Goto 'Home' page and click 'Log in' link button
    await homePage.goto();
    await homePage.clickLogin();

    // Login with valid username and password
    await loginPage.loginUser(VALID_USER.email, VALID_USER.password);

    // Go to cart
    await homePage.clickShopping();

    // Check the items and clear
    const cartitems = await page.locator('table.cart').locator('tr.cart-item-row').all();
    if (cartitems.length > 0) {
        for (const item of cartitems) {
            await item.locator('td.remove-from-cart').click();
        }
        await page.getByRole('button', { name: 'Update shopping cart' }).click();
    }
});

test.only("Purchase Desktop and Notebook", async ({ page }) => {
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);

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

    const orderBody = page.locator('body');
    await expect(orderBody).toContainText('Order Total: 3657.00');
    await expect(orderBody).toContainText('Billing Address James Moe');
    await expect(orderBody).toContainText('Email: james.moe@yopmail.com');
    await expect(orderBody).toContainText('Phone: (602) 350-5105');
    await expect(orderBody).toContainText('200 W. Washington Street, Phoenix, AZ 85003 Phoenix , Arizona 85281 United States');
    await expect(orderBody).toContainText('Payment Method Cash On Delivery (COD)');
    await expect(orderBody).toContainText('Shipping Method Next Day Air Product(s)');
    await expect(orderBody).toContainText('Build your own expensive computer Processor: Fast [+100.00]RAM: 8GB [+60.00]HDD: 320 GBSoftware: Office Suite [+100.00] Price: 2060.00');
    await expect(orderBody).toContainText('Quantity: 1 Total: 2060.00');
    await expect(orderBody).toContainText('14.1-inch Laptop Price: 1590.00');
    await expect(orderBody).toContainText('Quantity: 1 Total: 1590.00');
    await expect(orderBody).toContainText('Sub-Total: 3650.00');
    await expect(orderBody).toContainText('Shipping: 0.00 Payment method additional fee: 7.00 Tax: 0.00 Order Total: 3657.00');
});