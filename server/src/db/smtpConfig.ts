import mongoose from "mongoose";

const SmtpConfigSchema = new mongoose.Schema({
  host: { type: String, required: true },
  port: { type: String, required: true },
  secure: { type: Boolean, required: true },
  user: { type: String, required: true },
  password: { type: String, required: true },
  ownerId: { type: String, required: true },
});

SmtpConfigSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
SmtpConfigSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const SmtpConfigModule = mongoose.model("SmtpConfig", SmtpConfigSchema);

export const createSmtpConfig = (values: Record<string, any>) =>
  new SmtpConfigModule(values).save().then((SmtpConfig) => SmtpConfig.toObject());

export const getSmtpConfigForUser = (userId: String) => SmtpConfigModule.findOne({ ownerId: userId });
export const getSmtpConfigById = (id: string) => SmtpConfigModule.findById(id);
