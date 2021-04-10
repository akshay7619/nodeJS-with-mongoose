const { json } = require("body-parser");
const express = require("express");
const Posts = require("../models/Posts");
const router = express.Router();

//GET ALL THE POSTS
router.get("/", async (req, res) => {
	try {
		const post = await Posts.find();
		res.json(post);
	} catch (err) {
		res.json({ message: err });
	}
});

//SUBMIT A POST
router.post("/", async (req, res) => {
	console.log(req.body);
	const post = new Posts({
		title: req.body.title,
		description: req.body.description,
	});
	try {
		const savedPosts = await post.save();
		res.json(savedPosts);
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
});

//GET A SPECIFIC POST
router.get("/:postId", async (req, res) => {
	try {
		const post = await Posts.findById(req.params.postId);
		res.json(post);
	} catch (err) {
		res.json({ message: err });
	}
});

//DELETE
router.delete("/:postId", async (req, res) => {
	try {
		const removedPost = await Posts.remove({ _id: req.params.postId });
		res.json(removedPost);
	} catch (error) {
		res.json({ message: error });
	}
});

//UPDATE

router.patch("/:postId", async (req, res) => {
	try {
		const updatedPost = await Posts.updateOne(
			{ _id: req.params.postId },
			{ $set: { title: req.body.title } }
		);
		res.json(updatedPost);
	} catch (error) {
		res.json({ message: error });
	}
});

module.exports = router;
