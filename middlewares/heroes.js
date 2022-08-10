const heroes = require("../heroes .json");

const verifyAddHeroes = (req, res, next) => {
    const { slug } = req.body;
    const hero = heroes.find((hero) => hero.slug === slug);

    if (hero) {
        res.status(409).json("Hero already registered");
    } else {
        next();
    }
};

const verifyPowers = (req, res, next) => {
    const { power } = req.body.power;
    const { slug } = req.params.slug;

    const hero = heroes.find((hero) => hero.slug === req.params.slug);
    const powers = hero.power.find((power) => power === req.body.power);

    if (powers) {
        res.status(409).json("Power already in");
    } else {
        next();
    }
};

const verifyHeroes = (req, res, next) => {
    const { slug } = req.params;
    const hero = heroes.find((hero) => hero.slug === slug);

    if (hero) {
        next();
    } else {
        res.status(404).json("Hero not found ");
    }
};
module.exports = {
    verifyAddHeroes: verifyAddHeroes,
    verifyPowers: verifyPowers,
    verifyHeroes: verifyHeroes,
};
