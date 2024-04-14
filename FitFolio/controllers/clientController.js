const asyncHandler = require("express-async-handler");
const Client = require("../models/Client")
//@desc Get all clients
//@route GET /api/clients
//@access public

const getAllClients = asyncHandler(async(req,res) => {
    const client = await Client.find();
    res.status(200).json(client);
});

//@desc create new client
//@route POST /api/clients
//@access public

const createClient = asyncHandler(async(req,res) => {
    console.log("The body is : ",req.body);
    const {name,weight,height,age} = req.body;
    if(!name||!weight||!height||!age){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const client = await Client.create({
        name,
        weight,
        height,
        age
    });
    res.status(201).json(client);
});

//@desc Get a client
//@route GET /api/clients
//@access public

const getClient = asyncHandler(async(req,res) => {
    const client = await Client.findById(req.params.id);
    if(!client){
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).json(client);
});

//@desc Update client
//@route PUT /api/clients
//@access public

const updateClient = asyncHandler(async(req,res) => {
    const client = await Client.findById(req.params.id);
    if(!client){
        res.status(404);
        throw new Error("Contact not Found");
    }
    const updateContact = await Client.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json(updateContact);
});
//@desc Delete client
//@route DELETE /api/clients/:id
//@access public

const deleteClients = asyncHandler(async(req,res) => {
    const client = await Client.findById(req.params.id);
    if(!client){
        res.status(404);
        throw new Error("Contact not Found");
    };
    await Client.deleteOne();
    res.status(200).json(client);
});

module.exports = { getAllClients,createClient,getClient,updateClient,deleteClients};

