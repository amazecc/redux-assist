import { spawnSync } from "child_process";

export function exec(command: string) {
    const arrayCommand = command.split(" ");
    const result = spawnSync(arrayCommand[0], arrayCommand.slice(1), { stdio: "inherit" });
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }

    if (result.status !== 0) {
        console.error(`non-zero exit code returned, code=${result.status}, command=${command}`.red);
        process.exit(1);
    }
}
