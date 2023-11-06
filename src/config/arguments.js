import { Command } from 'commander';

const program = new Command();

program
.option("-p <port>", "port", 8080)
.option("--persistence <persistence>","persistence","MONGO")
.option("--mode <mode>", "mode", "development");

program.parse();

export default program.opts();