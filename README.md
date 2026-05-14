# Hangry FE Intern Test

## Run
1. `npm install`
2. `npm run dev`

## Design Decisions
- Expense is labeled with a red top right arrow icon to be in contrast with the green bottom right arrow icon of income
- Time of transaction is displayed as either `TODAY`, `YESTERDAY`, or `DD MMM YYYY` (e.g. `11 MAY 2026`) 
- `By Category` and `By Account` tabs implemented using the same grouping pattern as `By Date` since the view design is not provided
- Transactions with missing or invalid fields are grouped under `DATE ISN'T SPECIFIED` (invalid date), `UNCATEGORIZED` (invalid category), or `NO ACCOUNT` (invalid account) to avoid mislabeling.
- Daily totals use default text color (`#121212`) when the total is 0 to avoid a positive or negative signal.
- Grouping for Category and Account is sorted by highest total first, then alphabetically for ties.
- Search matches notes and categories while being case-insensitive
- Long transaction notes are truncated for consistent heights and list stability since expense trackers only need enough to recognize the transaction rather than to be read carefully
- Desktop-only, designed for 1280px+ viewports as per the provided spec
- Fixed widths and heights are used to match Figma exactly; responsiveness can be addressed later if needed.
- Border rendering uses a "single owner per edge" rule (wrapper owns left/right/top, inner rows own separators) to prevent stacked lines. This slightly deviates from the Figma design spec where multiple nested borders overlap.
- Date input uses `DayPicker` with basic styling even though not specified in the Figma design for intuitiveness
- Added more mock data for more interactions
- `Accounts` and `Settings` page is labeled as "In development"
