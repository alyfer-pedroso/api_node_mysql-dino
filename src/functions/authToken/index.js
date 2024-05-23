export const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const expectedToken = process.env.TOKEN;
  if (token !== expectedToken) return res.sendStatus(403);

  next();
};
