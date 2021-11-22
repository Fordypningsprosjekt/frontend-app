import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { TextInput } from 'react-native-paper';


export default function DatePickerComponent(){
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    return(
        <>
        <TextInput mode='outlined' 
        label='Velg tidspunkt' 
        placeholder='Tidspunkt' 
        value={date.toLocaleString()} 
        onChange={date=>setDate(date)} //Fiks
        right={<TextInput.Icon name='calendar-range'  
        onPress={()=>setOpen(true)}/>}/>
        <DatePicker 
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
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