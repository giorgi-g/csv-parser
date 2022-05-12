const fs = require("fs");

export class File {
    private readonly filePath: string = '';
    private readonly extension: string = 'txt';
    private readonly encoding: BufferEncoding = 'utf8';

    constructor(
        filePath: string,
        extension: string = 'txt',
        encoding: BufferEncoding = 'utf8',
    ) {
        this.filePath = filePath;
        this.extension = extension;
        this.encoding = encoding;
    }

    Read() {
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

    Write(data: any) {
        const arr = this.Read();
        arr.push(data);

        fs.writeFile(
            `${this.filePath}.${this.extension}`,
            JSON.stringify(arr),
            (err: any) => {
                if (err) return console.log(err);

                console.log(`Writing files inside ${this.filePath}.${this.extension} finished!`);
            });
    }
}
