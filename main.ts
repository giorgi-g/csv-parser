import {CSVParser} from "./src/lib/CSVParser";
import {CSVParserOptions} from "./src/types/CSVParserOptions.interface";

const cSVParserOptions: CSVParserOptions = {
    classPath: "../entities/Profile",
}

const csvParser = new CSVParser(
    "sample_profiles",
    cSVParserOptions,
);

const data = csvParser.Read().then((res: any) => {
    console.log('res', res);
})
