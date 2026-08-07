/*--------------------------------------------------------------------------
 * Copyright(c) 2025 - 2026 Max Wiedenbach, All rights reserved.
 * Licensed under the MIT. See LICENSE.txt for details.
--------------------------------------------------------------------------*/

import fs, { fdatasyncSync } from "fs";
import path from "node:path";

export const defaultConfig: string = `// Configuration file for Markdown to HTML converter
{
    "rootFile": "hello.md",     // Base file for the markdown input.
    "outFile": "docs/hello.md", // Set the output path for the html file.
    "fullHtml": true,           // Generates a complete HTML document (<html>, <head>, <body>) instead of an HTML fragment.
    "autolinks": true,          // Automatically converts URLs and email addresses into clickable links.
    "strikethrough": true,      // Enables ~~strikethrough~~ syntax.
    "tasklists": true,          // Enables GitHub-style task lists (- [ ] and - [x]).
    "tagFilter": true,          // Escapes or filters potentially unsafe raw HTML tags.
    "wikiLinks": true,          // Enables [[Wiki Link]] syntax.
    "headings": true,           // Enables Markdown heading syntax (#, ##, ###, ...).
    "tables": true,             // Enables GitHub-style pipe tables.
    "underline": true           // Enables underline syntax (parser-specific extension).
}`;

const configPath: string = path.join(process.cwd(), ".md2html", "settings.json");

/**
 * Generates a template config file.
 * @returns void 
 */
export function init(): void {
    try {
        fs.mkdirSync(path.dirname(configPath), { recursive: true });
        
        fs.writeFileSync(configPath, defaultConfig);
    } catch (err: unknown) {
        const error: Error = err instanceof Error ? err : new Error(String(err));
        console.error(error.message);
        process.exit(1);
    }
}