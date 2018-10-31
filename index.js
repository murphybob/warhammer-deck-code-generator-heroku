const express = require("express")
const deckSharing = require("@playfusion/warhammer-deck-sharing")
const app = express()
const port = process.env.PORT || 5000

function error (res, msg, err) {
  res.statusCode = 400
  res.send("Error: " + msg + (err ? ` (${err.message})` : ""))
}

app.get("/", (req, res) => {
  const deckParam = req.query.deck
  if (!deckParam) return error(res, "Please specify a 'deck' parameter")
  let deck
  try {
    deck = JSON.parse(deckParam)
  } catch (e) {
    return error(res, "Deck parameter was not valid JSON", e)
  }
  let code
  try {
    code = deckSharing.generate(deck)
  } catch (e) {
    return error(res, "Failed to generate a deck code from deck, please check it is valid and in the format [{\"id\": 1234, \"count\": 1}, ...]")
  }
  res.send(code)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))