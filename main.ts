import {CSVParser} from "./src/lib/CSVParser";
import {CSVParserOptions} from "./src/types/CSVParserOptions.interface";
import {Profile} from "./src/entities/Profile";
import {File} from "./src/lib/File";

const cSVParserOptions: CSVParserOptions = {
    classPath: "../entities/Profile",
    mapKeyIndexes: [1],
    mergeMapKeyValues: true,
}

const csvParser = new CSVParser(
    "sample_profiles",
    cSVParserOptions,
);

csvParser.Read().then(async (response: any) => {
    const filePath = './src/logs/every-tenth-id';
    const everyTenthProfile: any[] = [];
    const file = new File(filePath);

    response.forEach((item: Profile | Profile[], index: number) => {
        if (Array.isArray(item)) {
            console.log('item', item);
        } else {
            if (item.profile.id % 100 === 0) {
                everyTenthProfile.push(item.profile);
            }

            if (index === response.size - 1) {
                file.write(everyTenthProfile).then(() => {
                    file.read().then(r => {
                        console.log('r', r);
                    })
                });
            }
        }
    });
}).catch((err: any) => {
    console.log('err', err);
});
