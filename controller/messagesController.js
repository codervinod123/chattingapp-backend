const messageModel=require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {

   
    try {
        const {from,to,message}=req.body;
        const data=await messageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        })

        // console.log("vinod");
        if(data)  return res.json({msg:"message addedd successfully to data base"});
                   return res.json({msg:"message can't be addedd to data base"});

  }
   catch (error) {
       next(error);
  }
};


module.exports.getAllMessage = async (req, res, next) => {

        try {
            const {from,to}=req.body;
            const messages=await messageModel.find({
                users:{
                    $all :[from,to],
                },
            }).sort({updatedAt: 1});

            const projectMessages=messages.map((msg)=>{
                return {
                    fromSelf: msg.sender.toString()===from ,
                    message:msg.message.text,
                };
            });
            res.json(projectMessages);

        } catch (error) {
            next(error)
        }

}