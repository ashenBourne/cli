import fs from "fs";
import consola from "./common.js"
const commitRE = /^(revert: )?(fix|ci|feat|docs|perf|task|test|types|style|build|chore|release|refactor|breaking change)(\(.+\))?: .{1,50}/;
const mergeRE = /Merge /;
export default function commitLint(gitParams) {
    const commitMsg = fs.readFileSync(gitParams, 'utf-8').trim();
    if (!commitRE.test(commitMsg) && !mergeRE.test(commitMsg)) {
        consola.error(`invalid commit message: "${commitMsg}".

Proper commit message format is required for automated changelog generation.

Examples: 

- fix: incorrect style
- feat: incorrect style
- docs: fix typo

Allowed Types:

- fix
- feat
- docs
- perf
- test
- types
- build
- chore
- release
- refactor
- breaking change
- Merge branch 'foo' into 'bar'
`);
        process.exit(1);
    }
}
