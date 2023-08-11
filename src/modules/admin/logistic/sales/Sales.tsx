import { Header } from "src/components/template"
import { Divider, Flex, Paper, Private } from "src/components/ui"
import { useSales } from "./hooks/useSales"
import { MediasResume, SaleFilters, SaleTable, SalesTeamsResume, SellersResume } from "./components"
import { LogisticInfosHistoryModal, LogisticInfosModal, SaleModal } from "src/components/modals"


export const Sales = () => {

  const {
    tableData,
    statusOpts,
    usersOpts,
    openModalSale,
    openModalLogisticInfos,
    openModalHistory,
    useModal,
    closeModal,
    salePDF,
    sales,
    formik,
    productsOpts
  } = useSales()

  return (
    <Private roles={['admin']} logout>

      <Header title="Vendas" subtitle="Logística" />

      <Divider my={10} />

      <Paper>
        <Flex justify="end" gap={20}>
          <SaleFilters
            formik={formik}
            statusOpts={statusOpts}
            usersOpts={usersOpts}
            productsOpts={productsOpts}
          />
        </Flex>
      </Paper>

      <Divider my={10} />

      <Paper>
        <SaleTable
          data={tableData}
          openModalSale={openModalSale}
          openModalLogisticInfos={openModalLogisticInfos}
          openModalHistory={openModalHistory}
          salePDF={salePDF}
        />
      </Paper>

      <Divider my={10} />

      <SellersResume sales={sales} />
      
      <Divider my={10} />

      <SalesTeamsResume sales={sales} />
      
      <Divider my={10} />

      <MediasResume sales={sales} />

      <LogisticInfosModal
        show={useModal.show == 'logistic-infos'}
        data={useModal.data!}
        onClose={closeModal}
      />

      <LogisticInfosHistoryModal
        show={useModal.show == 'history'}
        data={useModal.data!}
        onClose={closeModal}
      />

      <SaleModal
        show={useModal.show == 'sale'}
        data={useModal.data!}
        onClose={() =>closeModal('sale')}
      />
    </Private>
  )
}

export default Sales