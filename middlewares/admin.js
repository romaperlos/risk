export default (req, res, next) => {
  res.locals.isAdmin = req.session.user?.isAdmin;
  next();
};
