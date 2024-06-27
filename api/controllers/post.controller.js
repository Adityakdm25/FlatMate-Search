import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(errorHandler(404, "Post not found"));

  if (req.user.id !== post.userRef) {
    return next(errorHandler(403, "You can only delete your own posts"));
  }

  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(errorHandler(404, "Listing not found!"));

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    } else {
      furnished = furnished === "true";
    }

    const searchTerm = req.query.searchTerm || "";
    const city = req.query.city || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const gender = req.query.gender;
    const rentSort = req.query.rentSort; // Get rentSort from the query parameters

    let searchCriteria = {
      name: { $regex: searchTerm, $options: "i" },
      city: { $regex: city, $options: "i" },
      furnished,
    };

    if (gender && gender !== "") {
      searchCriteria.gender = gender;
    }

    let sortCriteria = { [sort]: order === 'asc' ? 1 : -1 };

    
    if (rentSort === 'lowToHigh') {
      sortCriteria = { Totalrent: 1 };
    } else if (rentSort === 'highToLow') {
      sortCriteria = { Totalrent: -1 };
    }

    const posts = await Post.find(searchCriteria)
      .sort(sortCriteria)
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(errorHandler(404, "Post not found"));

  if (req.user.id !== post.userRef) {
    return next(errorHandler(403, "You can only update your own posts"));
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
