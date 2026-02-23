export const metadata = {
  title: 'OmniaTools - Herramienta para Vendedores Inmobiliarios',
  description: 'Gestiona propiedades, clientes y ventas de bienes raíces',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
