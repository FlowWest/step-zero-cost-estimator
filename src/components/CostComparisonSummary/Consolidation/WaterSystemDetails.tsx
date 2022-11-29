import React, { useContext } from 'react';
import InputSlider from '../../uiComponents/InputSlider';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { updateConsolidationCostParams } from '../../../contexts/WaterSystem/actions';

const WaterSystemDetails = () => {
  const [state, dispatch] = useContext(WaterSystemContext) as any;

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
        start={state?.consolidationCostParams?.connections}
        inputProperty="connections"
        label="Number of Connections"
        updateState={updateWaterSystemDetails}
      />
      <InputSlider
        isCurrency={true}
        inputProperty="feeCostPerConnection"
        label="Connection Fees"
        start={state.consolidationCostParams?.feeCostPerConnection}
        maxValue={50000}
        incrementBy={1000}
        inputAdornment={{
          start: '$',
          end: 'per connection'
        }}
        tooltipText="Fees charged by the receiving water system for each new connection"
        updateState={updateWaterSystemDetails}
      />
      <InputSlider
        minValue={0}
        maxValue={25000}
        start={state?.consolidationCostParams?.distance}
        inputProperty="distance"
        label="Distance to Receiving System"
        inputAdornment={{ end: 'feet' }}
        updateState={updateWaterSystemDetails}
      />
      <InputSlider
        isCurrency={true}
        inputProperty="pipelineCosts"
        label="Pipeline Costs"
        start={state?.consolidationCostParams?.pipelineCosts}
        incrementBy={5}
        inputAdornment={{ start: '$', end: 'per feet' }}
        updateState={updateWaterSystemDetails}
      />
      <InputSlider
        isCurrency={true}
        inputProperty="adminLegalCEQACosts"
        label={`Admin, Legal, & CEQA Costs`}
        start={state.consolidationCostParams?.adminLegalCEQACosts}
        maxValue={1000000}
        incrementBy={100}
        inputAdornment={{ start: '$' }}
        updateState={updateWaterSystemDetails}
      />
      <InputSlider
        inputProperty="contingency"
        label="Contingency"
        minValue={-100}
        maxValue={100}
        start={state?.consolidationCostParams?.contingency}
        incrementBy={5}
        inputAdornment={{ end: '%' }}
        tooltipText="Contingency value may range from -100% to 100%. Negative values can be used to help account for financial assistance such as loans, grants, subsidies, etc"
        updateState={updateWaterSystemDetails}
      />
    </>
  );
};

export default WaterSystemDetails;
