export interface Element {
    customer: string;
    serialnumber: string;
    assettag: string;
    model: string;
    location: string;
    reclaimedtimestamp: string;
  }
  export interface DynamicTable{
    types: Array<Fields>; 
    tableName: string;
  }
export interface UnitDeploymentInquiry {
  tableName: string;
  data: Array<any>
}
export interface Validations {
    message: string;
    name: string;
    validator: string;
}
export interface Fields {
    type: string;
    label: string;
    name: string;
    id: string;
    class: string;
    currentdata?:string;
    array?: Array<string>;
    validator?: Array<string>;
}
export interface DynamicColumn {
    name: string;
    columnHeaderName: string;
    cell: any;
    type: string;
  }


  export interface DeviceType {
    tableName: string;
    data: Array<DeviceTypeArrayData>
  }

  export interface DeviceTypeArrayData{
    name: string;
    description: string;
    isactive: boolean;
    isdeleted: boolean;
  }

  export interface DeviceTypeMockDataAndTableData{
    mockData: DeviceType,
    tableData: DynamicTable
  }

  export interface ShipData {
    vesselId: string;
    vesselName: string;
    ircs?: string;
    countryCode: string;
    vesselStatus: string;
    grossTonnage?: number;
    hullNumber?: string;
    vesselType: string;
    jonesActEligible: boolean;
    disabledDate?: string;
  }