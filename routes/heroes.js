const express = require("express");
const app = express();
const heroes = require("../heroes .json");
const {
    verifyAddHeroes,
    verifyPowers,
    verifyHeroes,
    validateHero,
} = require("../middlewares/heroes");

app.get("/", (req, res) => {
    res.json(heroes);
});

app.get("/:slug", (req, res) => {
    const hero = heroes.find((hero) => hero.slug === req.params.slug);
    res.json(hero);
});

app.get("/:slug/powers", (req, res) => {
    const hero = heroes.find((hero) => hero.slug === req.params.slug);
    res.json(hero.power);
});

app.post("/", verifyAddHeroes, validateHero, (req, res) => {
    const hero = {
        slug: req.body.slug,
        name: req.body.name,
        power: req.body.power,
        color: req.body.color,
        isAlive: req.body.isAlive,
        age: req.body.age,
        image: req.body.image,
    };
    heroes.push(hero);
    res.status(201).json(hero);
});

app.put("/:slug/powers", verifyPowers, (req, res) => {
    const hero = heroes.find((hero) => hero.slug === req.params.slug);
    const newPower = req.body.power;
    hero.power.push(newPower);
    res.status(201).json(newPower);
});

app.put("/:slug", verifyHeroes, validateHero, (req, res) => {
    const heroIndex = heroes.findIndex((hero) => hero.slug === req.params.slug);
    const editedHero = req.body;
    heroes[heroIndex] = editedHero;
    res.status(200).json(editedHero);
});

app.delete("/:slug", verifyHeroes, (req, res) => {
    const heroIndex = heroes.findIndex((hero) => hero.slug === req.params.slug);
    heroes.splice(heroIndex, 1);
    res.status(200).json("Hero deleted");
});

app.delete("/:slug/powers/:power", verifyHeroes, (req, res) => {
    const { slug, power } = req.params;
    const hero = heroes.find((hero) => hero.slug === slug);
    const heroPower = hero.power.find((powerI) => powerI === power);
    if (heroPower) {
        const heroPowerIndex = hero.power.findIndex(
            (powerI) => powerI === power
        );
        hero.power.splice(heroPowerIndex, 1);
        res.status(200).json(
            `Le pouvoir ${power} de ${slug} a été effacé correctement`
        );
    } else {
        res.status(404).json("Power not found");
    }
});

module.exports = app;
