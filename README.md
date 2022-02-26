# Streamability

Made by [Leithen Crider](https://github.com/Thenlie), [Kevin Fan](https://github.com/Yu-ChengFan), Benjamin Holt, and [Tyler Norman](https://github.com/t-norm).

## Description

Streamability is a collaborative application whose purpose is threefold:

1. Provide users with information about any given film/TV show and indicate where these can be streamed;
2. Suggest titles similar to the searched-for film/show; and
3. Create a queue of films and shows to watch across _all_ streaming providers, rather than creating individual queues per provider.

In creating this application, we used the following user story and acceptance criteria:

## User Story

```
AS AN individual who streams entertainment
I WANT to search for movies and TV shows across all streaming providers and find title suggestions
SO THAT I can create a queue of shows and movies to watch regardless of where said shows/movies are streamable.
```

## Acceptance Criteria

```
GIVEN I want to find movies and TV shows to stream
WHEN I search for a movie or TV show
THEN I am shown a list of TV/film results relating to my search terms
WHEN I select a result from this list
THEN I am presented with a result page containing information about the selected title
WHEN I peruse the result page
THEN I find the title's release year, viewer rating, film/show poster, streaming locations, and suggestions for similar titles
WHEN I click on a suggested title
THEN I shown a search for that title so I can select the result I want
WHEN I am viewing an individual title
THEN I have the option to add that title to my global watch queue
WHEN I add items to my queue
THEN my queue is stored locally to remain persistent, even if I close the page
WHEN I have items in my watch queue
THEN this queue is displayed on both the landing page and individual result pages
WHEN I click on a title in my queue
THEN I am taken to the result page for that title
WHEN I click "Delete" on an individual queue item
THEN that item is removed from my queue
WHEN I click "Clear Queue"
THEN my entire queue is emptied
WHEN I select a theme from the themes menu
THEN the display of the page changes accordingly
WHEN I have selected a theme
THEN that theme remains persistent until I change it again, even if I close the page
WHEN I hover over interactive elements
THEN the styling of those elements changes to indicate that interactiveness to users
WHEN I resize the page or view the site on various screens and devices
THEN I am presented with a responsive layout that adapts to my viewport
```

# IMPORTANT - PLEASE READ

This application was created by students. Its intention is to showcase front-end development skills, as back-end skills are part of future course modules. As such, extra steps will need to be taken in order for this application to function properly. Please follow the below instructions before using the app:

## Step 1

Before searching for a title, follow this link in a new tab in your browser: <https://cors-anywhere.herokuapp.com/>
Once opened, you will see the following:

![CORS-Anywhere/Heroku](./assets/images/heroku.PNG)

## Step 2

Click the button on the page that says "Request temporary access to the demo server." Once you do, the page will show a bold text message that says "You currently have access to the demo server."
You may now exit out of the <https://cors-anywhere.herokuapp.com/corsdemo> tab.

## Step 3

The application is now fully operational. Keep in mind that failing to follow the above steps will prevent the app from giving you title suggestions for similar titles.

One additional note: The access granted above will only give you temporary access; this access tends to last for 1-2 days. If you find that the similar-title functionality has stopped functioning, simple re-perform the above steps to be granted access once again.

## Built With

-   HTML
-   CSS
-   JavaScript
-   Bulma
-   The Movie Database
-   Taste Dive

## Website

<https://thorulfr.github.io/Streamability/>

## Screenshot

![Screenshot](./assets/images/readme-screenshot.png)

## Contribution

Code by [Leithen Crider](https://github.com/Thenlie), [Kevin Fan](https://github.com/Yu-ChengFan), Benjamin Holt, and [Tyler Norman](https://github.com/t-norm).
