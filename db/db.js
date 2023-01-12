const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URL,{})
.then(()=>{
    console.log('successfully connected to the data basejlhk');
})
.catch((error)=>{
    console.log('can not connect  to the data base',error);
})