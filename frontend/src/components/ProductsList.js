import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
        </TableContainer>
/*
        <div>
            <h1>Listado de productos</h1>
            <ul className='product-list'>
                {productsList.length === 0 ? <p>Cargando...</p> : ""}
                {productsList.map((product, i) => {
                    return (
                        <li key={i} className="product-item">
                            <p>{product.id}</p>
                            <h3>{product.name}</h3>
                            <h3>{product.description}</h3>
                            <h3>{'$' + product.price}</h3>
                            <p>Tallas: {product.sizes && product.sizes.length > 0
                                ? product.sizes.map((size) => size.size).join(', ') : 'Talla no especificada'}
                            </p>
                            <img className='img-product-detail' src={product.image} alt="" />
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
            <button onClick={() => setPage(page + 1)} disabled={productsList.length === 0 || page * 5 >= totalProducts}>Siguiente</button>
        </div>
        */
    )
}

export default ProductsList;