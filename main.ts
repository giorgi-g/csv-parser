import CSVParser from "./src/utils/CSVParser";
import CSVParserOptions from "./src/interfaces/CSVParserOptions.interface";

class Run {
  private csvParser;

  constructor(
  ) {
    const fileName = "sample_profiles";

    const options: CSVParserOptions = {
      classPath: '../entities/Profile',
      classObjectGetterName: 'profile',
      // mapKeyIndexes: [15]
    };

    this.csvParser = new CSVParser(
        fileName,
        options,
    );

    this.csvParser.Read().then((data) => {
      data.forEach((item) => {
      })
    });
  }
}

const runnable = new Run();
