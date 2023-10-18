import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import GoogleStrategy from 'passport-google-oauth20'
import GithubStrategy from 'passport-github2'
import { compareSync as comparePasswords, hash } from 'bcrypt'
import FacebookStrategy from 'passport-facebook'
import morgan from 'morgan';
import { matchedData } from "express-validator"
import cors from 'cors'
import { ObjectId } from "mongodb"
import multer from "multer";


const app = express()
const Authenticator = passport
const json = express.json
const logger = morgan
const Router = express.Router
const static_dir = express.static
const upload = multer({ dest: '/uploads'})
const urlencoded = express.urlencoded

const uploadSingleFile = upload.single
const uploadMultipleFiles = upload.fields

export {
    app, 
    Authenticator, 
    comparePasswords,
    cors,
    FacebookStrategy,
    GoogleStrategy,
    GithubStrategy,
    hash,
    json, 
    LocalStrategy, 
    logger,
    matchedData,
    ObjectId, 
    Router, 
    static_dir,
    uploadMultipleFiles,
    uploadSingleFile,
    urlencoded, 
}