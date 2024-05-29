import mongoose from "mongoose";

const CalendarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  ownerId: { type: String, required: true },
});

export const CalendarModule = mongoose.model("Calendar", CalendarSchema);

export const createCalendar = (values: Record<string, any>) =>
  new CalendarModule(values).save().then((calendar) => calendar.toObject());

export const getCalendarsForUser = (userId: String) => CalendarModule.find({ ownerId: userId });
export const getCalendarById = (id: string) => CalendarModule.findById(id);
