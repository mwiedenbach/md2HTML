/*---------------------------------------------------------------
 * Copyright(c) 2025 - 2026 Max Wiedenbach, All rights reserved.
 * Licensed under the MIT. See LICENSE.txt for details.
 * Generates the body element of the File <head><body>…
---------------------------------------------------------------*/

export function generateHtmlBody(filename: string, html: string): string { 
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename}</title>
</head>
<body>
    ${html}
</body>
</html>
`;
}