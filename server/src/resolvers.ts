import { IResolvers } from "apollo-server-express";
import { User } from "./entity/User";
import * as bcrypt from "bcryptjs";
export const resolvers: IResolvers = {
  Query: {
    me: ({ req }) => {
      // console.log(req.session.userId);
      if (!req.session.userId) {
        return null;
      }
      return User.findOne(req.session.userId);
    },
  },
  Mutation: {
    register: async (_, { firstName, lastName, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }).save();
      return true;
    },
    login: async (_, { email, password }, { req }) => {
      console.log(req);
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }
      req.session.userId = user.id;
      return user;
    },
  },
};
