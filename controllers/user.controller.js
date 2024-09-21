import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/apiResponce.js";
import fs from "fs"


const registerUser = {
    register: asyncHandler(async (req, res) => {
        const {
            fullName,
            joinDate,
            after15DaysDate,
            mobileNo,
            companyName,
            managerName,
            manager_mo_no,
            course,
            cast,
            tryCount,
            tryList,
            isDone } = req.body;

        let tryData = JSON.parse(tryList)

        const profilePic = req.file?.path == undefined ? undefined : req.file.path

        const avatarImagPath = await uploadOnCloudinary(profilePic);

        if (!avatarImagPath) {
            return res.status(400).json(
                new ApiError(400, "Avatar image is must required")
            )
        }

        const users = await User.create({
            fullName,
            joinDate: Date.parse(joinDate),
            profileImage: avatarImagPath,
            after15DaysDate: Date.parse(after15DaysDate),
            mobileNo,
            companyName,
            managerName,
            manager_mo_no,
            course,
            cast,
            tryCount,
            tryList: tryData,
            isDone
        });

        const findUser = await User.findById(users._id);

        if (!findUser) {
            throw new ApiError(400, "error");
        }

        return res.status(200).json(
            new ApiResponce(200, findUser, "success",)
        )
    }),

    deleteUser: asyncHandler(async (req, res) => {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                "message": "user Not found"
            })
        }


        // await User.deleteOne(userId);
        await user.deleteOne();

        return res.status(200).json({
            "message": "user deleted successfully"
        })


    }),

    getUser: asyncHandler(async (req, res) => {

        const user = await User.find({});

        if (!user || user.length <= 0) {
            return res.status(400).json(
                { "message": "user not founds" }
            )
        }

        return res.status(200).json(
            { "message": "user fetch successfully", "data": user }
        )
    }),


    updateUser: asyncHandler(async (req, res, next) => {
        const userId = req.params.id;
        console.log("user Id === ", req.params.id)
        const {
            fullName,
            joinDate,
            after15DaysDate,
            mobileNo,
            companyName,
            managerName,
            manager_mo_no,
            course,
            cast,
            tryCount,
            tryList,
            isDone } = req.body;


        let updateFields = {}
        let avatarImagPath

        const profilePic = req.file?.path == undefined ? undefined : req.file.path
        // const coverImage = req.files?.coverImage[0]?.path;

        if (profilePic != undefined) {
            avatarImagPath = await uploadOnCloudinary(profilePic);
            // const coverImagPath = await uploadOnCloudinary(coverImage);
            if (!avatarImagPath) {
                return res.status(400).json(
                    new ApiError(400, "Avatar image is must required")
                )
            }
        }

        if (fullName) updateFields.fullName = fullName;
        if (joinDate) updateFields.joinDate = joinDate;
        if (after15DaysDate) updateFields.after15DaysDate = after15DaysDate;
        if (mobileNo) updateFields.mobileNo = mobileNo;
        if (companyName) updateFields.companyName = companyName;
        if (managerName) updateFields.managerName = managerName;
        if (manager_mo_no) updateFields.manager_mo_no = manager_mo_no;
        if (course) updateFields.course = course;
        if (cast) updateFields.cast = cast;
        if (tryCount) updateFields.tryCount = tryCount;
        if (tryList) updateFields.tryList = JSON.parse(tryList);
        if (isDone !== undefined) updateFields.isDone = isDone;
        if (avatarImagPath) updateFields.profileImage = avatarImagPath

        const user = await User.findByIdAndUpdate(userId,
            {
                $set: updateFields
            },
            {
                new: true
            }
        )
        await user.save();
        return res.status(200).json(
            new ApiResponce(200, user, "success")
        )
    }),

}


export { registerUser };