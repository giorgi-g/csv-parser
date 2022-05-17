const fs = require("fs");

export class File {
    private readonly filePath: string = '';
    private readonly extension: string = 'txt';
    private readonly encoding: BufferEncoding = 'utf8';
    private readonly jsonReplacer: any = null;
    private readonly jsonSpacer: string | number | undefined;

    constructor(
        filePath: string,
        extension: string = 'txt',
        encoding: BufferEncoding = 'utf8',
        jsonReplacer: any = null,
        jsonSpacer: string | number | undefined = 2,
    ) {
        this.filePath = filePath;
        this.extension = extension;
        this.encoding = encoding;
        this.jsonReplacer = jsonReplacer;
        this.jsonSpacer = jsonSpacer;
    }

    read = async () => {
        try {
            return JSON.parse(
                fs.readFileSync(
                    `${this.filePath}.${this.extension}`,
                    this.encoding
                )
            );
        } catch (err) {
            return [];
        }
    }

    clear = async () => await this.write([]);

    write = async (data: any[]) => fs.writeFile(
        `${this.filePath}.${this.extension}`,
        JSON.stringify(
            data,
            this.jsonReplacer,
            this.jsonSpacer
        ),
        (err: any) => {
            if (err) return console.log(err);
            console.log(`Writing files inside ${this.filePath}.${this.extension} finished!`);
        });
}
