const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const AdminUserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        contact: { type: String, require: true },
        password: { type: String, required: true },
        deleted: { type: Boolean, default: false },
        created_by: { type: String, default: "" },
        updated_by: { type: String, default: "" },
    },
    { versionKey: false, timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = model("AdminUser", AdminUserSchema);
