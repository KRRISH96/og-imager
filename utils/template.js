const fs = require("fs");

const templateHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <style>{{styles}}</style>
  </head>
  <body id="body">
    <main>
      <div class='horizontal'>
        <div class="title">{{title}}</div>
        <div class="ticket-number"><h1 class="ticket-number-h1">{{ticketNumber}}</h1></div>
      </div>
    </main>
  </body>
</html>
`;

const templateStyles = `
@font-face {
  font-family: Source Code Pro;
  src: url(https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap);
}

* {
  box-sizing: border-box;
}

:root {
  font-size: 16px;
  font-family: Source Code Pro, monospace;
}

body {
  height: 90vh;
  background-image: url(data:image/png;base64,${fs
    .readFileSync(`./assets/Ticket_v5.png`)
    .toString("base64")});
  background-position: center;
  background-size: 100% 100%;

}

main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

}

.horizontal {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: raw;
  margin-left: 120px;
}

.title {
  display: flex;
  font-size: {{fontSize}};
  text-transform: capitalize;
  margin-top: 260px;
  padding-left: 18px;
  width: 760px;
  height: 160px;
  color: white;
  font-weight: bold;
  align-items: center;
}

.ticket-number {
  max-width: 160px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 36px;
  margin-top: 40px;
  margin-bottom: 40px;
}

.ticket-number-h1 {
  text-align: center; 
  min-width: 80vh;
  font-size: 72px;
  transform: rotate(-0.25turn);
}
`;

module.exports = { templateHTML, templateStyles };
