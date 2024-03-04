import cloudinary from "../config/cloudinary.config.js";
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
    const mediaFiles = req.files;
    let video_url = "";
    const newBlog = await prisma.blogPost.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        video_url: video_url,
        authorId: req.id,
      },
    });
    mediaFiles.images.forEach(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const uploadImage = await cloudinary.uploader.upload(dataURI, {
        upload_preset: process.env.UPLOAD_PRESET,
      });
      await prisma.blogImage.create({
        data: { image_url: uploadImage.url, blogId: newBlog.id },
      });
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
      relationLoadStrategy: 'join',
      include: {
        blogImages: true,
        author:{
          select:{
            id:true,
            name:true,
          }
        },
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
export const getOwnBlog = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    const OwnBlogList = await prisma.blogPost.findMany({
      where: {
        authorId: req.id,
      },
      relationLoadStrategy: 'join',
      include: {
        blogImages: true,
        author:{
          select:{
            id:true,
            name:true,
          }
        },
      },
    });
    return res.status(200).json({
      status: 200,
      list: OwnBlogList,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
export const readFullBlog = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    const blogDetail = await prisma.blogPost.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      relationLoadStrategy: 'join',
      include: {
        blogImages: true,
        author:{
          select:{
            id:true,
            name:true,
          }
        },
      },
    });
    return res.status(200).json({
      status: 200,
      detail: blogDetail,
    });
  } catch (error) {
    console.log(error)
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
