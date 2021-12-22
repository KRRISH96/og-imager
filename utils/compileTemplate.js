const Handlebars = require("handlebars");
const { templateHTML, templateStyles } = require("./template");

function getFontSize(title="") {
  if (!title || typeof title !== 'string') return "";

  const titleLength = title.length;

  if (titleLength > 55) return "2.75rem";
  if (titleLength > 35) return "3.25rem";
  if (titleLength > 25) return "4.25rem";

  return "4.75rem";
}

function compileStyles({ bgUrl, title }) {
  return Handlebars.compile(templateStyles)({
    bgUrl,
    fontSize: getFontSize(title),
  });
};


function getCompiledHTML({ logoUrl, title, tags, path, bgUrl }) {
  return Handlebars.compile(templateHTML)({
    logoUrl, title, tags, path, styles: compileStyles({ bgUrl, title }),
  });
}

module.exports = { getCompiledHTML };