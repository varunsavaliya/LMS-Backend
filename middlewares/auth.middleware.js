import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 400));
  }

  const userDetail = jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetail;

  next();
};

const authorizedRoles =
  (...roles) =>
  (req, res, next) => {
    const currentRole = req.user.role;

    if (!roles.includes(currentRole)) {
      return next(
        new AppError("You do not have permission to access this route", 401)
      );
    }

    next();
  };

const authorizedSubscription = async (req, res, next) => {
  const userRole = req.user.role;
  const subscription = req.user.subscription;
  if (userRole !== "ADMIN" && subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route", 401));
  }
  next();
};

export { isLoggedIn, authorizedRoles, authorizedSubscription };
