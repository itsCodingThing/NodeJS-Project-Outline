const AdminUserModel = require("../../database/models/AdminUser");

exports.model = AdminUserModel;

exports.addAdminUser = async (data) => {
    const user = new AdminUserModel({
        name: data.name,
        email: data.email,
        contact: data.contact,
        password: data.password,
        created_by: data.created_by,
    });
    await user.save();

    return user.toObject();
};

exports.getAllAdminUsers = async () => {
    const list = await AdminUserModel.find({ deleted: false })
        .select("-deleted -password -created_by -updated_by -updated_at")
        .lean();
    return list;
};

exports.getAdminUserById = async (id = "") => {
    const user = await AdminUserModel.findById(id).lean({ autopopulate: true });
    return user;
};

exports.getAdminUserByEmail = async (email = "") => {
    const user = await AdminUserModel.findOne({ email, deleted: false }).lean();
    return user;
};

exports.removeAdminUserById = async ({ id, updated_by }) => {
    await AdminUserModel.findByIdAndUpdate(id, { deleted: true, updated_by: updated_by });
};
