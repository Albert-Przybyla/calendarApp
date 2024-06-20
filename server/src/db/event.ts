import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  start: {
    type: Date,
    required: true,
    get value(): Date {
      return new Date(this.start);
    },
    set value(v: Date) {
      this.start = v.toISOString();
    },
  },
  end: {
    type: Date,
    required: true,
    get value(): Date {
      return new Date(this.end);
    },
    set value(v: Date) {
      this.end = v.toISOString();
    },
  },
  ownerId: { type: String, required: true },
  calendarId: { type: String, required: false },
});

export const EventModule = mongoose.model("Event", EventSchema);

export const createEvent = (values: Record<string, any>) =>
  new EventModule(values).save().then((event) => event.toObject());

export const getEventsForUser = (userId: String) => EventModule.find({ ownerId: userId });
export const getEventById = (id: string) => EventModule.findById(id);
export const getEventsForUserbyDates = (userId: String, regStart: Date, reqEnd: Date) => {
  return EventModule.find({
    ownerId: userId,
    start: { $gte: regStart },
    end: { $lte: reqEnd },
  });
};
