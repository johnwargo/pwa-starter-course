# Exercise 1

In this exercise, you'll add a very simple service worker to a web application. The service worker won't do much, but you'll learn how to implement the registration process and how to work with service workers in the browser's debugging tools.

**Note:** You can add the service worker to an existing web application of your own, a sample web app from the Internet, or you can use the one provided with the course materials.

## Using the Sample App Included with the Course

To use the source project included with the student files, clone the following GitHub repository to your local development system: `https://github.com/johnwargo/pwa-starter-course`.  In the cloned repo, the sample application used for this exercise is in a folder called `01-service-workers/tip-calculator-start`, make a copy of that folder and work in the copy for this exercise. 

If you run into trouble, the completed exercise is in the repo's `01-service-workers/tip-calculator-end` folder.

## Exercise Instructions

[ ] Open the project's `index.html` file and add the following code to the end of the `<head>` section of the file:

```html
 <script>
    // does the browser support service workers?
    if ('serviceWorker' in navigator) {
      // fires when the service worker is ready
      navigator.serviceWorker.ready.then(reg => {
        // we have an active service worker working for us
        console.log(`Service Worker ready (Scope: ${reg.scope})`);
        // do something interesting, if you want...

      });
      // then register our service worker
      navigator.serviceWorker.register('./sw.js')
        .then(function (reg) {
          // display a success message
          console.log(`Service Worker Registration (Scope: ${reg.scope})`);
        })
        .catch(function (error) {
          // display an error message
          console.log(`Service Worker Error (${error})`);
        });
    } else {
      // happens when the app isn't served over a TLS connection (HTTPS)
      console.warn('Service Worker not available');
    }
  </script>
```



