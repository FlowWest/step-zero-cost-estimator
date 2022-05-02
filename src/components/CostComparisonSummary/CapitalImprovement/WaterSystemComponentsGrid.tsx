import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { updateConsolidationCostParams } from '../../../contexts/WaterSystem/actions';
const WaterSystemComponentsGrid = () => {
  //DUMMY DATA
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((res) => res.json())
      .then((data) => {
        setComponents(data);
        console.log(data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const [components, setComponents] = useState([]);

  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained">Add Components</Button>
      </Grid>
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
              {components &&
                components.map((component: { title: string; price: number }) => {
                  const randomInt = Math.floor(Math.random() * 10 + 1);
                  return (
                    <TableRow>
                      <TableCell>{randomInt}</TableCell>
                      <TableCell>{component?.title}</TableCell>
                      <TableCell>{component?.price}</TableCell>
                      <TableCell>{component?.price * 2}</TableCell>
                      <TableCell>{randomInt}</TableCell>
                      <TableCell>{1123.45}</TableCell>
                      <TableCell>{227.16}</TableCell>
                      <TableCell>{18.93}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Typography style={{ fontWeight: 600 }}>New Components</Typography>
      </Grid>
    </>
  );
};

export default WaterSystemComponentsGrid;
