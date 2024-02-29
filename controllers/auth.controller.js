import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const registration = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    const email_check = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (email_check) {
      return res.status(409).json({
        status: 409,
        message: "Try another email",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: req.body.email,
        email: req.body.email,
        password: password,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const checkEmail = await prisma.user.findMany({ where: { email: email } });
    if (checkEmail.length > 0) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        checkEmail[0].password
      );
      if (checkPassword) {
        const token = jwt.sign(
          {
            id: checkEmail[0].id,
            email: checkEmail[0].email,
          },
          process.env.JWT_TOKEN
        );

        return res.status(200).json({
          access_token: token,
          status: 200,
          message: "logged in",
        });
      } else {
        return res.status(401).json({
          status: 401,
          message: "Failed",
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: "Authentication failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
