import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  //JWT se guarda en la variable token
  let token = req.header("Authorization");
  //Si no esta el token
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  //Separaremos Bearer del Token
  token = token.split(" ")[1];

  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  try {
    //user hace referencia al usuario que esta logueado en la app
    //verify para que sepamos si el token es nuestro
    //el process para verificar si la palabra clave también esta, para constar que si es nuestro
    req.user = jwt.verify(token, process.env.SK_JWT);
    //El que le indica que continue el proceso cuando ya valido el token y la clave
    next();
  } catch (error) {
        return res.status(400).send({ message: "Authorization denied: Invalid token" });
  }
};

export default auth;
