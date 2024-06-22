import mongoose from "mongoose";

const TypicalEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  duration: { type: Number, required: true },
  ownerId: { type: String, required: true },
  calendarId: { type: String, required: false },
});

TypicalEventSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
TypicalEventSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const TypicalEventModule = mongoose.model("TypicalEvent", TypicalEventSchema);

export const createTypicalEvent = (values: Record<string, any>) =>
  new TypicalEventModule(values).save().then((typicalEvent) => typicalEvent.toObject());

export const getTypicalEventsForUser = (userId: String) => TypicalEventModule.find({ ownerId: userId });
export const getTypicalEventById = (id: string) => TypicalEventModule.findById(id);
