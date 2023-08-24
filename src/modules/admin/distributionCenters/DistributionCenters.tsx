import { PrivatePage } from "src/components/context"
import { Header } from "src/components/template"
import { Button, Divider, Flex, Paper } from "src/components/ui"
import { CentersList, EntryModal, LeaveModal, SupplyQuantityNoticeModal, TransferModal } from "./components"
import { useDistributionCenters } from "./hooks/useDistributionCenters"

const DistributionCenters = () => {

  const {
    modalProps,
    openModal,
    distributionCentersStock
  } = useDistributionCenters()

  return (
    <PrivatePage roles={['admin']}>
      <Header title="Centros de distribuição" />
      <Divider my={10} />
      <Paper>
        <Flex gap={10}>
          <Button color="green_600" size="sm" onClick={openModal('entry')}>Registrar entrada</Button>
          <Button color="blue_600" size="sm" onClick={openModal('transfer')}>Registrar transferência</Button>
        </Flex>
      </Paper>
      <Divider my={10} />
      <CentersList data={distributionCentersStock} openModal={openModal} />

      <TransferModal {...modalProps('transfer')} data={distributionCentersStock} />
      <LeaveModal {...modalProps('leave')} />
      <EntryModal {...modalProps('entry')} />
      <SupplyQuantityNoticeModal {...modalProps('supply')} />
    </PrivatePage>
  )
}

export default DistributionCenters