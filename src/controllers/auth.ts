import { RequestHandler } from "express";

export const signUpUser: RequestHandler = async (req, res, next) => {
    console.log("Its working!!")
    return res.status(200).json({message: "Starting!!"})
}

export const signInUser: RequestHandler = async (req, res, next) => {
    return res.status(200).json({message: "Starting!!"})
}

export const editProfile: RequestHandler = async (req, res, next) => {
    return res.status(200).json({message: "Starting!!"})
}

export const rememberPassword: RequestHandler = async (req, res, next) => {
    return res.status(200).json({message: "Starting!!"})
}

export const deleteUser: RequestHandler = async (req, res, next) => {
    return res.status(200).json({message: "Starting!!"})
}