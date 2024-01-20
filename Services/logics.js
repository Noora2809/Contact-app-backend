const db = require('../Services/db') 

//logic for getting all contacts from db
const getAllContacts = ()=>{
    return db.contact.find().then(
        (result)=>{
            if(result){ //if data is there
                return{ //send to frontend
                    statusCode:200,
                    contacts:result  //contact details array
                }
            }
            else{
                return{
                    statusCode:404,
                    message:'Contact details not found'
                }
            }
        }
    )
}

//logic for adding a contact detail

const addContact=(id,name,address,phone,email)=>{
    return db.contact.findOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:404,
                message:"Contact already exists"
            }
        }
        else{
            const newContact = new db.contact({id,name,address,phone,email})
            newContact.save()
            return{
                statusCode:200,
                message:'New contact added'
            }
        }
    })
}

const deleteContact=(id)=>{
    return db.contact.deleteOne({id}).then((response)=>{
        return{
            statusCode:200,
            message:"Contact deleted successfully"
        }
    })
        .catch((error)=>{
            return{
                statusCode:401,
                message:"Can't delete a contact from the database"
            }
        })  
} 

const getContact=(id)=>{
    return db.contact.findOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:200,
                contacts:result
            }
        }
        else{
            return{
                statusCode:404,
                message:'Contact not found'
            }
        }
    })
}

const updateContact=(id,name,address,phone,email)=>{
    return db.contact.findOne({id}).then((result)=>{
        if(result){
            result.id=id;
            result.name=name;
            result.address=address;
            result.phone=phone;
            result.email=email;
            //to save the details to mongodb
            result.save()
            return{
                statusCode:200,
                message:"Contact Updated successfully"
            }
        }
        else{
            return{
                statusCode:404,
                message:"No such contact"
            }
        }
    })
}


module.exports={
    getAllContacts,
    addContact,
    deleteContact,
    getContact,
    updateContact
}