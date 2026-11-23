# GridSim

A grid optimization service that relies in [simplex]() minimization concept for finding the most optimal operation for finding the most optimal Grid operations that power 6 blocks

## Problem Domain

There are 6 blocks with different demands and 7 power plant groups (namely coal, natural gas, geothermal, oil-based, hydropower, wind, and solar) that power each block. However, each power plant have their own restrictions:

- Coal is cheap but slow, and cannot change output quickly or run below 40% of capacity
- Natural gas costs more than coal, but is flexible
- Geothermal is cheap and steady
- Hydropower is very cheap, but capacity is limited by how much water the dam holds per day
- Oil-based sources are the most expensive, and only runs when nothing cheaper is left
- Solar is only available when the sun is up
- Wind is only available when the wind blows

Coal, natural gas, geothermal and oil plants burn more fuel per MWh when the air is hot, so their cost rises in
hotter blocks: each block's cost is the B1 cost times a heat factor of 1.00, 1.01, 1.03, 1.05, 1.04 and 1.02 for B1 to
B6. Hydro (₱300), solar (₱40) and wind (₱60) cost the same in every block.

Given the demand per block:

| Block t | B1 | B2 | B3 | B4 | B5 | B6 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Hours | 12–4 AM | 4–8 AM |  8 AM–12 NN | 12–4 PM | 4–8 PM | 8 PM–12 MN |
| Demand Dt (MW) | 6,300 | 8,600 | 11,800 | 12,300 | 14,000 | 10,600 |
| aSolar,t | 0 | 0.10 | 0.60 | 0.55 | 0.08 | 0 |
| aWind,t | 0.35 | 0.30 | 0.25 | 0.25 | 0.30 | 0.35 |

as well as the varying operating cost of the other fuel plants per block: 

| Plant group | B1 | B2 | B3 | B4 | B5 | B6 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Coal | 3,800 | 3,838 | 3,914 | 3,990 | 3,952 | 3,876 |
| Natural Gas | 6,500 | 6,565 | 6,695 | 6,825 | 6,760 | 6,630 |
| Geothermal | 1,500 | 1,515 | 1,545 | 1,575 | 1,560 | 1,530 |
| Oil-based | 14,000 | 14,140 | 14,420 | 14,700 | 14,560 | 14,280 |

Find the most optimal way to operate the power plant blocks

***
## Technologies and installation
The technologies used for this project are the following:

| Technology | Description | Installation instructions |
| :--- | :--- | :--- |
|[SvelteKit](https://svelte.dev/docs/kit)| a meta-framework for building a fully-fledged full-stack application, with features for navigation, state management, remote functions, etc. | It is already automatically installed as a project dependency with the command below |
| [NodeJS](https://nodejs.org) | a JavaScript runtime Environment to run web-native JavaScript code as a standalone program that can be implemented in the server | Go the [NodeJS Download page](http://nodejs.org/en/download) to learn how to install it based on your operating system|
| [TypeScript](https://www.typescriptlang.org/) | A language that is built on top of JavaScript, but has types, and transpiles as a JavaScript code at build time | Automatically installed as a dependency with IDE support |

After downloading the project using Git or Downloading using a zip file, run the following commands:

```bash
npm install # installs the packages, including SvelteKit and TypeScript
npm run dev # runs a local web server to debug the application
```

***
## File Structure

- `/src/lib` - most of the source code files (ui and logic files)
- `/src/routes` - where routes in the website are directly mapped to (`/routes/calculate/+page.svelte` maps to `/calculate` route)
- `/static` - static files that can be accessed using `<link>/<route>` in the webpage
- `/node_modules` - where all dependencies are located (automatically-generated and should not be touched
- All the other files and folders that start with dot(.) are auto-generated and must not be touched

***
## Implementation

To handle all calculations, each class hold the following functions:
- `BlocksDataStore` handles the blocks Data
- `PlantDataStore` handles all plant data
- `TableauCreator` creates the tableau together with the plant data and blocks data
- `GridCostOptimizer` handles all the simplex operations and operates on the tableau created by the `TableauCreator`
