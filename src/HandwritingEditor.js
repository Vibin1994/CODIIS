import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import Share from 'react-native-share';
import CustomButton from './ReusableComponents/CustomButton';

const Sign = () => {
  const ref = useRef();
  const [size, setSize] = useState(1);
  const [image, setImage] = useState('');
  const [penColor, setPenColor] = useState('');

  const colorCode = [
    {
      id: 1,
      color: '#FF0000',
    },
    {
      id: 2,
      color: '#000000',
    },
    {
      id: 3,
      color: '#008000',
    },
    {
      id: 4,
      color: '#0000FF',
    },
    {
      id: 5,
      color: '#FFFF00',
    },
    {
      id: 6,
      color: '#FFC0CB',
    },
    {
      id: 7,
      color: '#7F00FF',
    },
  ];

  useEffect(() => {
    ref.current.changePenSize(size, size);
  }, [size]);

  const handleOK = signature => {
    setImage(signature);
  };
  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log('clear success!');
    setImage('');
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  const reducePenSize = () => {
    if (size > 1) {
      setSize(size - 1);
    }
  };

  const increasePenSize = () => {
    if (size < 5) {
      setSize(size + 1);
    }
  };

  const shareImage = () => {
    if (image != '') {
      let options = {
        title: 'Signature',
        message: 'Signature image shared',
        subject: 'Share information about signature details',
        url: image,
      };
      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
          alert(' Shared canceled');
        });
    } else {
      alert('No signature found');
    }
  };

  const redo = () => {
    if (image !== '') {
      ref.current.redo();
      ref.current.readSignature();
    } else {
      alert('No signature found');
    }
  };

  const draw = () => {
    ref.current.draw();
  };

  const erase = () => {
    if (image !== '') {
      ref.current.erase();
      ref.current.readSignature();
    } else {
      alert('No signature found');
    }
  };

  const undo = () => {
    if (image !== '') {
      ref.current.undo();
      ref.current.readSignature();
    } else {
      alert('No signature found');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPenColor(item.color);
          ref.current.changePenColor(item.color);
        }}>
        <View style={[styles.colorView, {backgroundColor: item.color}]} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.signatureView}>
        <SignatureScreen
          ref={ref}
          onEnd={handleEnd}
          onOK={handleOK}
          // onEmpty={handleEmpty}
          onClear={handleClear}
          confirmText={'Save'}
          descriptionText={'welcome'}
          imageType="image/png"
        />
      </View>
      <View style={styles.flatListView}>
        <FlatList
          data={colorCode}
          key={key => key.id}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
      <View style={styles.penColorView}>
        <Text style={styles.penColorText}>Pen color </Text>
        <View style={[styles.colorView, {backgroundColor: penColor}]} />
      </View>
      <View style={styles.buttonView}>
        <CustomButton title={'undo'} onPress={undo} />
        <CustomButton title={'Erase'} onPress={erase} />
        <CustomButton title={'Redo'} onPress={redo} />
        <CustomButton title={'Draw'} onPress={draw} />
        <View style={[styles.button, {alignItems: 'center'}]}>
          <TouchableOpacity
            disabled={size === 1 ? true : false}
            onPress={reducePenSize}>
            <Text style={styles.penSize}>-</Text>
          </TouchableOpacity>
          <Text style={styles.penSizeText}>Pen size {size}</Text>
          <TouchableOpacity
            disabled={size === 5 ? true : false}
            onPress={increasePenSize}>
            <Text style={styles.penSize}>+</Text>
          </TouchableOpacity>
        </View>
        <CustomButton title={'Share'} onPress={shareImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  signatureView: {height: 350},
  button: {width: 100, alignSelf: 'center', padding: 10},
  colorView: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: 'grey',
    marginHorizontal: 10,
  },
  buttonView: {flexDirection: 'row', flexWrap: 'wrap'},
  flatListView: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  penSize: {fontSize: 20, color: '#000'},
  penSizeText: {fontSize: 15, color: '#000'},
  penColorText: {alignSelf: 'center', color: '#000'},
  penColorView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Sign;
