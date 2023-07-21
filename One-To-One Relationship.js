const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("krunal", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

//model for User
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

//model for profile
const Profile = sequelize.define("Profile" , {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
 
});

User.hasOne(Profile);
Profile.belongsTo(User);

// async function explain me 
(async () => {
  await sequelize;
  console.log('Database and tables synced.');

  try {
    const user = await User.create({ username: 'krunal' });
    const profile = await Profile.create({
      fullName: 'krunal-don',
      bio: 'I am a software developer.',
      UserId: user.id,
    });
    console.log('User and Profile added successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sequelize.close();
  }
})();

