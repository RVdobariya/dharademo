import { Manager } from "../models/manager.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const manager = {
    addManager: asyncHandler(async (req, res) => {
        const {
            companyName,
            managerName,
            manager_mo_no,
            reference,
            note } = req.body;

        const manager = await Manager.create({
            companyName,
            managerName,
            manager_mo_no,
            reference,
            note
        });

        const findUser = await Manager.findById(manager._id);

        if (!findUser) {
            throw new ApiError(400, "error");
        }

        return res.status(200).json(
            new ApiResponce(200, findUser, "success",)
        )
    }),

    getAllManager: asyncHandler(async (req, res) => {

        const manager = await Manager.find({});

        if (!manager || manager.length <= 0) {
            return res.status(400).json(
                { "message": "manager not founds" }
            )
        }

        return res.status(200).json(
            { "message": "manager fetch successfully", "data": manager }
        )
    }),

    getManager: asyncHandler(async (req, res) => {

        const managerId = req.params.id;

        console.log("magaer id == ", managerId)

        const manager = await Manager.findById(managerId);

        if (!manager) {
            return res.status(400).json(
                { "message": "manager not founds" }
            )
        }

        return res.status(200).json(
            { "message": "manager fetch successfully", "data": manager }
        )
    }),

    updateManager: asyncHandler(async (req, res, next) => {
        const managerId = req.params.id;

        const {
            companyName,
            managerName,
            manager_mo_no,
            reference,
            note } = req.body;

        let updateFields = {}

        if (companyName) updateFields.companyName = companyName;
        if (managerName) updateFields.managerName = managerName;
        if (manager_mo_no) updateFields.manager_mo_no = manager_mo_no;
        if (reference) updateFields.reference = reference;
        if (note) updateFields.note = note;


        const manager = await Manager.findByIdAndUpdate(managerId,
            {
                $set: updateFields
            },
            {
                new: true
            }
        )
        await manager.save();
        return res.status(200).json(
            new ApiResponce(200, manager, "success")
        )
    }),

    deleteManager: asyncHandler(async (req, res, next) => {
        const managerId = req.params.id;

        const manager = await Manager.findById(managerId);
        if (!manager) {
            return res.status(400).json({
                "message": "manager Not found"
            })
        }

        try {
            await manager.deleteOne();
        } catch (error) {
            return res.status(400).json({
                "message": "Something went wrong"
            })
        }

        return res.status(200).json({
            "message": "manager deleted successfully"
        })



    }),
}

export { manager };