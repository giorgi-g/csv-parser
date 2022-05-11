import CSVParser from "./src/utils/CSVParser";
import CSVParserOptions from "./src/interfaces/CSVParserOptions.interface";
import Sequelizer from "./src/utils/Sequelizer";
import {QueryTypes} from "sequelize";

class Run {
  private csvParser;

  constructor(
  ) {
    const fileName = "sample_profiles";

    const options: CSVParserOptions = {
      classPath: '../entities/Profile',
      classObjectGetterName: 'profile',
      mapKeyIndexes: [3]
    };

    this.csvParser = new CSVParser(
        fileName,
        options,
    );

    this.csvParser.Read().then((data) => {
      data.forEach((item, index) => {
        console.log(`>>> ${index} item: `, item);
      })
    });

    this.dbConnection("profile", 100, 0).then((response) => {
      console.log('>>> response from db:', response);
    }).catch((error) => {
      console.log('>>> error: ', error);
    });
  }

  dbConnection = async (schema?: string, limit: number = 0, offset: number = 0) => {
    const DB = Sequelizer(schema);
    return DB.query(`SELECT uuid, brand_id FROM 
                profile.profiles
            WHERE brand_id IS NOT NULL
            ORDER BY uuid DESC LIMIT ${limit} OFFSET ${offset}`,
        {
          type: QueryTypes.SELECT,
          logging: false,
        });
  }
}

new Run();
