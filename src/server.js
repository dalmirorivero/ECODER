import app from './app.js';
import program from './config/arguments.js';

const port = program.p
const environment = program.mode
const PORT = process.env.PORT || port

const ready = () => {
    console.log("mode: " + environment);
    console.log("Process id: ", process.pid)
    console.log("server ready on port: " + PORT);
};

 app.listen(PORT, ready)