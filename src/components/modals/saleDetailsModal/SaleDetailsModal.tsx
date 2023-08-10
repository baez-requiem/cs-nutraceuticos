import { FC } from "react"
import { Divider, Grid, Modal, Text } from "src/components/ui"
import { Sale } from "src/services/api/logistic/logistic.types"
import { ProductField, TextField } from "./components"
import { getSaleDetails } from "./utils/mappers"
import { floatToReal } from "src/utils/number.utils"

export interface SaleDetailsModalProps {
  show: boolean
  onClose: () => void
  data?: Sale
}

const SaleDetailsModal: FC<SaleDetailsModalProps> = ({ show, onClose, data }) => {

  const { client, products, totalInProducts, discounts, totalSale } = getSaleDetails(data)

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">Informações da venda</Text>

      <Divider my={10} />

      <Text size="lg" weight="500">Dados do cliente</Text>
      <Divider />
      <Grid gap={10} template="1fr 1fr" sm="1fr">
        <TextField label="Nome:" value={client.name} />
        <TextField label="Telefone:" value={client.phone} />
        <TextField label="RG:" value={client.rg} />
        <TextField label="CPF:" value={client.cpf} />
        <TextField label="Email:" value={client.email} />
        <TextField label="CEP:" value={client.cep} />
        <TextField label="Estado:" value={client.state} />
        <TextField label="Cidade:" value={client.city} />
        <TextField label="Bairro:" value={client.neighborhood} />
        <TextField label="Endereço:" value={client.address} />
        <TextField label="Complemento:" value={client.complement} />
      </Grid>

      <Divider my={10} />

      <Text weight="500">Produtos</Text>
      <Divider />
      <Grid gap={10}>
        <Grid gap={5} template="4fr 2fr 1fr 2fr">
          <Text color="black">Nome</Text>
          <Text color="black" align="right">Valor Und.</Text>
          <Text color="black" align="right">Qntd.</Text>
          <Text color="black" align="right">Total</Text>
        </Grid>
        {products.map(product => (
          <ProductField key={`sdm-p-${product.name}`} {...product} />
        ))}
        <Divider my={0} opacityLine={.15} line />
        <Grid gap={5} template="1fr 1fr">
          <Text color="black">Desconto</Text>
          <Text color="red_600" align="right">R$ {floatToReal(discounts)}</Text>
        </Grid>
        <Divider my={0} opacityLine={.15} line />
        <Grid gap={5} template="1fr 1fr">
          <Text color="black">Total</Text>
          <Text color="black" align="right">R$ {floatToReal(totalSale)}</Text>
        </Grid>
        <Divider my={0} opacityLine={.15} line />
      </Grid>

      <Divider my={10} />

      <Text weight="500">Dados da venda</Text>
      <Divider />

    </Modal>
  )
}

export { SaleDetailsModal }