import express from "express";


import Hotel from "../models/Hotel.js";
import { countByCity, countByType, createHotel, deleteHotelById, getHotelByID, getHotelRooms, getHotelsAll, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// only admin can create, edit and update hotel, everyone can get hotels

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id",verifyAdmin, deleteHotelById);

//GET
router.get("/find/:id",getHotelByID);

//GET ALL
router.get("/",getHotelsAll);

router.get("/countByCity",countByCity);
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms);


export default router;
