import moment from "moment";
import "./table.css";
import Button from "../buttons/button";
import Modal from "../modal/modal";


export default function Notes({
  id,
  ipAddress,
  title,
  description,
  note,
  createdAt,
}) {

function openModal({children}){
  <Modal>
    <h3>{children}</h3>
    <Button>Подтвердить</Button>
    <Button>Отмена</Button>
  </Modal>
}


  return (
    <tr>
      <td className="datatable">{moment(createdAt).format("DD/MM/YYYY")}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{ipAddress}</td>
      <td>{note}</td>
      <td>
        <Button onClick={openModal}>Edit</Button>
      </td>
      <td>
        <Button onClick={openModal}>Dell</Button>
      </td>
    </tr>
  );
}
