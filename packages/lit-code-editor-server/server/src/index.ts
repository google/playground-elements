import * as express from "express";
import {resolve as resolvePath} from "path";

const app = express();
const port = 3000;

app.use('/', express.static(resolvePath(__dirname, '..', '..', 'client')));

app.listen(port, () => console.log(`App listening on port ${port}`));