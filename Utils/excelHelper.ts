//Import xlsx
import * as EXCEL from 'xlsx'
import fs from 'fs'


//define testdata structure

export interface TestRecord {
    Skill1: string,
    Skill2: string
}


//create method to read excel file

export function readExcelFile(filepath: string) {
    //Read excel file as binary string
    const file = fs.readFileSync(filepath)
    //parse into workbook
    const workbook = EXCEL.read(file)

    //Get First sheet
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    //convert sheet into json
    const rawdata: any[] = EXCEL.utils.sheet_to_json(sheet, { header: 1 })

    //convert raw data (json) into testrecords

    const records: TestRecord[] = rawdata.slice(1).map((column: any) => ({
        Skill1: column[0],
        Skill2: column[1]

    }))

    return records;

}

