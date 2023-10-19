import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';
import { createRoom, deleteRoomById, getRoomByID, getRoomsAll, updateRoom, updateRoomAvailability } from '../controllers/room.js';


const router=express.Router();


//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/avail/:id",updateRoomAvailability);

//DELETE
router.delete("/:id/:hotelid",verifyAdmin, deleteRoomById);

//GET
router.get("/:id",getRoomByID);

//GET ALL
router.get("/",getRoomsAll);



export default router;