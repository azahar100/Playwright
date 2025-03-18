const { expect } = require('@playwright/test');
const locators = require('./locators');
const inputs = require('./inputs');

module.exports = {
  async verifyRedirectionToResultsPage(page) {
    await expect(page).toHaveURL(inputs.homepageUrl+'results');
  },
  async verifySearchResults(page, input) {
    const results = await page.locator(locators.searchResult).textContent();
    console.log(results);
    if (results === input) {
      console.log("Search results found");
    } else {
      console.log("No results found");
      await expect(page.locator(locators.noResultsMessage)).toHaveText('No matching documents found');
    }
  }
};