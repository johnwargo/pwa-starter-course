# Exercise 2 - Installable Web Application

In this exercise, you'll add a web app manifest file and some JavaScript code to a web application to make it installable.

**Note:** You can add the manifest to an existing web application of your own, a sample web app from the Internet, or you can use the one provided with the course materials.

## Using the Sample App Included with the Course

To use the source project included with the student files, clone this GitHub repository to your local development system by opening a terminal window or command prompt and executing the following command:

```shell
git clone https://github.com/johnwargo/pwa-starter-course
```

In the cloned repo, the sample application used for this exercise is in a folder called `exercises/02-installable/tip-calculator-start`, make a copy of that folder and work in the copy for this exercise. The project already includes all of the icons and other files used by the application.

If you run into trouble, the completed exercise is in the repo's `exercises/02-installable/tip-calculator-end` folder.

## Exercise Instructions

In the the project's root folder, create a new file called `app.webmanifest` then populate the file with a JSON object representing the application as shown in the following example:

```json
{
  "short_name": "",
  "name": "",
  "icons": [
    {
      "src": "icons/app_icon_192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/app_icon_512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/index.html",
  "display": "",
}
```

Give the application `short_name` and/or `name` properties and set a value for the `display` property.

When you have time, play around with some of the other settings in the manifest as described in [web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Next, open the project's `index.html` file and add an install button to the app's UI; add the button to the top of the file's `<body>` section.

```html
<div id='installButtonDiv'>
  <button id='installButton'>Install</button>
</div>
```

The styling for the button is already in the app's CSS, but if you're using your own web app for this exercise, you'll want to style the button appropriately.
