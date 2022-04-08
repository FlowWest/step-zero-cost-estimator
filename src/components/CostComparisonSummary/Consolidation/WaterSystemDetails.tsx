import React from 'react';
import InputSlider from '../../uiComponents/InputSlider';

const WaterSystemDetails = () => {
  return (
    <>
      <InputSlider minValue={0} start={100} label="Number of Connections" />
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
        start={285000}
        maxValue={1000000}
        incrementBy={100}
        inputAdornment={{ start: '$' }}
      />
      <InputSlider
        label="Contingency"
        maxValue={100}
        start={20}
        incrementBy={5}
        inputAdornment={{ end: '%' }}
      />
    </>
  );
};

export default WaterSystemDetails;
