import { useEffect, useState } from "react"
import type { Product } from "../models/product"
import Catalog from "../../features/catalog/Catalog"
import { Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material"
import NavBar from "./NavBar"

function App() {

  const [products, setProducts] = useState<Product[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const palletteType = darkMode ? 'dark' : 'light';

  const darkTheme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: (palletteType === 'light') ? '#eaeaea' : '#121212'
      }

    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  const addProduct = () => {
    setProducts(prevstate => [...prevstate, {
      id: prevstate.length + 1,
      description: 'Description of product ' + (prevstate.length + 1),
      pictureUrl: 'https://picsum.photos/200/300?random=' + (prevstate.length + 1),
      type: 'Type ' + (prevstate.length + 1),
      brand: 'Brand ' + (prevstate.length + 1),
      quantityStock: 10,
      name: 'Product ' + (prevstate.length + 1),
      price: (prevstate.length * 100) + 100
    }
    ])
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode}  />
        <Box sx={{minHeight: '100vh', background: darkMode ? 'radial-gradient(circle, #1e3aBa, #111B27)' : 
          'radial-gradient(circle, #baecf9, #f0f9ff)', py: 6}}>
          <Container maxWidth="xl" sx={{ marginTop: 8 }}>
            <Catalog products={products}></Catalog>
          </Container>
        </Box>

      </ThemeProvider>

    </>

  )
}

export default App
