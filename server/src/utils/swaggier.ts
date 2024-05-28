import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Application, Request, Response } from "express";

const PORT = process.env.PORT || 8080;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Calendar App",
      version: "1.0.0",
      description: "Nice app",
      contact: {
        name: "Albert Przybyła",
        email: "albert.przybyla2@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["../router/*.ts"],
};

const specs = swaggerJSDoc(options);

function swaggerDocs(app: Application): void {
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
}

export default swaggerDocs;
