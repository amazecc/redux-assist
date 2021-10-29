import "colors";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { exec } from "./utils";

const argv = yargs(hideBin(process.argv)).argv as any;

const type = argv._[0] as "patch" | "minor" | "major";

console.log("编译打包".green);
exec("rm -rf lib"); // 删除旧文件
exec("tsc -p tsconfig.build.json") // 编译生成 js 文件，类型声明文件
exec("babel lib --out-dir lib") // es6 -> es5, 添加 polyfills

console.log("设置新的版本号".green);
exec(`npm version ${type}`);

console.log("发布到 npm".green);
exec("npm publish");

console.log("推送代码到 github".green);
exec("git push origin master --follow-tags");
