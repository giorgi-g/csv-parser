import { CSVParserOptions } from "../types/CSVParserOptions.interface";
const getStream = require("get-stream");
const fs = require("fs");
const {
    DB_ENV,
    FILE_EXTENSION,
    FILES_DIR
} = require("../../config");
const { parse } = require("csv-parse");

export class CSVParser {
    private readonly fileName: string = '';
    private readonly mapKeyIndexes: number[] = [];
    private readonly mapKeySeparator: string = '-';
    private readonly classPath?: string | null;
    private readonly classObjectGetterName?: string | null;
    private readonly delimiter: string = ',';
    private readonly rootDir: string = FILES_DIR;
    private readonly rootEnv: string = DB_ENV;
    private readonly fileExtension: string = FILE_EXTENSION;

    constructor(
        fileName: string,
        options: CSVParserOptions,
    ) {
        this.fileName = fileName;
        if (options.mapKeyIndexes != null && options.mapKeyIndexes.length) this.mapKeyIndexes = options.mapKeyIndexes;
        if (options.mapKeySeparator != null && options.mapKeySeparator.length) this.mapKeySeparator = options.mapKeySeparator;
        if (options.classPath != null) this.classPath = options.classPath;
        if (options.classObjectGetterName != null) this.classObjectGetterName = options.classObjectGetterName;
        if (options.delimiter != null) this.delimiter = options.delimiter;
        if (options.rootDir != null) this.rootDir = options.rootDir;
        if (options.rootEnv != null) this.rootEnv = options.rootEnv;
        if (options.fileExtension != null) this.fileExtension = options.fileExtension;
    }

    rowToObject = (row: any[] = [], columns: any[] = []) => {
        const currentRow = {};

        row.forEach((item, index) => {
            // @ts-ignore
            currentRow[columns[index]] = item;
        });

        if (this.classPath != null) {
            const plug = require(this.classPath);
            const constructorName = Object.keys(plug)[0];
            const plugin = new plug[constructorName](currentRow);

            if (this.classObjectGetterName != null) {
                return plugin[this.classObjectGetterName];
            }

            return plugin;
        }

        return currentRow;
    };

    generateMapKey = (row: any[]) => {
        let mapKey = '';

        this.mapKeyIndexes.forEach((key: number, index: number) => {
            if (index !== this.mapKeyIndexes.length - 1) {
                mapKey += `${row[key]}${this.mapKeySeparator}`;
            } else {
                mapKey += row[key];
            }
        });

        return mapKey;
    }

    async Read (): Promise<Map<any, any>> {
        const filePath = `./${this.rootDir}/${this.fileName}_${this.rootEnv}.${this.fileExtension}`;

        const parseStream = parse({ delimiter: this.delimiter });

        const data: any[] = await getStream.array(
            fs.createReadStream(filePath).pipe(parseStream),
        );

        const columns = Object.values(data[0]);

        if (data.length && !this.mapKeyIndexes.length) {
            const rows: Map<number, any> = new Map();

            // @ts-ignore
            data.forEach((row: any[], rowIndex: number) => {
                if (rowIndex !== 0) {
                    const currentRow = this.rowToObject(row, columns);

                    rows.set(rowIndex - 1, currentRow);
                }
            });

            return rows;
        } if (data.length && this.mapKeyIndexes.length) {
            const rows: Map<any, any> = new Map();

            // @ts-ignore
            data.forEach((row: any[], rowIndex: number) => {
                if (rowIndex !== 0) {
                    const key = this.generateMapKey(row);

                    if (this.classPath == null) {
                        rows.set(key, {...row});
                    } else {
                        const currentRow = this.rowToObject(row, columns);
                        rows.set(key, currentRow);
                    }
                }
            });

            return rows;
        }

        return new Map<any, any>();
    };
}
