import React, {useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions, StyleProp, ViewStyle,
} from 'react-native';


type TouchPosition = {
  x?: number;
  y?: number;
}

interface PickerProps<T> {
  children: React.ReactNode;
  selectedValue: T;
  onValueChange: (value: T, index: number) => void;
  style: StyleProp<ViewStyle>
}

const { height } = Dimensions.get('window')

export function CustomPicker<T> ({children, selectedValue, onValueChange, style}: PickerProps<T>) {

  const [expanded, setExpanded] = useState(false);
  const [touchPosition, setTouchPosition] = useState<TouchPosition>({x: undefined, y: undefined});

  const openModal = (event: GestureResponderEvent) => {
    const x = event.nativeEvent.pageX;
    const y = event.nativeEvent.pageY;
    setTouchPosition({x, y})
    setExpanded(true)
  };

  const closeModal = () => {
    setTouchPosition({x: undefined, y: undefined})
    setExpanded(false)
  };


  const items = useMemo(() =>
      React.Children.toArray(children).map((child, index) =>
        <TouchableOpacity
          key={child.props.value}
          style={{padding: 16, borderBottomWidth: 1, borderColor: 'lightgrey'}}
          onPress={() => {
            onValueChange && onValueChange(child.props.value, index);
            closeModal()
          }}>
          <Text>{child.props.label}</Text>
        </TouchableOpacity>
      ),
    [children]);

  const showValue = useMemo(() => {
    console.log('Selected value is:', selectedValue)
    if (selectedValue) {
      return React.Children.toArray(children).find(child => child.props.value === selectedValue)?.props.label
    } else {
      return React.Children.toArray(children)[0]?.props.label
    }
  }, [selectedValue, children])

  const selectorHeight = useMemo(() => {
    const calculatedHeight = height - (touchPosition.y || 0) - 32;
    if (calculatedHeight < 200) {
      setTouchPosition(v => ({y: (v.y || 0) - 200}))
      return 0
    }
    return calculatedHeight
  }, [touchPosition])

  return(
    <>
      <TouchableOpacity
        onPress={openModal}
        style={[
          styles.outlinedInput,
          styles.inactiveBorder,
          {
            padding: 8,
            justifyContent: 'space-between'
          },
          style
        ]}>
        <Text accessibilityIgnoresInvertColors>{showValue}</Text>
      </TouchableOpacity>
      <Modal transparent visible={expanded} style={{backgroundColor: 'red', height: '100%'}}>
        <TouchableOpacity activeOpacity={1} onPress={closeModal} style={{width: '100%', height: '100%', backgroundColor: '#00000033', paddingHorizontal: 32}}>
          <View
            style={{
              width: '100%',
              maxHeight: selectorHeight,
              top: touchPosition.y
            }}>
            <ScrollView
              style={{
                borderRadius: 8,
                width: '100%',
                backgroundColor: 'white',
              }}>
              {items}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

interface ItemProps {
  label: string,
  value: string,
}

export const Item: React.VFC<ItemProps> = ({label}) => {
  return (
    <></>
  )
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 7,
    marginBottom: 15,
  },
  visibilityButton: {
    zIndex: 1,
    right: 10,
    position: 'absolute',
  },
  outlinedInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 10,
  },
  innerInput: {
    flexGrow: 1,
    color: 'black',
    height: 42,
  },
  inputShadow: {
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 2},
    height: 12,
  },
  activeBorder: {
    borderColor: 'grey',
  },
  searchActiveBorder: {
    borderColor: 'darkgrey',
  },
  inactiveBorder: {
    borderColor: 'lightgrey',
  },
  searchInactiveBorder: {
    borderColor: '#ffffff00',
  },
  errorBorder: {
    borderColor: 'red',
  },
});

