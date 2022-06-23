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
import { detailConditional, detailtypes } from "../../utils/mecanicasCombos";

const DetailTable = () => {
  const { mechanic_detail } = useContext(MecanicaContext);

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
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Detalle" value="detalle" />
          <Tab label="Productos a Bonificar" value="bonificar" />
          <Tab label="Listas de Precios" value="precios" />
        </Tabs>

        <CardContent>
          <Button
            variant="contained"
            startIcon={<IoMdAddCircle />}
            sx={{ marginBottom: 2 }}
            onClick={handleOpen}
          >
            Agregar {activeTab === "detalle" && "detalle"}
            {activeTab === "bonificar" && "producto"}
            {activeTab === "precios" && "rubro"}
          </Button>

          {activeTab === "detalle" && <DetailTable />}

          {activeTab === "bonificar" && <ProductBonusTable />}

          {activeTab === "precios" && <PriceListTable />}
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Agregar {activeTab === "detalle" && "detalle"}
          {activeTab === "bonificar" && "producto"}
          {activeTab === "precios" && "rubro"}
        </DialogTitle>
        <DialogContent>
          <form>
            <Box
              sx={{ marginTop: 3 }}
              display="flex"
              flexDirection="column"
              gap={3}
            >
              {activeTab === "detalle" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextField select label="Inc/Exc">
                      {detailConditional.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField select label="Tipo">
                      {detailtypes.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  <TextField label="Busqueda" fullWidth />
                  <TextField label="Codigo" fullWidth disabled />
                  <TextField label="Articulo - Proveedor" fullWidth disabled />
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TextField
                  label="% Descuento"
                  type="number"
                  placeholder="0"
                  InputLabelProps={{ shrink: true, required: true }}
                />
                <TextField
                  label="Cantidad"
                  type="number"
                  placeholder="0"
                  InputLabelProps={{ shrink: true, required: true }}
                />
                <TextField
                  label="Cantidad Maxima"
                  type="number"
                  placeholder="0"
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </div>

              <TextField label="Producto" fullWidth InputLabelProps={{ shrink: true }}/>

              <TextField label="Prioridad" fullWidth InputLabelProps={{ shrink: true, required: true }} />


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
