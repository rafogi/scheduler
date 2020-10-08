# Interview Scheduler

A React application used to practice front-end framework

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Screenshots

!["Screenshot of Scheduler page"](https://github.com/rafogi/scheduler/blob/master/public/images/Scheduler.png)

## Netlify link of project

https://keen-darwin-05abe4.netlify.app/

## Booking an interview

1. Click the add icon
2. Enter a student name
3. Click the save button
4. Spots remaining for that day should reduce by 1

## Cancel an interview

1. Hover over an existing appointment
2. Click the trash icon
3. Confirm the cancellation
4. Should show as empty slot and spots remaining increases by 1

## Edit an interview

1. Hover over an existing appointment
2. Click on the Edit icon
3. Enter a Student Name
4. Click an interviewer
5. Save
6. New appointment appears Spots remaining doesn't change