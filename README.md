# BookshopVue
Mockup Bookshop website. Demostrates Vue.js and Tailwind CSS skills.

## npm commands

You can use those npm commands to do some magic.

```npm run dev``` will generate a TailWind CSS file with a large filesize. It was configured NOT to purge any un-used CSS style rules. 

```npm run prod``` will generate a TailWind CSS file with a smaller filesize. It was configured to purge any un-used CSS style rules. It will look in all HTML and Jacascripts files to check what CSS styles were used.

```npm run exportjson``` will read the Excel spreadsheet in "assets/datasource/books.xlsx" and export the data to a JSON file. If you want to add or edit any the books, edit details in the spreadsheet and run this npm command. Make sure you have "xlsx" package installed. https://www.npmjs.com/package/xlsx

## Required npm packages

Vue.js - https://www.npmjs.com/package/vue

Tailwind CSS - https://www.npmjs.com/package/tailwindcss

xslx - https://www.npmjs.com/package/xlsx 