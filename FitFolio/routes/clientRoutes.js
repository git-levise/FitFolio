const express = require("express");
const router = express.Router();
const {getAllClients,createClient,getClient,updateClient,deleteClients} = require("../controllers/clientController")

router.route("/").get(getAllClients).post(createClient);

router.route("/:id").get(getClient).put(updateClient).delete(deleteClients);

module.exports = router;