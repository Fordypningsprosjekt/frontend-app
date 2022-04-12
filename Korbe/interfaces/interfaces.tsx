export interface IUser{
    first_name : string,
    last_name : string,
    email : string,
    city: string,
    farm_number: string,
    password: string
}

export interface IMaps{
    setAddedMap: () => void,
    addedMaps: string[];
}