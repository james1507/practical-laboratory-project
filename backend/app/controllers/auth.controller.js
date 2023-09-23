const config = require("../config/auth.config");
const db = require("../models");
const Schedule = require("../models/schedule.model");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const moment = require("moment");

async function createUserSchedule(userId) {
  try {
    const startTime = moment().subtract(5, "hour"); // Set StartTime to 1 hour ago
    const endTime = moment(); // Set EndTime to the current time

    const schedule = new Schedule({
      IdUser: userId,
      Subject: "Default Subject",
      StartTime: startTime.toISOString(),
      EndTime: endTime.toISOString(),
      Description: "Default Description",
    });

    await schedule.save();
  } catch (error) {
    console.error("Error creating user schedule:", error);
  }
}

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save(async (err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            console.log("User was registered successfully!");

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          console.log("User was registered successfully!");

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        token: token,
        fullName: user.fullName,
        age: user.age,
        collage: user.collage,
        position: user.position,
        major: user.major,
        yearExp: user.yearExp,
        aboutMe: user.aboutMe,
        imageUrl: user.imageUrl,
      });
    });
};

exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.userId, // Get the user ID from the request token
    {
      fullName: req.body.fullName,
      age: req.body.age,
      collage: req.body.collage,
      position: req.body.position,
      major: req.body.major,
      yearExp: req.body.yearExp,
      aboutMe: req.body.aboutMe,
      imageUrl: req.body.imageUrl,
    },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({ message: "Profile updated successfully" });
    }
  );
};

exports.updateProfileById = async (req, res) => {
  const userId = req.params.userId;

  // Find the user by their ID
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  User.findByIdAndUpdate(
    user.id, // Get the user ID from the request token
    {
      fullName: req.body.fullName,
      age: req.body.age,
      collage: req.body.collage,
      position: req.body.position,
      major: req.body.major,
      yearExp: req.body.yearExp,
      aboutMe: req.body.aboutMe,
      imageUrl: req.body.imageUrl,
    },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({ message: "Profile updated successfully" });
    }
  );
};

exports.listAccounts = (req, res) => {
  User.find({})
    .populate("roles", "-__v")
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const filteredUsers = users.filter((user) => {
        return user.roles.some((role) => role.name === "user");
      });

      res.status(200).json(filteredUsers);
    });
};

exports.listAccountsByRole = (req, res) => {
  const role = req.params.role;

  // Validate the role against a list of allowed roles (e.g., "user," "moderator," "admin")
  const allowedRoles = ["user", "moderator", "admin"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  User.find({}) // Retrieve all users
    .populate("roles", "-__v")
    .exec(async (err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      // Filter users based on the specified role
      const filteredUsers = users.filter((user) => {
        return user.roles.some((userRole) => userRole.name === role);
      });

      res.status(200).json(filteredUsers);
    });
};

exports.getInfoById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user's detail information
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      fullName: user.fullName,
      age: user.age,
      collage: user.collage,
      position: user.position,
      major: user.major,
      yearExp: user.yearExp,
      aboutMe: user.aboutMe,
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
