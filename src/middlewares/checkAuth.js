export const checkAuth =
  (...users) =>
  async (req, res, next) => {
    const { userID } = req;
    if (!userID) {
      next(createHttpError(401));
      return;
    }

    const { user } = userID;
    if (users.includes(userID) && user === req.user._id) {
      const { contactId } = req.params;
      if (!contactId) {
        next(createHttpError(403));
        return;
      }

      const contact = await ContactsCollection.findOne({
        _id: contactId,
        userID: user._id,
      });

      if (contact) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };




