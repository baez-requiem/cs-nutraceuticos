import {  Text } from './components/ui'
import Table from './components/ui/Table/Table'

function App() {

  return (
    <div className="App">
      <Table
        columns={[
          { label: 'ID', value: 'id' },
          { label: 'Nome', value: 'name' },
          { label: 'Age', value: 'age' },
          { label: 'Email', value: 'email' },
          { label: 'Status', value: 'status' },
        ]}
        data={[
          { id: 1, name: 'João', age: 30, email: 'joao@gmail.com', status: 'ativo' },
          { id: 2, name: 'Maria', age: 25, email: 'maria@gmail.com', status: 'inativo' },
          { id: 3, name: 'José', age: 40, email: 'jose@gmail.com', status: 'ativo' },
          { id: 4, name: 'Ana', age: 27, email: 'ana@gmail.com', status: 'inativo' },
          { id: 5, name: 'Pedro', age: 35, email: 'pedro@gmail.com', status: 'ativo' }
        ]}
        extraDataRender={data => (
          <Text>{JSON.stringify(data)}</Text>
        )}
      />
    </div>
  )
}

export default App
