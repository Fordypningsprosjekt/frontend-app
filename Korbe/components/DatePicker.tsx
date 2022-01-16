import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { TextInput } from 'react-native-paper';

interface IDatePicker {
  dateOfTrip: Date;
  setDate: (date: Date)=>void;
}

export default function DatePickerComponent(props: IDatePicker){
    var { dateOfTrip, setDate } = props;
    const [open, setOpen] = useState(false);
 
    return(
        <>
        <TextInput mode='outlined' 
        label='Velg tidspunkt' 
        placeholder='Tidspunkt' 
        value={dateOfTrip.toLocaleString()} 
        onChange={()=>setDate(dateOfTrip)} //Fiks
        right={<TextInput.Icon name='calendar-range'  
        onPress={()=>setOpen(true)}/>}/>
        <DatePicker 
        modal
        open={open}
        date={dateOfTrip}
        onConfirm={(date) => {
            dateOfTrip = date
            setOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        locale='nb_NB'/>
        </>
    )
}