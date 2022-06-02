import React, { useContext } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { ComponentProperties } from '../../../util/interfaces';

const WaterSystemComponentsGrid = () => {
  const [state, dispatch] = useContext(WaterSystemContext);

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
              {state?.existingComponents &&
                state?.existingComponents.map((component: ComponentProperties) => (
                  <TableRow>
                    <TableCell>{1}</TableCell>
                    <TableCell>{component?.component}</TableCell>
                    <TableCell>{`$${component?.unitCost}`}</TableCell>
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
              {state?.newComponents &&
                state?.newComponents.map((component: ComponentProperties) => (
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
