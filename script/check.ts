import "colors";
import { exec } from "./utils";

console.log("[Task: Git Add]".green);
exec("git add .");

console.log("[Task: Prettier Format]".green);
exec("prettier --config .prettierrc --write {src,test}/**/*.{ts,tsx}");

console.log("[Task: Compile Check]".green);
exec("tsc --noEmit");

console.log("[Task: EsLint]".green);
exec(`eslint --fix src/**/*.{ts,tsx,json}`);
