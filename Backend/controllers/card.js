"use strict";
const validator = require("validator");
const Card = require("../models/card");

const cardController = {
  save: (req, res) => {
    let cardInfo = req.body;
    try {
      if (validateCardInfo(cardInfo)) {
        let card = createCard(cardInfo);
        saveCard(card, res);
      } else {
        sendResult(res, 200, { message: "Datos incorrectos" });
      }
    } catch (err) {
      sendResult(res, 200, { message: "Faltan datos " });
    }
  },

  },

  getCards: (req, res)=>{
      Card.find({}).exec((err, cards) =>{
        if(err) sendResult(res, 404,{ message: "Error: "+err} )
        if(cards.length === 0) sendResult(res, 404,{ message: "Error: Cards not found"} )

        sendResult(res, 200, { message: "Cards returned", cards: cards} )
      })
  },

};

const validateCardInfo = (cardInfo) => {
  let propertysNeeded = [
    "image",
    "name",
    "cost",
    "kind",
    "description",
    "effects",
  ];
  let cardInfoKeys = Object.keys(cardInfo);

  for (const property of propertysNeeded) {
    if (!cardInfoKeys.includes(property)) return false;
    if (property === "cost" && !validator.isInt(cardInfo.cost)) return false;
  }
  return true;
};

const createCard = (cardInfo) => {
  let createdCard = new Card();
  createdCard.image = cardInfo.image;
  createdCard.name = cardInfo.name;
  createdCard.cost = cardInfo.cost;
  createdCard.kind = cardInfo.kind;
  createdCard.text.description = cardInfo.description;
  createdCard.text.effects = cardInfo.effects;
  return createdCard;
};

const saveCard = (card, res) => {
  card.save((err, cardStored) => {
    if (err || !cardStored) {
      sendResult(res, 404, { message: "Error: " + err._message });
    } else {
      sendResult(res, 200, {
        message: "Success to create a card",
        card: cardStored,
      });
    }
  });
};

const sendResult = (res, statusCode, toSend) => {
  return res.status(statusCode).send({
    toSend,
  });
};

module.exports = cardController;
