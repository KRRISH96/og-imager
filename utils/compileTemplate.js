const Handlebars = require("handlebars");
const { templateHTML, templateStyles } = require("./template");

function getFontSize(title = "") {
  if (!title || typeof title !== "string") return "";

  const titleLength = title.length;

  if (titleLength > 55) return "1.75rem";
  if (titleLength > 35) return "2.25rem";
  if (titleLength > 25) return "3.25rem";

  return "4rem";
}

function compileStyles({ bgUrl, title }) {
  return Handlebars.compile(templateStyles)({
    bgUrl,
    fontSize: getFontSize(title),
  });
}

function getCompiledHTML({ title, ticketNumber, bgUrl }) {
  return Handlebars.compile(templateHTML)({
    title,
    ticketNumber,
    styles: compileStyles({ bgUrl, title }),
  });
}

function getCompiledTicketHTML({ name, ticketNumber }) {
  return Handlebars.compile(templateHTML)({
    title,
    ticketNumber,
    styles: compileStyles({ bgUrl, title }),
  });
}

module.exports = { getCompiledHTML };
