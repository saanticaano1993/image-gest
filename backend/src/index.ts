import config from "./config";
import { mongoDbConnect } from "./lib/mongoose";
import app from "./server";

const port = config.PORT;

async function main() {
  await mongoDbConnect();

  app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );
}

main()
  .then()
  .catch(error => console.log("Error running the application:", error));
