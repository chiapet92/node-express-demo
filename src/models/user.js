const user = (sequelize, DataTypes) => {
  // defining the data structure using sequelize
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  // defining the relationship between user and messages
  User.associate = models => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });
    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }
    return user;
  };

  return User;
};
export default user;
