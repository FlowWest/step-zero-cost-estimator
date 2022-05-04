import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal
} from '@mui/material';
import { updateConsolidationCostParams } from '../../../contexts/WaterSystem/actions';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { ComponentProperties } from '../../../util/interfaces';

const WaterSystemComponentsGrid = () => {
  //DUMMY DATA
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((res) => res.json())
      .then((data) => {
        setComponents(data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const [state, dispatch] = useContext(WaterSystemContext);
  const [components, setComponents] = useState([]);
  const empty: Array<any> = [];

  return (
    <>
      <Grid item xs={12}>
        <Typography style={{ fontWeight: 600 }}>Existing Components</Typography>
      </Grid>

      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Qty</TableCell>
                <TableCell>Component</TableCell>
                <TableCell>Unit Cost</TableCell>
                <TableCell>Installed Cost</TableCell>
                <TableCell>Avg Life (Years)</TableCell>
                <TableCell>Annual Reserve</TableCell>
                <TableCell>Monthly Reserve</TableCell>
                <TableCell>Monthly Reserve per Customer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.existingComponents &&
                state.existingComponents.map((component: ComponentProperties) => (
                  <TableRow>
                    <TableCell>{component?.qty}</TableCell>
                    <TableCell>{component?.component}</TableCell>
                    <TableCell>{component?.unitCost}</TableCell>
                    <TableCell>{component?.installedCost}</TableCell>
                    <TableCell>{component?.avgLife}</TableCell>
                    <TableCell>{component?.annualReserve}</TableCell>
                    <TableCell>{component.monthlyReserve}</TableCell>
                    <TableCell>{component.monthlyReservePerCustomer}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Typography style={{ fontWeight: 600 }}>New Components</Typography>
      </Grid>

      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Qty</TableCell>
                <TableCell>Component</TableCell>
                <TableCell>Unit Cost</TableCell>
                <TableCell>Installed Cost</TableCell>
                <TableCell>Avg Life (Years)</TableCell>
                <TableCell>Annual Reserve</TableCell>
                <TableCell>Monthly Reserve</TableCell>
                <TableCell>Monthly Reserve per Customer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.newComponents &&
                state.newComponents.map((component: ComponentProperties) => (
                  <TableRow>
                    <TableCell>{component?.qty}</TableCell>
                    <TableCell>{component?.component}</TableCell>
                    <TableCell>{component?.unitCost}</TableCell>
                    <TableCell>{component?.installedCost}</TableCell>
                    <TableCell>{component?.avgLife}</TableCell>
                    <TableCell>{component?.annualReserve}</TableCell>
                    <TableCell>{component.monthlyReserve}</TableCell>
                    <TableCell>{component.monthlyReservePerCustomer}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default WaterSystemComponentsGrid;
