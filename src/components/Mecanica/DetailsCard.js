import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";
import { useState, useContext } from "react";
import { MecanicaContext } from "../../context/mecanicas";
import { IoMdAddCircle } from "react-icons/io";


const searchType = {
  key: 'producto', value: 'Producto'
}

const fields = [
  { key: 'cod_marca', value: 'Codigo de Marca'},
  {key: 'marca', value: 'Marca'},
  {key: 'cod_proveedor', value: 'Codigo Proveedor'},
  {key: 'proveedor', value: 'Proveedor'},
  {key: 'descripcion', value: 'Descripcion'},
  {key: 'categoria', value: 'Categoria'},
  {key: 'codigo', value: 'Codigo'},
]

const operators = [
  { key: '=', value: 'igual'},
  { key: 'list', value: 'puede ser'},
  { key: 'like', value: 'como'},
  { key: '!=', value: 'no es igual'},
]

const DetailTable = () => {
  const { mechanic_detail = []} = useContext(MecanicaContext);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Inc/Exc</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Descripcion</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {mechanic_detail.map((detail) => (
          <TableRow key={detail.id}>
            <TableCell>{detail.includedText}</TableCell>
            <TableCell>{detail.typeText}</TableCell>
            <TableCell>{detail.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const ProductBonusTable = () => {
  const { mechanic_bonus } = useContext(MecanicaContext);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>% Descuento</TableCell>
          <TableCell>Cantidad</TableCell>
          <TableCell>Cantidad Max</TableCell>
          <TableCell>Prioridad</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {mechanic_bonus.map((detail) => (
          <TableRow key={detail.id}>
            <TableCell>{detail?.product?.name}</TableCell>
            <TableCell>{detail.percentageDiscount || "-"}</TableCell>
            <TableCell>{detail.bonusQuantity}</TableCell>
            <TableCell>{detail.bonusMax}</TableCell>
            <TableCell>{detail.priority}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const PriceListTable = () => {
  const { mechanic_entry } = useContext(MecanicaContext);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Tipo</TableCell>
          <TableCell>Lista de Precio</TableCell>
          <TableCell>Giro</TableCell>
        </TableRow>
      </TableHead>
      <TableBody></TableBody>
    </Table>
  );
};

export const DetailsCard = () => {
  const [activeTab, setActiveTab] = useState("detalle");
  const [open, setOpen] = useState(false);

  const handleChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ marginTop: 5 }}>
      <Card>

        <CardContent>
          <Button
            variant="contained"
            startIcon={<IoMdAddCircle />}
            sx={{ marginBottom: 2 }}
            onClick={handleOpen}
          >
            Agregar detalle
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Agregar 
         
        </DialogTitle>
        <DialogContent>
          <form>
            <Box
              sx={{ marginTop: 3 }}
              display="flex"
              flexDirection="column"
              gap={3}
            >
          
                <>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextField select label="Buscar">
                      {searchType.map((item) => (
                        <MenuItem key={item.key} value={item.key}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField select label="Campo">
                      {fields.map((item) => (
                        <MenuItem key={item.key} value={item.key}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField select label="Operador">
                      {operators.map((item) => (
                        <MenuItem key={item.key} value={item.key}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  <TextField label="Busqueda" fullWidth />

                </>




            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Guardar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
