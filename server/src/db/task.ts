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
export const getTaskById = (id: string) => TaskModule.findById(id);
