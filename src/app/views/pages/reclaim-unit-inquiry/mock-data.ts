import {DynamicTable, UnitDeploymentInquiry,Validations,Fields} from '../../interface/interface';

export const UnitDeploymentInquiryTableData: DynamicTable = {
  types: [{type: "text", label: "Customer",name: "customer", id: "customer", class:"Customer"},
          {type: "number", label: "Serial Number",name: "serialnumber", id: "serialnumber", class:"serialnumber"},  
          {type: "select", label: "Device Type",name: "devicetype", id: "devicetype", class:"devicetype"}, 
          {type: "select", label: "Location",name: "location", id: "location", class:"location"}, 
          {type: "select", label: "Industry",name: "industry", id: "industry", class:"industry"}, 
          {type: "select", label: "Client Type",name: "clienttype", id: "clienttype", class:"clienttype"}, 
          {type: "select", label: "User Type",name: "usertype", id: "usertype", class:"usertype"}, 
          {type: "datepicker", label: "Date Created",name: "datecreated", id: "datecreated", class:"datecreated"},
          {type: "number", label: "Rating",name: "rating", id: "rating", class:"rating"},  
         ],
  tableName: "UnitDeploymentInquiry"
}


export const UnitDeploymentInquiryMockData: UnitDeploymentInquiry = {
tableName: "UnitDeploymentInquiry",
data: [
  {customer: "Kansas University", serialnumber: 125, assettag: 'Z', devicetype: 'Printer', location: 'Los Angeles', industry: 'Marketing', clienttype: 'Flatterbut', usertype: 'IT Manager',datecreated: new Date("4/26/2020"), rating: 5},
  {customer: "Texas University", serialnumber: 213, assettag: 'W', devicetype: 'Printer', location: 'Los Angeles', industry: 'Marketing', clienttype: 'Flatterbut', usertype: 'IT Manager',datecreated: new Date("5/26/2020"), rating: 4},
  {customer: "Jose Rizal University", serialnumber: 154, assettag: 'X', devicetype: 'Laptop', location: 'Chicago', industry: 'Marketing', clienttype: 'Flatterbut', usertype: 'IT Manager',datecreated: new Date("6/26/2020"), rating: 3},
  {customer: "San Beda University", serialnumber: 175, assettag: 'Y', devicetype: 'Laptop', location: 'Chicago', industry: 'Marketing', clienttype: 'H8tr', usertype: 'Medical Representative',datecreated: new Date("7/26/2020"), rating: 2},
  {customer: "Mapua University", serialnumber: 163, assettag: 'K', devicetype: 'Mouse', location: 'Oklahoma', industry: 'Advertising', clienttype: 'H8tr', usertype: 'Medical Representative',datecreated: new Date("4/26/2020"), rating: 1},
  {customer: "University of Philippines", serialnumber: 126, assettag: 'O', devicetype: 'Video Card', location: 'Oklahoma', industry: 'Advertising', clienttype: 'H8tr', usertype: 'Medical Representative',datecreated: new Date("4/26/2020"), rating: 5},
  {customer: "Far Eastern University", serialnumber: 127, assettag: 'P', devicetype: 'Video Card', location: 'Boston', industry: 'Advertising', clienttype: 'H8tr', usertype: 'Product Manager',datecreated: new Date("4/26/2020"), rating: 2},
  {customer: "Ateneo De Manila University", serialnumber: 232, assettag: 'Q', devicetype: 'Video Card', location: 'Boston', industry: 'Sales', clienttype: 'Holy Grail', usertype: 'Product Manager',datecreated: new Date("4/26/2020"), rating: 3},
  {customer: "De La Salle University", serialnumber: 122, assettag: 'R', devicetype: 'Video Card', location: 'Milwaukee', industry: 'Sales', clienttype: 'Holy Grail', usertype: 'Product Manager',datecreated: new Date("4/26/2020"), rating: 3},
  {customer: "University of Sto.Tomas", serialnumber: 177, assettag: 'S', devicetype: 'Video Card', location: 'Milwaukee', industry: 'Sales', clienttype: 'Holy Grail', usertype: 'Product Manager',datecreated:new Date("4/26/2020"), rating: 4},
]
} 



export const DeviceTypeTableColumn: DynamicTable = {
  types: [{type: "text", label: "Name",name: "name", id: "name", class:"name"},
  {type: "text", label: "Description",name: "description", id: "description", class:"description"},  
  {type: "toggle", label: "Active",name: "isactive", id: "isactive", class:"isactive"}, 
],
  tableName: "DeviceType"
}

export const DeviceTypeMockData: UnitDeploymentInquiry = {
  tableName: "DeviceType",
  data: [
    {name: "Printer", description: "A2A", isactive: true},
    {name: "Modems", description: "B2B", isactive: false},
    {name: "Laptop", description: "C2C", isactive: true},
    {name: "Cellphone", description: "D2D", isactive: true},
    {name: "Monitor", description: "E2E", isactive: true},
    {name: "Mouse", description: "F2F", isactive: true},
    {name: "Projector", description: "G2G", isactive: true},
    {name: "Video Card", description: "H2H", isactive: true},
    {name: "Sound Card", description: "I2I", isactive: true},
    {name: "HeadPhones", description: "J2J", isactive: true},
  ]} 
  
  export const LocationTableColumn: DynamicTable = {
    types: [{type: "text", label: "Name",name: "name", id: "name", class:"name"},
    {type: "text", label: "Description",name: "description", id: "description", class:"description"},  
    {type: "toggle", label: "Active",name: "isactive", id: "isactive", class:"isactive"}, 
  ],
    tableName: "Location"
  }
  
  export const LocationMockData: UnitDeploymentInquiry = {
    tableName: "Location",
    data: [
      {name: "Los Angeles", description: "A2A", isactive: true},
      {name: "Philadelphia", description: "B2B", isactive: false},
      {name: "Oklahoma", description: "C2C", isactive: true},
      {name: "New York", description: "D2D", isactive: true},
      {name: "Boston", description: "E2E", isactive: true},
      {name: "Toronto", description: "F2F", isactive: true},
      {name: "San Antonio", description: "G2G", isactive: true},
      {name: "Golden State", description: "H2H", isactive: true},
      {name: "Milwaukee", description: "I2I", isactive: true},
      {name: "Chicago", description: "J2J", isactive: true},
    ]} 
    
    export const IndustryTableColumn: DynamicTable = {
      types: [{type: "text", label: "Name",name: "name", id: "name", class:"name"},
      {type: "text", label: "Description",name: "description", id: "description", class:"description"},  
      {type: "toggle", label: "Active",name: "isactive", id: "isactive", class:"isactive"}, 
    ],
      tableName: "Industry"
    }
    
    export const IndustryMockData: UnitDeploymentInquiry = {
      tableName: "Industry",
      data: [
        {name: "Production", description: "A2A", isactive: true},
        {name: "Technology", description: "B2B", isactive: false},
        {name: "Marketing", description: "C2C", isactive: true},
        {name: "Goods", description: "D2D", isactive: true},
        {name: "Transport", description: "E2E", isactive: true},
        {name: "Sales", description: "F2F", isactive: true},
        {name: "Manufacturing", description: "G2G", isactive: true},
        {name: "Golden State", description: "H2H", isactive: false},
        {name: "Advertising", description: "I2I", isactive: true},
        {name: "Finance", description: "J2J", isactive: true},  
      ]} 
      export const ClientTypeTableColumn: DynamicTable = {
        types: [{type: "text", label: "Name",name: "name", id: "name", class:"name"},
        {type: "text", label: "Description",name: "description", id: "description", class:"description"},  
        {type: "toggle", label: "Active",name: "isactive", id: "isactive", class:"isactive"}, 
      ],
        tableName: "ClientType"
      }
      
      export const ClientTypeMockData: UnitDeploymentInquiry = {
        tableName: "ClientType",
        data: [
          {name: "Gabbo", description: "A2A", isactive: true},
          {name: "Lumberg", description: "B2B", isactive: false},
          {name: "Flatterbut", description: "C2C", isactive: true},
          {name: "Jessie Spano", description: "D2D", isactive: true},
          {name: "BTJ", description: "E2E", isactive: true},
          {name: "DEFCON 1", description: "F2F", isactive: true},
          {name: "H8tr", description: "G2G", isactive: true},
          {name: "T-800", description: "H2H", isactive: true},
          {name: "Brainy Smurf", description: "I2I", isactive: true},
          {name: "Holy Grail", description: "J2J", isactive: true},  
        ]} 

        export const UserTypeTableColumn: DynamicTable = {
          types: [{type: "text", label: "Name",name: "name", id: "name", class:"name"},
          {type: "text", label: "Description",name: "description", id: "description", class:"description"},  
          {type: "toggle", label: "Active",name: "isactive", id: "isactive", class:"isactive"}, 
        ],
          tableName: "UserType"
        }
        
        export const UserTypeMockData: UnitDeploymentInquiry = {
          tableName: "UserType",
          data: [
            {name: "Admin", description: "A2A", isactive: true},
            {name: "Account Manager", description: "B2B", isactive: true},
            {name: "Fleet Manager", description: "C2C", isactive: true},
            {name: "HR", description: "D2D", isactive: true},
            {name: "Sales Manager", description: "E2E", isactive: true},
            {name: "Product Manager", description: "F2F", isactive: true},
            {name: "IT Manager", description: "G2G", isactive: true},
            {name: "Sales Representative", description: "H2H", isactive: true},
            {name: "Medical Representative", description: "I2I", isactive: true},
            {name: "District", description: "J2J", isactive: true},
          ]} 
