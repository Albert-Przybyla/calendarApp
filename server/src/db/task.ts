import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: String, required: true },
  ownerId: { type: String, required: true },
});

TaskSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
TaskSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const TaskModule = mongoose.model("Task", TaskSchema);

export const createTask = (values: Record<string, any>) =>
  new TaskModule(values).save().then((task) => task.toObject());
export const getTasksForUser = (userId: String) => TaskModule.find({ ownerId: userId });
export const getTasksForUserPaged = (userId: String, pageNumber: number = 1, pageSize: number = 10) => {
  const skip = (pageNumber - 1) * pageSize;
  return TaskModule.find({ ownerId: userId }).skip(skip).limit(pageSize).exec();
};
export const countTasksForUser = (userId: String) => TaskModule.countDocuments({ ownerId: userId });
export const getTaskById = (id: string) => TaskModule.findById(id);
