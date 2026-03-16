# FarmAI Ireland — Link Checker Exceptions

Sites that return false positives in automated link checking
(anti-scraper 403s). These links are valid — do not flag as broken.

- chat.openai.com — blocks HEAD requests, page exists
- moocall.com — blocks scrapers, page exists
- pasturebase.ie — check manually if flagged

Sites with known URL instability — verify manually each quarter:
- gov.ie — URL structure changes periodically
- teagasc.ie — site restructured 2024, verify paths quarterly
