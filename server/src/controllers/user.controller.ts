import { Request, Response } from "express";
import cloudinary from '../configs/cloudinary';
import User from "../models/User";


export const getCurrent = async (req: Request, res: Response): Promise<void> => {
    const userId = req?.user?._id
    const user = await User.findById(userId).select('-refreshToken -password -role')
    res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
}
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await User.find()
    res.status(200).json({
        success: users ? true : false,
        rs: users ? users : 'Users not found'
    })
}
export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
}
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { email, role, firstname, lastname, level, password } = req.body
    console.log(email, role, firstname, lastname, level);
    if (!id) throw new Error('Missing exercise id')
    if (!email || !role || !firstname || !lastname || !level || !password) {
        res.status(400).json({
            success: false,
            rs: 'Missing inputs'
        })
        return
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
}
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    if (!id) throw new Error('Missing exercise id')
    const user = await User.findByIdAndDelete(id)
    res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'Exercise not found'
    })
}
export const logout = async (req: Request, res: Response): Promise<void> => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) {
        res.status(400).json({ success: false, msg: 'No refresh token in cookies' });
        return
    }
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // chỉ secure trên production
        sameSite: 'strict',
        path: '/',   // phải khớp với path khi set cookie
    })
    res.status(200).json({
        success: true,
        mes: 'Logout successful'
    })
}
interface FileUploadResult {
    url: string;
    id: string;
}
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req?.user?._id
    if (!userId) {
        res.status(400).json({ message: 'User ID is missing' });
        return
    }

    if (!req.files) {
        res.status(400).json({ message: 'No files uploaded' })
        return
    }
    const files = req?.files as { [fieldname: string]: Express.Multer.File[] }
    const imageFile = files['image'][0]
    // const audioFile = files['audio'][0]
    try {
        const imageResult: FileUploadResult = await new Promise(
            (resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error) reject(error)
                        if (!result || !result.secure_url || !result.public_id) {
                            return reject(new Error('Cloudinary upload failed'));
                        }
                        resolve({
                            url: result?.secure_url,
                            id: result?.public_id,
                        })
                    }
                )
                stream.end(imageFile.buffer)
            }
        )
        // const audioResult = await new Promise(
        //     (resolve, reject) => {
        //         const stream = cloudinary.uploader.upload_stream(
        //             { resource_type: 'video' },
        //             (error, result) => {
        //                 if (error) reject(error)
        //                 resolve({
        //                     url: result?.secure_url,
        //                     id: result?.public_id,
        //                 })
        //             }
        //         )
        //         stream.end(audioFile.buffer)
        //     }
        // )

        const updatedUser = await User.findByIdAndUpdate(userId, { avatar: imageResult?.url }, { new: true })
        res.status(200).json({
            success: true,
            message: 'Uploaded avatar successfully',
            imageUrl: updatedUser,

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error uploading files' })
    }
}


