import app from "./app.js";
import connectDb from "./config/db.js";
import config from "./config/index.js";

connectDb();

const Port = config.PORT || 3000;
const server = app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

export default server;
