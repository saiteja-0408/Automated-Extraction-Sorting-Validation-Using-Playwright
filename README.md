# 📌 Project Overview
This project is an automated web scraper that extracts the latest articles from Hacker News using Playwright.</br>
It checks whether the articles are sorted from newest to oldest, saves them in structured files, and provides multiple execution options.</br>

The script:</br>
✅ Extracts article titles, submission IDs, and timestamps.</br>
✅ Validates sorting order using submission IDs.</br>
✅ Handles pagination dynamically.</br>
✅ Exports data to CSV & JSON for easy analysis.</br>
✅ Supports flexible execution options (--headless, --limit).</br>

# 📌 Project Structure
QA_WOLF_TAKE_HOME
│── node_modules/         # Dependencies (not included in GitHub)</br>
│── .gitignore            # Ignore unnecessary files</br>
│── hacker_news_articles_<timestamp>.csv  # Extracted articles (CSV format)</br>
│── hacker_news_articles_<timestamp>.json # Extracted articles (JSON format)</br>
│── index.js              # Main script</br>
│── package.json          # Node.js package file</br>
│── package-lock.json     # Package dependencies</br>
│── playwright.config.js  # Playwright configuration</br>
│── README.md             # Project documentation (this file)</br>

# 📌 Installation Instructions
1️⃣ Prerequisites</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Install Node.js (v14+ recommended)</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Install Playwright (if not installed)</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;npm install playwright</br>

2️⃣ Clone the Repository</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git clone https://github.com/YOUR_GITHUB_USERNAME/qa-wolf-take-home.git</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cd qa-wolf-take-home</br>

3️⃣ Install Dependencies</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;npm install</br>

# 📌 How to Run the Script
The script provides multiple execution options for flexibility:</br>

1️⃣ Default Execution (Fetches 100 Articles in Visible Mode)</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node index.js</br>
✔ Runs Playwright with a visible browser.</br>
✔ Fetches 100 articles from Hacker News.</br>
✔ Saves data to CSV & JSON files.</br>

2️⃣ Run in Headless Mode (Faster Execution)</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node index.js --headless</br>
✔ Runs without opening a browser window.</br>
✔ Useful for CI/CD pipelines & faster execution.</br>

3️⃣ Fetch a Custom Number of Articles (e.g., 50)</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node index.js --limit 50</br>
✔ Retrieves 50 articles instead of 100.</br>
✔ Saves output in structured files.</br>

4️⃣ Fetch More Articles in Headless Mode
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node index.js --limit 200 --headless</br>
✔ Fetches 200 articles.</br>
✔ Runs without opening a browser for maximum speed.</br>

# 📌 Expected Output
The extracted articles are saved in CSV & JSON files, with a timestamp to prevent overwriting.</br>

1️⃣ CSV Output (hacker_news_articles_<timestamp>.csv)</br>
S.No,Title,Submission ID,Time</br>
1,"AI Breakthrough in Healthcare",39543218,"2 minutes ago"</br>
2,"New JavaScript Framework Released",39543216,"5 minutes ago"</br>
3,"NASA’s Latest Discovery",39543214,"8 minutes ago"</br>
...</br>
📂 Location: Same directory as the script.</br>

2️⃣ JSON Output (hacker_news_articles_<timestamp>.json)</br>

[</br>
  {</br>
    "S.No": 1,</br>
    "title": "AI Breakthrough in Healthcare",</br>
    "submissionId": 39543218,</br>
    "time": "2 minutes ago"</br>
  },</br>
  {</br>
    "S.No": 2,</br>
    "title": "New JavaScript Framework Released",</br>
    "submissionId": 39543216,</br>
    "time": "5 minutes ago"</br>
  }</br>
]</br>
📂 Location: Same directory as the script.</br>

# 📌 How the Script Works</br>
| **Step** | **Description** |
|----------|---------------|
| **1** | Launches a Chromium browser and navigates to Hacker News ["Newest"](https://news.ycombinator.com/newest) page. |
| **2** | Extracts up to **N** articles (**default: 100**). |
| **3** | Handles **pagination dynamically** if more articles are needed. |
| **4** | Validates sorting using **submission IDs** to ensure articles are arranged from **newest to oldest**. |
| **5** | Saves extracted data to **CSV & JSON** files with dynamically generated filenames. |
| **6** | Displays the first **10 extracted articles** in the console for verification. |
| **7** | Closes the **browser session** after successful execution. |

# 📌 Key Features & Optimizations</br>
✔ Supports Headless & Visible Mode → Flexible execution options.</br>
✔ Handles Pagination Automatically → Fetches multiple pages if needed.</br>
✔ Parallelized Data Extraction → Uses Playwright’s fast element selection.</br>
✔ Error Handling & Robust Execution → Skips missing data, prevents crashes.</br>
✔ Dynamically Named Output Files → Prevents overwriting, keeps data organized.</br>
✔ Command-Line Customization → Fetch any number of articles with --limit.</br>

