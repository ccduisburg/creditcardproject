import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";

import { User } from "./entity/User";

import { stripe } from "./stripe";

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
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
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }
      //console.log(user.id);
      console.log(req.session.userId);
      req.session.userId = user.id;
      return user;
    },
    createSubscription: async (_, { source }, { req }) => {
      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }
      const user = await User.findOne(req.session.userId);
      if (!user) {
        throw new Error("");
      }
      const customer = await stripe.customers.create({
        email: user.email,
        source,
      });
      user.stripeId = customer.id;
      user.type = "paid";
      await user.save();
      return user;
    },
  },
};
