import role from "../models/role.js";

const admin = async (req, res, next) => {
  //En este punto tambien ya debio haber pasado por auth.js y ya user deberia tener datos
  const adminRole = await role.findById(req.user.roleId);
  if (!adminRole)
    //Por si algun motivo el roleId se encuentra vacio
    return res.status(400).send({ message: "Role no found" });

  return adminRole.name === "admin"
    ? next()
    : res.status(400).send({ message: "Unauthorized user" });
};

export default admin;
