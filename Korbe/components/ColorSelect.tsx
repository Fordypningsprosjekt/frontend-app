import React from 'react';
import ColorPicker from 'react-native-color-picker-ios';
import RoundIconButton from './RoundIconButton/RoundIconButton';

interface ColorSelectProps{
  colors: string[];
  setColor: (color: string[]) => void;
}

export default function ColorSelect(props: ColorSelectProps){
  const {colors, setColor} = props;

  const handlePress = () => {
    ColorPicker.showColorPicker(
      { supportsAlpha: true, initialColor: 'cyan' },
      (color) => {
        setColor([...colors, color]);
      }
    );
  };

  return (
    <RoundIconButton buttonText='Trykk for å velge farge' iconName='shape-circle-plus' onPress={handlePress}/>
  );
};