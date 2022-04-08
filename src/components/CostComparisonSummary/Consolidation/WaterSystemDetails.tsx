import React from 'react';
import InputSlider from '../../uiComponents/InputSlider';

const WaterSystemDetails = () => {
  return (
    <>
      <InputSlider minValue={0} maxValue={500} start={100} label="Number of Connections" />
      <InputSlider
        isCurrency={true}
        label="Pipeline Costs"
        start={155}
        incrementBy={5}
        inputAdornment={{ start: '$', end: 'per feet' }}
      />
      <InputSlider
        isCurrency={true}
        label="Connection Costs"
        start={6600}
        maxValue={100000}
        incrementBy={1000}
        inputAdornment={{
          start: '$',
          end: 'per connection'
        }}
      />
      <InputSlider
        isCurrency={true}
        label={`Admin & Legal Costs`}
        start={500}
        incrementBy={100}
        inputAdornment={{ start: '$' }}
      />
      <InputSlider
        label="contingency"
        maxValue={100}
        start={20}
        incrementBy={5}
        inputAdornment={{ end: '%' }}
      />
    </>
  );
};

export default WaterSystemDetails;
