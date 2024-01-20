const express = require("express"); //import
const cors = require("cors");
const logic = require("./Services/logics");
const contactServer = express(); //app creation
contactServer.use(
  cors({
    origin: "http://localhost:3000", //connecting cors to frontend
  })
);
contactServer.use(express.json()); //middleware creation
contactServer.listen(8000, () => {
  console.log("contactServer listening on port 8000"); //defining port number
});

//Api call for getting all contact details
contactServer.get("/get-all-contacts", (req, res) => {
  logic.getAllContacts().then((response) => {
    res.status(response.statusCode).json(response);
  });
});

//Api call for adding new contact
contactServer.post("/add-contact", (req, res) => {
  logic
    .addContact(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email
    )
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

//Api call for deleting a contact detail
contactServer.delete('/delete-contact/:id',(req,res)=>{
  logic.deleteContact(req.params.id).then((response)=>{
    res.status(response.statusCode).json(response)
  })
})

//Api call for viewing a particular contact
contactServer.get('/get-a-contact/:id',(req,res)=>{
  logic.getContact(req.params.id).then((response)=>{
    res.status(response.statusCode).json(response)
  })
})


// Api call for updating a particular contact
contactServer.post('/update-a-contact/:id',(req,res)=>{
  logic.updateContact(req.params.id,req.body.name,req.body.address,req.body.phone,req.body.email).then((response)=>{
    res.status(response.statusCode).json(response)
  })
})


