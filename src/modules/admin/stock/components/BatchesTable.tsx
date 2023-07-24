import { Confirm, Divider, Flex, IconButton, Paper, Table, Text } from "src/components/ui"

import BatchesProducts from "./BatchesProducts"

import { formatProducts } from "../utils/functions"
import { floatToReal } from "src/utils/number.utils"
import { formatDateTime, formatUTCDateTime } from "src/utils/date.utils"

import { MdOutlineModeEditOutline } from "react-icons/md"
import { BsTrash } from "react-icons/bs"

import { useBatchesTable } from "../hooks/useBatchesTable"
import ModalBatch from "./ModalBatch"

const BatchesTable = () => {

  const {
    batchesTableData,
    closeConfirm,
    openConfirm,
    useConfirm,
    setModal,
    useModal,
    openModal
  } = useBatchesTable()

  return (
    <Paper>
      <Text size="lg" weight="500" color="gray_900">Lotes Cadastrados</Text>

      <Divider />

      <Table
        rows={5}
        columns={[
          { label: 'Lote', value: 'idx' },
          {
            label: 'Produtos',
            value: 'products',
            render: value => <BatchesProducts products={formatProducts(value.toString())} />
          },
          {
            label: 'Frete',
            value: 'shipping',
            align: 'right',
            render: value => <Text align="right" full>R$ {floatToReal(parseFloat(value.toString()))}</Text>
          },
          {
            label: 'Data',
            value: 'created_at',
            render: value => <Text>{formatDateTime(value.toString())}</Text>
          },
          { label: 'Anotações', value: 'notes' },
          {
            label: 'Ações',
            value: 'id',
            align: 'center',
            render: value => (
              <Flex justify="center" gap={10}>
                <IconButton color="blue_600" onClick={() => openModal(value.toString())}>
                  <MdOutlineModeEditOutline color="white" size={20} />
                </IconButton>
                <IconButton color="red_600" onClick={() => openConfirm(value.toString())}>
                  <BsTrash color="white" size={18} />
                </IconButton>
              </Flex>
            )
          }
        ]}
        data={batchesTableData}
      />

      <ModalBatch
        show={!!useModal?.id}
        data={useModal}
        onClose={() => setModal(null)}
      />

      <Confirm
        {...useConfirm}
        onClose={closeConfirm}
        onConfirm={closeConfirm}
      />
    </Paper>
  )
}

export default BatchesTable