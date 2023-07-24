import { UserType } from "src/services/api/users/users.types"
import { formatDate, formatDateValue } from "src/utils/date.utils"
import { formatCPF, formatPhone } from "src/utils/number.utils"

export const parseUserForm = (user: UserType) => {
  return {
    name: user.name,
    phone: user.phone ? formatPhone(user.phone) : '',
    rg: user.rg || '',
    cpf: user.cpf ? formatCPF(user.cpf) : '',
    username: user.username || '',
    password: '',
    notes: user.notes || '',
    initial_date: user.initial_date ? formatDateValue(user.initial_date, true) : '',
    active: user.active,
    address: user.address || '',
    cep: user.cep || '',
    state: user.state || '',
    city: user.city || '',
    neighborhood: user.neighborhood || '',
    complement: user.complement || '',
    roleId: user.role?.id || '',
    salesTeamId: user.salesTeamId
  }
}