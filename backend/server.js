const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// ---------------------------
// JWT SECRET
// ---------------------------
const JWT_SECRET = "MY_SECRET_KEY_123";

// ---------------------------
// MONGODB CONNECTION
// ---------------------------
const MONGO_URL = "mongodb://127.0.0.1:27017/authdb";

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));


// ---------------------------
// USER MODEL WITH ROLE FIELD
// ---------------------------
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" }   // ⭐ IMPORTANT
});

const User = mongoose.model("User", UserSchema);


// ---------------------------
// SIGN UP
// ---------------------------
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ status: "error", message: "Email already exists" });
        }

        // Normal users created from UI are "user"
        const newUser = new User({ name, email, password, role: "user" });

        await newUser.save();

        res.json({ status: "success", message: "User created" });

    } catch (err) {
        console.log(err);
        res.json({ status: "error", message: "Server error" });
    }
});


// ---------------------------
// SIGN IN
// ---------------------------
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ status: "error", message: "User not found" });
        }

        if (user.password !== password) {
            return res.json({ status: "error", message: "Incorrect password" });
        }

        // ⭐ Include ROLE inside JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.json({
            status: "success",
            message: "Login successful",
            token,
            role: user.role   // ⭐ SEND ROLE
        });

    } catch (err) {
        console.log(err);
        return res.json({ status: "error", message: "Server error" });
    }
});


// ---------------------------
// START SERVER
// ---------------------------
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
