const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const expressJwt = require("express-jwt");
const { executableSchema } = require("./graphql/Schemas/index");
require("dotenv").config();

const port = 4000;
const app = express();
app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

let apolloServer = null;
const startServer = async () => {
  apolloServer = new ApolloServer({
    schema: executableSchema,
    context: ({ req }) => {
      // console.log("Req User", req.user);
      // console.log("Req Auth Header", req.headers.authorization);
      const user = req.user || null;
      return { user };
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};

startServer();
app.listen({ port }, () => {
  console.log(
    `Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
});
