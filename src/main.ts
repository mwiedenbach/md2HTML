/*--------------------------------------------------------------------------
 * Copyright(c) 2025 - 2026 Max Wiedenbach, All rights reserved.
 * Licensed under the MIT. See LICENSE.txt for details.
--------------------------------------------------------------------------*/

import fs from "fs";
import { generateHtmlBody } from "./generateHtmlBody";
import { configContent, loadConfigIfExists } from "./config/proccedConfig";
import { init } from "./config/defaultConfig";
import path from "path";

function printUsage(): void {
    console.error(`Usage: md2html <markdown file>`);
    console.error(`       md2html <markdown file> <output file>`);
    console.error(`       md2html init - creates a template config\n`);
    console.error(`       Or use the config file to set the options.`);
}

function resolveInputFile(cliInput: string | undefined): string {
    if (cliInput) return cliInput;
    if (configContent?.rootFile) return configContent.rootFile;

    printUsage();
    process.exit(1);
}

function resolveOutputPath(baseFile: string, cliOutput: string | undefined): string {
    return cliOutput ?? baseFile.replace(/\.md$/, ".html");
}

function convertMarkdownToHtml(markdown: string | Buffer): string {
    return Bun.markdown.html(markdown, {
        autolinks: configContent?.autolinks ?? true,
        strikethrough: configContent?.strikethrough ?? true,
        tasklists: configContent?.tasklists ?? true,
        tagFilter: configContent?.tagFilter ?? true,
        wikiLinks: configContent?.wikiLinks ?? true,
        headings: configContent?.headings ?? true,
        tables: configContent?.tables ?? true,
        underline: configContent?.underline ?? true,
    });
}

function main(): void {
    loadConfigIfExists();

    const [, , inputArg, outputArg] = process.argv;

    if (inputArg === "init") {
        init();
        process.exit(0);
    }

    if (!inputArg && !configContent?.rootFile) {
        printUsage();
        process.exit(1);
    }

    const inputFile = resolveInputFile(inputArg);
    const outputPath = resolveOutputPath(inputFile, outputArg);

    // Creates the output directory if not exists.
    const outputDirname: string = path.dirname(configContent?.outFile ?? outputPath);
    fs.mkdirSync(outputDirname, { recursive: true });

    const outputFile: string = configContent?.outFile ?? outputPath;

    if (!fs.existsSync(inputFile)) {
        console.error(`md2html ${inputFile}: Not found!`);
        process.exit(1);
    }

    const markdown = fs.readFileSync(inputFile);
    const html = convertMarkdownToHtml(markdown);

    const output = configContent?.fullHtml
        ? generateHtmlBody(outputPath, html)
        : html;

    fs.writeFileSync(outputFile, output);
}

main();

