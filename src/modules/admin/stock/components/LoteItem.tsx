import { IconButton } from "src/components/ui";
import { StyledInput } from "./StyledInput";
import { FaTimes } from "react-icons/fa";

const LoteItem = () => (
  <tr>
    <td>
      <div>
        Viagra PLUS 12hrs
      </div>
    </td>
    <td>
      <div>
        <StyledInput type="number" placeholder="Ex: 100" />
      </div>
    </td>
    <td>
      <div>
        <StyledInput placeholder="Ex: 20,00" />
      </div>
    </td>
    <td>
      <div>
        <IconButton color="red_600">
          <FaTimes size={18} color="white" />
        </IconButton>
      </div>
    </td>
  </tr>
)

export default LoteItem