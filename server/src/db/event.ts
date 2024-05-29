import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  ownerId: { type: String, required: true },
  calendarId: { type: String, required: false },
});

export const EventModule = mongoose.model("Event", EventSchema);

export const createEvent = (values: Record<string, any>) =>
  new EventModule(values).save().then((event) => event.toObject());

export const getEventsForUser = (userId: String) => EventModule.find({ ownerId: userId });
export const getEventById = (id: string) => EventModule.findById(id);
