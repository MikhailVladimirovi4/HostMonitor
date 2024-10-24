import DeleteButton from "../buttons/deleteButton";
import EditButton from "../buttons/editButton";
import  moment  from "moment";
import "./table.css";

export default function Notes({
  ipAddress,
  title,
  description,
  note,
  createdAt,
}) {
  return (
    <tr>
      <td className="datatable">{moment(createdAt).format("DD/MM/YYYY")}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{ipAddress}</td>
      <td>{note}</td>
      <td>
        <EditButton />
      </td>
      <td>
        <DeleteButton />
      </td>
    </tr>
  );
}
