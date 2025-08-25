import { Sequelize } from "sequelize";
const sequelize =new Sequelize('node_fulltask','root','Manh2004!!!',{
    host :'localhost',
    dialect: 'mysql',
    logging: false
});
let connectDB= async()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    
    }catch(error){
        console.log('unable to connection to the database', error);
    }
}
export default connectDB;