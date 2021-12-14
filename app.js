const client = require("./RedisDbConnection");


//set value
async function setValue(){
    await client.set("name","haydar")
   
}

//getValue from redis
async function getValue(){
   const name= await client.get("name")
   console.log(name)
}

//getValue from redis
async function appendValue(){
    const name= await client.append("name"," Urdoğan")
    console.log(name)
 }

setValue()
getValue()
appendValue()
getValue()
