import mongoose, { Document } from "mongoose"

interface ICourse extends Document {
    name: string,
    thumbnail: string,
    category: {
        type: string,
        ref: "Category",
        required: true
    },
    tagline: string,
    description: string,
    student: string[],
    manager: {
        type: string,
        ref: "User",
        required: true
    },
    details: string[],
}

export class CourseSchemas {
    // Category Schema
    static CategorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        // relasi: satu category bisa punya banyak course
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }]
    }, {
        timestamps: true
    })

    // Course Schema
    static CourseSchema = new mongoose.Schema<ICourse>({
        name: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        tagline: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        student: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }],
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        details: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseDetail"
        }]
    }, {
        timestamps: true
    })



    // course detail 
    static CourseDetailSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["video", "text"],
            default: "video"
        },
        videoId: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    })
}

// Category Model
export const CategoryModel = mongoose.model("Category", CourseSchemas.CategorySchema)

// Course Model
export const CourseModel = mongoose.model("Course", CourseSchemas.CourseSchema)

// Course Detail Model
export const CourseDetailModel = mongoose.model("CourseDetail", CourseSchemas.CourseDetailSchema)
