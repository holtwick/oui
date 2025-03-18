Test files should always end on `.spec.ts`. They are located in the same folder as the file that is tested.

Code indentation is 2 chars.

Prefer private variable to start with `_`.

Always use latest Vue3 with composition mode. Add imports for used components automatically.

For logging use `zeed` module logging feature which is imported like this: `import { Logger, LoggerInterface } from "zeed"`. The logger is set up like this: `const log: LoggerInterface = Logger("filename")`, where `filename` is the name of the current file without the suffix.

For CSS we use Stylus and `oui-kit`.

Commit messages should be lower case and should start with `feat:`, `fix:` or `chore:`. If only `package.json` has been update call it `chore: updated dependencies`.
