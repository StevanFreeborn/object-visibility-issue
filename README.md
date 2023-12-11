# Object Visibility Issue

An attempt to reproduce an issue with object visibility configurations not persisting on save when a certain number of outcomes is reached.

## Steps automated by this script

1. Navigate to target app
2. Create a new trigger with an object visibility outcome that hides one section of fields
3. Save the trigger
4. Edit the trigger and verify section being hidden displays as such.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)

## Setup

1. Clone this repo

```bash
git clone https://github.com/StevanFreeborn/object-visibility-issue.git
```

2. Install dependencies

```bash
npm install
```

3. Install playwright dependencies

```bash
npm run playwright:install
```

4. Copy the `example.env` file to `.env` and fill in the values

```bash
cp example.env .env
```

5. Run the test

```bash
npm test
```

If you want to run the tests in headed mode:

```bash
npm run test:headed
```

If you want to have the test multiple times in a row:

```bash
npm run test -- --repeat-each <number of times to repeat>
```
