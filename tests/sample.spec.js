const { test, expect } = require('@playwright/test');

test('Form Submission', async ({ page }) => {
  // Navigate to the Landing Page
  await page.goto('http://localhost:5173/');

  

  const url=await page.url()
  console.log("Title is " +url )
  
  // Click on "Start Managing Documents" button
  await page.click('text="Start Managing Documents"');

  await page.waitForTimeout(2000)
  
  // Fill in all required fields
  await page.locator("input[id='firstName']").fill('Jacob');
  await page.locator("input[id='lastName']").fill('William');
  await page.locator("input[id='employeeId']").fill('ABC-12355');
  await page.locator("input[id='phoneNumber']").fill('9876543210');
  await page.locator("input[id='salary']").fill('9998765');
  await page.locator("input[id='startDate']").fill('2020-02-02');
  await page.locator("input[id='supervisorEmail']").fill('supervisor5@the4d.ca');
  await page.locator("input[id='costCenter']").fill('SA-213-XYZ');
  await page.locator("input[id='projectCode']").fill('PRJ-2024-005');
  await page.locator("button[id='privacyConsent']").click();
  await page.waitForTimeout(2000);
  // Submit the form
  await page.locator("button[type='submit']").click();

  await page.waitForTimeout(5000);
  
  
  // Verify redirection to Results Page
  await expect(page).toHaveURL('http://localhost:5173/results');
  const url2=await page.url();
  console.log("Title is " +url2 );

  // Search Functionality
  await page.getByPlaceholder("Search by full name (e.g. 'John Doe')...").fill('Jacob William');
  await page.waitForTimeout(2000); 

  // Verify search results
  const results = await page.locator(".search-results").count(); 
  console.log("Count "+results);
  if (results > 0) {
    console.log("Search results found");
  } else {
    console.log("No results found");
    await expect(page.locator(".no-results-message")).toHaveText('No results found'); // Update the selector for the "No results found" message
  }

  
});