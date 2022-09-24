import util from "util";
import fs from "fs";
import child_process from "child_process";

const writeFile = util.promisify(fs.writeFile);
const exec = util.promisify(child_process.exec);

export const judge = async (data) => {
  const {
    fileName,
    language,
    code,
    timeLimit,
    memoryLimit,
    sampleTests,
    mainTests,
  } = data;

  try {
    await writeFile(
      "./Judge/tmp/" + fileName + language == 0 ? ".c" : ".cpp",
      code
    );
  } catch (error) {
    console.log(error.message);
    return [-1, -1];
  }

  const compileCmd = `./Judge/scripts/compile_script.sh ${fileName}`;
  const testCases = sampleTests.concat(mainTests);

  try {
    await exec(compileCmd);
    verdicts = new Array(testCases.length);

    for (let i = 0; i < testCases.length; i++) {
      const runCmd = `./Judge/scripts/runner_script.sh ${fileName} ${timeLimit} ${memoryLimit} "${testCases[i].input}" "${testCases[i].output}"`;
      try {
        await exec(runCmd);
      } catch (error) {
        verdicts[i] = error.code;
      }
    }
    await exec(`rm ./Judge/tmp/${fileName}*`);
    return [0, verdicts];
  } catch (error) {
    await exec(`rm ./Judge/tmp/${fileName}*`);
    return [
      1,
      error.stderr.replace(
        new RegExp(`./Judge/tmp/${fileName}:`, "g"),
        "Line: "
      ),
    ];
  }
};

const scode = `#include <iostream>\n using namespace std;\n int main(){ int t,a; cin>>t; while(t--) { cin>>a; cout<<a<<" "; } return 0; }`;

(async () => {
  console.log(
    await judge({
      fileName: "test",
      language: 1,
      code: scode,
      timeLimit: 1,
      memoryLimit: 100,
      sampleTests: [{ input: "2 12 13", output: "12 13" }],
      mainTests: [{ input: "2 156 125", output: "156 125" }],
    })
  );
})();
