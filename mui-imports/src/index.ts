import type { Api } from '@codemod.com/workflow';

export async function workflow({ files }: Api) {
    await files('**/*.{ts,tsx}')
        .jsFam()
        // eslint-disable-next-line
        .astGrep("import { $$$IMPORTS } from '@mui/material';", async ({ replace, map }) => {
            const newImports: string[] = [];
            await map(async ({ getMultipleMatches }) => {
                // get all imports matched with $$$ selector
                const imports = getMultipleMatches('IMPORTS');
                // loop through inputs
                imports.forEach((node) => {
                    const text = node.text();
                    // ignore commas
                    if (text !== ',') {
                        newImports.push(`import ${text} from '@mui/material/${text}';`);
                    }
                });
            });
            await replace(newImports.join('\n'));
        });
}
