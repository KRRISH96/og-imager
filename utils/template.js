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
      <div class='logo'>
        {{#if logoUrl}}
          <img src="{{logoUrl}}" alt="logo" />
        {{else}}
          <span>Example Logo</span>
        {{/if}}
      </div>
      <div class="title">{{title}}</div>
      <div>
        {{#if tags}}
          <ul class="tags">
          {{#each tags}}
            <li class="tag-item">#{{this}}</li>
          {{/each}}
          </ul>
        {{/if}}
        {{#if path}}
          <p class="path">{{path}}</p>
        {{/if}}
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
  padding: 2.5rem;
  height: 90vh;
  background: #042f7d;
  {{#if bgUrl}}
  background-image: url({{bgUrl}});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  {{else}}
  background: linear-gradient(to right, #042f7d, #007eff);
  color: #00ffae;
  {{/if}}
}

main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo {
  width: 15rem;
  height: 3rem;
}
.logo span {
  font-size: 2rem;
  color: yellow;
  font-style: italic;
  text-decoration: wavy;
  font-variant: unicase;
}
.logo img {
  width: 100%;
  height: 100%;
}

.title {
  font-size: {{fontSize}};
  text-transform: capitalize;
  margin: 0.25rem 0;
  font-weight: bold;
}

.tags {
  display: flex;
  list-style-type: none;
  padding-left: 0;
  color: #ff00d2;
  font-size: 1.5rem;
}

.tag-item {
  margin-right: 0.5rem;
}

.path {
  color: #6dd6ff;
  font-size: 1.25rem;
}
`;

module.exports = { templateHTML, templateStyles };