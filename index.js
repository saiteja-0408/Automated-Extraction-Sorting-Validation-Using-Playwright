// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const fs = require("fs");

// =============================
// CONFIGURATION & CLI ARGUMENTS
// =============================

// This script supports command-line arguments for flexibility:
// - `--headless`   → Runs the script in headless mode (faster execution).
// - `--limit <N>`  → Fetches a custom number of articles (default: 100).

const isHeadless = process.argv.includes("--headless"); // Check if "--headless" flag is passed.
const numArticles = process.argv.includes("--limit") 
  ? parseInt(process.argv[process.argv.indexOf("--limit") + 1]) || 100 
  : 100; // Default: 100 articles if no limit is provided.

async function sortHackerNewsArticles() {
  // ================================
  // STEP 1: Launch the Browser
  // ================================

  const browser = await chromium.launch({ headless: isHeadless, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("🚀 Navigating to Hacker News 'Newest' page...");
  await page.goto("https://news.ycombinator.com/newest", { waitUntil: "domcontentloaded" });

  let articles = []; // Array to store extracted articles.
  let pageNum = 1;   // Keep track of pages navigated.

  // ================================
  // STEP 2: Function to Extract Articles
  // ================================
  async function extractArticles() {
    // Select all articles on the page
    const articleElements = await page.$$('tr.athing');

    for (const article of articleElements) {
      // Stop extracting once we reach the required number of articles.
      if (articles.length >= numArticles) return;

      try {
        // Extract submission ID (unique identifier for each article).
        const submissionId = await article.getAttribute("id");
        if (!submissionId) throw new Error("Missing submission ID");

        // Extract article title.
        const titleElement = await article.$('span.titleline > a');
        const title = titleElement ? await titleElement.innerText() : "Unknown Title";

        // Extract time (e.g., "5 minutes ago", "2 hours ago").
        const subtextElement = await article.evaluateHandle(node => node.nextElementSibling);
        const timeElement = await subtextElement.$('span.age');
        const readableTime = timeElement ? await timeElement.innerText() : "Unknown Time";

        // Ensure valid data is extracted.
        if (!title || readableTime === "Unknown Time") throw new Error("Missing title or time");

        // Push extracted data into the articles array.
        articles.push({
          "S.No": articles.length + 1,
          title,
          submissionId: parseInt(submissionId, 10), // Convert ID to number for sorting.
          time: readableTime
        });

      } catch (error) {
        console.warn(`⚠️ Skipping article due to missing data: ${error.message}`);
      }
    }
  }

  // ================================
  // STEP 3: Extract First Page Articles
  // ================================

  await extractArticles();

  // ================================
  // STEP 4: Handle Pagination
  // ================================
  // If we haven't collected enough articles, navigate to the next page and continue extracting.
  while (articles.length < numArticles) {
    const moreLink = await page.$('a.morelink'); // "More" button for pagination.
    if (moreLink) {
      pageNum++;
      console.log(`➡️ Navigating to page ${pageNum}...`);
      await Promise.all([
        moreLink.click(),
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      ]);
      await extractArticles();
    } else {
      console.warn("⚠️ Warning: 'More' link not found. Reached the last available page.");
      break;
    }
  }

  // Ensure we only collect the exact number of articles requested.
  articles = articles.slice(0, numArticles);
  console.log(`✅ Successfully fetched ${articles.length} articles.`);

  // ================================
  // STEP 5: Validate Sorting Order
  // ================================
  // The newest articles should have the highest Submission ID.
  const sortedCorrectly = articles.every((article, index) => 
    index === 0 || article.submissionId < articles[index - 1].submissionId
  );

  console.log(sortedCorrectly 
    ? "✅ Validation Passed: Articles are correctly sorted from newest to oldest." 
    : "❌ Validation Failed: Articles are NOT sorted correctly."
  );

  // ================================
  // STEP 6: Save Extracted Data to CSV & JSON
  // ================================

  // Generate unique filenames to prevent overwriting.
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const csvFilename = `hacker_news_articles_${timestamp}.csv`;
  const jsonFilename = `hacker_news_articles_${timestamp}.json`;

  // Create CSV file with structured data.
  const csvData = "S.No,Title,Submission ID,Time\n" + articles.map(article =>
    `${article["S.No"]},"${article.title}",${article.submissionId},"${article.time}"`
  ).join("\n");

  fs.writeFileSync(csvFilename, csvData);
  console.log(`📄 CSV file created: ${csvFilename}`);

  // Create JSON file.
  fs.writeFileSync(jsonFilename, JSON.stringify(articles, null, 2));
  console.log(`📄 JSON file created: ${jsonFilename}`);

  // ================================
  // STEP 7: Display Extracted Data
  // ================================
  console.log("\n📌 Extracted Articles (First 10 for Preview):");
  console.table(articles.slice(0, 10));

  console.log("🛑 Stopping interaction as requested articles have been collected.");
  await browser.close();
}

// Run the function inside an async IIFE (Immediately Invoked Function Expression).
(async () => {
  await sortHackerNewsArticles();
})();
