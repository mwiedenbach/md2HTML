/*--------------------------------------------------------------------------
 * Copyright(c) 2025 - 2026 Max Wiedenbach, All rights reserved.
 * Licensed under the MIT. See LICENSE.txt for details.
 * Reads the config file and handles the booleans.
--------------------------------------------------------------------------*/

import path from "path";
import fs from "fs";

interface Config {
    rootFile: string;
    outFile: string;
    fullHtml: boolean;
    autolinks: boolean;
    strikethrough: boolean;
    tasklists: boolean;
    tagFilter: boolean;
    wikiLinks: boolean;
    headings: boolean;
    tables: boolean;
    underline: boolean;
}

const configPath: string = path.join(process.cwd(), ".md2html", "settings.json");

export let configContent: Config | undefined = undefined;

export function loadConfigIfExists(): void { 
    if (fs.existsSync(configPath)) {
        try {
            /** JSON5 is used here to allow comments inside the JSON file. */
            configContent = Bun.JSON5.parse(fs.readFileSync(configPath, "utf-8")) as Config;
        } catch (err: unknown) {
            const error: Error = err instanceof Error ? err : new Error(String(err));
            console.error(error.message);
            process.exit(1);
        }
    }
}