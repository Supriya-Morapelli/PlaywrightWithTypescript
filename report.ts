import reporter, { Options } from 'cucumber-html-reporter';
const options: Options = {
  theme: 'bootstrap', // ✅ This is now correctly typed
  jsonFile: 'cucumber-report.json',
  output: 'cucumber-report.html',
  screenshotsDirectory: './screenshots/',
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  launchReport: true,
};
 
reporter.generate(options);
