import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createBlog = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    const newBlog = await prisma.blogPost.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        media_url: req.body.media_url,
        authorId: req.id,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Successfully added a new blog",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
export const updateBlog = async (req, res) => {
  try {
    if (req.method !== "PUT") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    const updatedBlog = await prisma.blogPost.update({
      where: {
        id: req.id,
      },
      data: {
        title: req.body.title,
        content: req.body.content,
        media_url: req.body.media_url,
        authorId: req.id,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Successfully updated the blog",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
export const getBlog = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    const blogList = await prisma.blogPost.findMany({
      where: {
        id: req.id,
      },
    });
    return res.status(200).json({
      status: 200,
      list: blogList,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const deleteUser = await prisma.blogPost.delete({
      where: {
        id: req.id,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Blog delete successfull.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
