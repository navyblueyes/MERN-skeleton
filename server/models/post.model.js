import mongoose from 'mongoose'

// Focusing on ...
//  Post -- text [required]
//          photo [optional]
//          OP username [required]
//          Time created
//          Like --- Array of objects ---
//              consisting of...
//                     mongoose ObjectId /
//          Comment --- Array of object ---
//              consisting of ...
//                    text / creations data / OP userId

const PostSchema = new mongoose.Schema({

})

export default mongoose.model('Post', PostSchema)
