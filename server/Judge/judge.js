import util from "util";
import fs from "fs";
import child_process from "child_process";

const writeFile = util.promisify(fs.writeFile);
const exec = util.promisify(child_process.exec);

export const judge = async (data) => {
  const { language, code, timeLimit, memoryLimit, mainTests } = data;
  let { fileName } = data;

  fileName += language == 0 ? ".c" : ".cpp";

  try {
    await writeFile("./Judge/tmp/" + fileName, code);
  } catch (error) {
    console.log(error.message);
    return { compilation: -1 };
  }

  const compileCmd = `./Judge/scripts/compile_script.sh ${fileName}`;

  try {
    await exec(compileCmd);
    // console.log("compilation done");
    const verdicts = new Array(mainTests.length);

    for (let i = 0; i < mainTests.length; i++) {
      const runCmd = `./Judge/scripts/runner_script.sh ${fileName} ${timeLimit} ${memoryLimit} "${mainTests[i].input}" "${mainTests[i].output}"`;
      try {
        await exec(runCmd);
      } catch (error) {
        verdicts[i] = error.code;
      }
    }
    await exec(`rm ./Judge/tmp/${fileName}*`);
    return { compilation: 0, verdicts };
  } catch (error) {
    await exec(`rm ./Judge/tmp/${fileName}*`);

    return {
      compilation: 1,
      errorMessage: error.stderr.replace(
        new RegExp(`./Judge/tmp/${fileName}:`, "g"),
        "Line: "
      ),
    };
  }
};

// const scode = `#include <iostream>\n using namespace std;\n int main(){ int t,a; cin>>t; while(t--) { cin>>a; cout<<a<<" "; } return 0; }`;

// (async () => {
//   console.log(
//     await judge({
//       fileName: "test",
//       language: 1,
//       code: scode,
//       timeLimit: 1,
//       memoryLimit: 100,
//       sampleTests: [{ input: "2 12 13", output: "12 14" }],
//       mainTests: [{ input: "2 156 125", output: "156 125" }],
//     })
//   );
// })();
