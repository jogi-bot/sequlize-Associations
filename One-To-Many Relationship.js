const { Sequelize, DataTypes } = require("sequelize");



const sequelize = new Sequelize("krunal", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// define user
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
     primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
});

//define blog post

const BlogPost = sequelize.define("BlogPost", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
User.hasMany(BlogPost, {foreignKey:'UserId'});

(async()=>{

    try{
       await sequelize.sync({force:false})
       console.log('you are connected with database');

       const user = await User.create({username:'krunal'})
         await BlogPost.bulkCreate([
            { title: "Post 1", content: "Content of Post 1", UserId: user.id } ,
            {title: "Post 2", content: "Content of Post 2", UserId: user.id },
            {title: "Post 3", content: "Content of Post 3", UserId: user.id },
        ])

        console.log('user blogs add sucseesfully');
            
    }catch(err){
        console.log('error occur', err);

    }
     finally { 
        await sequelize.close()
    }

})()
