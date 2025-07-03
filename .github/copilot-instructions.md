Indentation is 2 chars.

Filenames are always in kebab-case, e.g. `my-component.vue`. 

Always use latest Vue3 with composition mode. Add imports for used components automatically.

For logging use Zeed's logging feature which is imported like this: `import { Logger, LoggerInterface } from "zeed"`. The logger is set up like this: `const log: LoggerInterface = Logger("filename")`, where `filename` is the name of the current file without the suffix.

For CSS we use Stylus and the presets from the `stylus` folder. Put the CSS in a file with the same name as the component, but with the suffix `.styl`. Import it in the component file.

Commit messages should be lower case and should start with `feat:`, `fix:` or `chore:`. If only `package.json` has been update call it `chore: updated dependencies`.

Don't fix linting errors, import order issues or other issues, that will not hinder the code from running. This will be done automatically by eslint after the code is committed.

Visible strings should be in a `t` or `tt` function. Import them using `import { t } from '@/basic/i18n'`. Translation files are not available in this project, therefore the `t` function is used differently than in other projects. The first argument is the fallback string in English, the second argument is the key for the translation, usually looking like this `oui.component.key`, where e. g. for a component named `OuiExample` and representing a button title it should look like `oui.example.buttonTitle`.

Test files should always end on `.spec.ts`. They are located in the same folder as the file that is tested. We have special file endings for tests that only run in the browser: `.browser.spec.ts`.

Files ending on `.tsx` contain JSX code. They always start with `/** @jsx h */` and usually have an `import` statement for `h` from `zeed-dom`. It is important to also have `const _ = h` in the file to make sure, the `h` function is not optimized away by the compiler.

Also take into account the hints from the `CONTRIBUTING.md` file in the root of the repository.
