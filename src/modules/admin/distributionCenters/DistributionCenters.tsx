import { PrivatePage } from "src/components/context"
import { Header } from "src/components/template"
import { Button, Divider, Flex, Paper } from "src/components/ui"
import { CentersList, DistributionCenterModal, EntryModal } from "./components"
import { useDistributionCenters } from "./hooks/useDistributionCenters"

const DistributionCenters = () => {

  const {
    modalProps,
    openModal
  } = useDistributionCenters()

  return (
    <PrivatePage roles={['admin']}>
      <Header title="Centros de distribuição" />
      <Divider my={10} />
      <Paper>
        <Flex gap={10}>
          <Button color="green_600" size="sm" onClick={openModal('entry')}>Registrar entrada</Button>
          <Button color="blue_600" size="sm" onClick={openModal('dc')}>Registrar transferência</Button>
          <Button color="amber_600" size="sm">Registrar extravio</Button>
        </Flex>
      </Paper>
      <Divider my={10} />
      <CentersList />

      <EntryModal {...modalProps('entry')} />
      <DistributionCenterModal {...modalProps('dc')} />
    </PrivatePage>
  )
}

export default DistributionCenters