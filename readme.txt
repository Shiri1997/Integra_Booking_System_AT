# Integra_Booking_System_AT
Automation tests in Playwright for Integra Booking System web application.

# How to run the tests:
Install Playwright(if not already installed):
npm init playwright@latest 

# Installing dotenv:(if needed):
npm install dotenv
# Command for fixing issues related to dotenv dependencies:
npm audit fix --force

# Running the tests:
npx playwright test
  Runs the end-to-end tests.

npx playwright test --ui
  Starts the interactive UI mode.

npx playwright test --project=chromium
  Runs the tests only on Desktop Chrome.

npx playwright test "example"
  Runs the tests in a specific file.

npx playwright test --debug
  Runs the tests in debug mode.

npx playwright codegen
  Auto generate tests with Codegen.
