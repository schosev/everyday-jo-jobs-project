//added bcrypt for passport 
// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as 
//the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");


module.exports = function(Sequelize, DataTypes) {
  
	var User = Sequelize.define('User', {

		name: { 
			type: DataTypes.STRING,
			notEmpty: true
		},

		about : {
			type: DataTypes.TEXT
		},
		email: { 
			type:DataTypes.STRING, 
			allowNull: false, 
			unique: true, 
			validate: {isEmail:true} 			
		},
		password : {
			type: DataTypes.STRING,
			allowNull: false 
		}, 
		last_login: {
			type: DataTypes.DATE
		},
        status: {
			type: DataTypes.ENUM('active','inactive'),
			defaultValue:'active' 
		},
		phoneNumber: {
			type: DataTypes.TEXT
		},
		city: {
			type: DataTypes.STRING
		},
		state: {
			type: DataTypes.STRING
		}, 
		skillOne: {
			type: DataTypes.STRING
		},
		wageOne: {
			type: DataTypes.STRING
		},
		skillTwo: {
			type: DataTypes.STRING
		},
		wageTwo: {
			type: DataTypes.STRING
		},
		skillThree: {
			type: DataTypes.STRING
		},
		wageThree: {
			type: DataTypes.STRING
		},
		imgUrl: {
			type: DataTypes.TEXT
		},
});

//This will check if an unhashed password entered by the 
//user can be compared to the hashed password stored in our database
User.prototype.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};
// Hook  automatic method for when a User is created, we will automatically hash their password
User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});	
	return User;

}; // end of mudule.exports

// removed skills.js and saved to my desktop
  