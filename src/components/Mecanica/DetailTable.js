import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MecanicaContext } from '../../context/mecanicas';

export const DetailTable = () => {
  const { mechanic_detail,removeDetailMechanic } = useContext(MecanicaContext);

  const handleDelete = (id) => {
    removeDetailMechanic(id)
  }
  

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Inc/Exc</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Cod</TableCell>
          <TableCell>Producto/Proveedor</TableCell>
          <TableCell>Fact</TableCell>
          <TableCell>Grup</TableCell>
          <TableCell>Eliminar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {mechanic_detail.map((detail) => (
          <TableRow key={detail.id}>
            <TableCell>{detail.includedText}</TableCell>
            <TableCell>{detail.typeText}</TableCell>
            <TableCell>{detail.codigo}</TableCell>
            <TableCell>{detail.descripcion}</TableCell>
            <TableCell>{detail.factor}</TableCell>
            <TableCell>{detail.grupo}</TableCell>
            <TableCell>
              <Button color="error" onClick={() => handleDelete(detail.id)}>
                <FaTrash/>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
