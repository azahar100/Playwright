const { test } = require('@playwright/test');
const inputs = require('./inputs');
const locators = require('./locators');
const assertions = require('./assertions');

test('URL Validation', async ({ page }) => {
    // Maximize the browser window
    await page.setViewportSize({ width: 1920, height: 1080 });
    // Navigate to the Landing Page
    await page.goto(inputs.homepageUrl);
    const url = await page.url();
    console.log("Title is : " + url);

    // Click on "Start Managing Documents" button
    await page.click('text="Start Managing Documents"');
    await page.waitForTimeout(2000);

    // Fill in all required fields
    await page.locator(locators.firstNameInput).fill(inputs.firstName);
    await page.locator(locators.lastNameInput).fill(inputs.lastName);
    await page.locator(locators.employeeIdInput).fill(inputs.employeeId);
    await page.locator(locators.phoneNumberInput).fill(inputs.phoneNumber);
    await page.locator(locators.salaryInput).fill(inputs.salary);
    await page.locator(locators.startDateInput).fill(inputs.startDate);
    await page.locator(locators.supervisorEmailInput).fill(inputs.supervisorEmail);
    await page.locator(locators.costCenterInput).fill(inputs.costCenter);
    await page.locator(locators.projectCodeInput).fill(inputs.projectCode);
    await page.locator(locators.privacyConsentButton).click();
    await page.waitForTimeout(2000);

    // Submit the form
    await page.locator(locators.submitButton).click();
    await page.waitForTimeout(5000);

    // Verify redirection to Results Page
    await assertions.verifyRedirectionToResultsPage(page);
});

test('Positive Search Result', async ({ page }) => {
    // Navigate to the Results Page
    await page.goto(inputs.homepageUrl + 'results');

    // Search Functionality
    await page.locator(locators.searchInput).fill(inputs.positiveSearchInput);
    await page.waitForTimeout(3000);

    // Verify search results
    await assertions.verifySearchResults(page, inputs.positiveSearchInput);
});

test('Negative Search Result', async ({ page }) => {
    // Navigate to the Results Page
    await page.goto(inputs.homepageUrl + 'results');

    // Second Search Functionality
    await page.locator(locators.searchInput).fill(inputs.negativeSearchInput);
    await page.waitForTimeout(3000);

    // Verify search results
    await assertions.verifySearchResults(page, inputs.negativeSearchInput);
});