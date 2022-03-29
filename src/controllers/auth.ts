import { RequestHandler } from "express";

export const signUpUser: RequestHandler = async (req,res,next) => {
    console.log("Its working!!")
    res.status(200).json({message: "Starting!!"})
}