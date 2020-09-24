export default (req, res, next) => {
  if (req.session.user) res.locals.isAdmin = req.session.user.isAdmin
  next()
}
