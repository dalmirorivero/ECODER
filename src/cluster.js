// PRACTICA CLASE 23/10 CLUSTER Y ESCALABILIDAD

import app from './app.js';
import program from './config/arguments.js';
import cluster from 'cluster';
import { cpus } from 'os';

const port = program.p
const PORT = process.env.PORT || port

const processor = cpus().length

 console.log(cpus());
 console.log(cpus().length);

 console.log(cluster.isPrimary);
 console.log(process.pid);

if(cluster.isPrimary) {
    for (let p=1; p<=(processor-4); p++){
        cluster.fork()
    }
} else { 
    app.listen(PORT, ready)
}