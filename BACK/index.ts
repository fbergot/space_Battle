import express from "express";
import twig from "twig";

const app = express();

app.use("/static", express.static("static"));

app.set("twig options", {
   allow_async: true,
   strict_variables: false,
});

app.get("/", function (req, res) {
   res.render("menu.twig", {
      message: "Hello World",
   });
});

app.get("/game", function (req, res) {
   res.render("game.twig", {
      message: "Hello World",
   });
});

app.listen(3000);
