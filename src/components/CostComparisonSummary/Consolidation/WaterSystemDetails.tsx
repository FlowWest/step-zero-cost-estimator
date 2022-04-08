import React, { useContext } from 'react';
import InputSlider from '../../uiComponents/InputSlider';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { updateConsolidationCostParams } from '../../../contexts/WaterSystem/actions';

const WaterSystemDetails = () => {
  const [state, dispatch] = useContext(WaterSystemContext);

  const updateWaterSystemDetails = (inputProperty: string, value: any) => {
    dispatch(
      updateConsolidationCostParams({
        [inputProperty]: value
      })
    );
  };
  return (
    <>
      <InputSlider
        minValue={0}
        start={state.currentWaterSystem?.connections}
        inputProperty="connections"
        label="Number of Connections"
        updateState={updateWaterSystemDetails}
      />
      <InputSlider
        isCurrency={true}
        inputProperty="pipelineCosts"
        label="Pipeline Costs"
        start={155}
        incrementBy={5}
        inputAdornment={{ start: '$', end: 'per feet' }}
        updateState={updateWaterSystemDetails}
      />
      <InputSlider
        isCurrency={true}
        inputProperty="connectionCosts"
        label="Connection Costs"
        start={6600}
        maxValue={100000}
        incrementBy={1000}
        inputAdornment={{
          start: '$',
          end: 'per connection'
        }}
        updateState={updateWaterSystemDetails}
      />
      <InputSlider
        isCurrency={true}
        inputProperty="adminLegalCosts"
        label={`Admin & Legal Costs`}
        start={285000}
        maxValue={1000000}
        incrementBy={100}
        inputAdornment={{ start: '$' }}
        updateState={updateWaterSystemDetails}
      />
      <InputSlider
        inputProperty="contingency"
        label="Contingency"
        maxValue={100}
        start={20}
        incrementBy={5}
        inputAdornment={{ end: '%' }}
        updateState={updateWaterSystemDetails}
      />
    </>
  );
};

export default WaterSystemDetails;
