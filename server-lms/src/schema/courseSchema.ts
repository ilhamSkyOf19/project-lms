import mongoose, { Document, Types } from "mongoose"
import userSchema from "./userSchema"


export interface ICourse extends Document {
    name: string;
    thumbnail: string;
    category: Types.ObjectId;   // ref: Category
    tagline: string;
    description: string;
    student: Types.ObjectId[];  // ref: User[]
    manager: Types.ObjectId;    // ref: User
    details: Types.ObjectId[];  // ref: CourseDetail[]
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
        },
        text: {
            type: String,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    })
}




// middleware update delete 
CourseSchemas.CourseSchema.post("findOneAndDelete", async (doc: ICourse) => {
    if (doc) {
        // hapus course di category
        await CategoryModel.findByIdAndUpdate(doc.category, {
            $pull: { courses: doc.id }
        });
        console.log("doc._id", doc._id);
        console.log("doc.category", doc.category, typeof doc.category);


        // delete detail model 
        await CourseDetailModel.deleteMany({ course: doc.id });

        // hapus relasi student
        for (const std of doc.student) {
            await userSchema.findByIdAndUpdate(std, {
                $pull: { course: doc._id }
            })
        }
    }
})


// Category Model
export const CategoryModel = mongoose.model("Category", CourseSchemas.CategorySchema)

// Course Model
export const CourseModel = mongoose.model("Course", CourseSchemas.CourseSchema)

// Course Detail Model
export const CourseDetailModel = mongoose.model("CourseDetail", CourseSchemas.CourseDetailSchema)

