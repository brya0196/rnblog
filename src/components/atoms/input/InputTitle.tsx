import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { NativeBase, Textarea, View } from 'native-base';
import Colors from '../../../constants/Colors';

interface Props extends Partial<NativeBase.Textarea>{
  fontSize?: number;
  color?: 'default' | 'primary';
  bold?: 'bold' | 'normal';
  placeholder?: string;
  onChangeTextarea?: Function;
  defaultValue?: string;
}

const InputTextarea: React.FC<Props> = styled(Textarea)`
  color: ${(props: Props) => (props.color === 'default' ? Colors.primary : 'black')};
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '32px')};
  font-weight: ${(props: Props) => (props.bold ? props.bold : 'bold')};
`;

const InputTitle: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onChangeTextarea } = props;
  const [value, setValue] = useState('');
  const [row, setRow] = useState(2);

  const onTextAreaChangeHandler = useCallback((text: string) => {
    setValue(text);

    if (onChangeTextarea) {
      onChangeTextarea(text);
    }
  }, [setValue, onChangeTextarea]);

  const onScrollHandler = useCallback(() => {
    setRow((currentRow) => currentRow + 1);
  }, [setRow]);

  return (
    <View>
      <InputTextarea
        rowSpan={row}
        bordered
        underline
        value={value}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        fontSize={props.fontSize}
        color={props.color}
        bold={props.bold}
        onChangeText={onTextAreaChangeHandler}
        onScroll={onScrollHandler}
      />
    </View>
  );
};

export default InputTitle;
