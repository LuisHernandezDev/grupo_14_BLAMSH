import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function ProductsList() {
  const [productsList, setProductsList] = useState([])
  const [totalProducts, setTotalProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    console.log('Se montó el componente');

    async function productsListData() {

      try {
        const response = await fetch(`http://localhost:3011/api/products/list?page=${page}`);
        const data = await response.json();
        setProductsList(data)
        console.log(data);

      } catch (error) {
        console.log(error);
      }
    }
    productsListData();

    async function fetchTotalProducts() {
      try {
        const response = await fetch('http://localhost:3011/api/products');
        const data = await response.json();
        setTotalProducts(data.count);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTotalProducts();
  }, [page]);

  useEffect(() => {
    console.log("Se actualizó el componente");
  }, [productsList]);


  useEffect(() => {
    return () => console.log('Se desmontó el componente');

  }, []);

  const handleChangePage = (event, newPage) => {
    console.log("ésta aca handle")
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Id</StyledTableCell>
            <StyledTableCell align="right">Descripcion</StyledTableCell>
            <StyledTableCell align="right">Talles</StyledTableCell>
            <StyledTableCell align="right">Precio</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsList.map((product, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell> <img src={product.image} style={{ width: '50px', height: '50px' }} /></StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {product.name}
              </StyledTableCell>

              <StyledTableCell align="right">{product.id}</StyledTableCell>
              <StyledTableCell align="right">{product.description}</StyledTableCell>
              <StyledTableCell align="right">{product.sizes && product.sizes.length > 0
                ? product.sizes.map((size) => size.size).join(', ') : 'Talla no especificada'}</StyledTableCell>
              <StyledTableCell align="right">{'$' + product.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={totalProducts}
        rowsPerPage={5}
        page={page-1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  
  )
}

export default ProductsList;