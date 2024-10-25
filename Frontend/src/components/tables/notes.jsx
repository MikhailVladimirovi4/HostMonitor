import moment from "moment";
import "./table.css";
import Button from "../buttons/button";

export default function Notes({
  id,
  ipAddress,
  title,
  description,
  note,
  createdAt,
  onClick,
}) {
  return (
    <tr>
      <td className="datatable">{moment(createdAt).format("DD/MM/YYYY")}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{ipAddress}</td>
      <td>{note}</td>
      <td>
        <Button onClick={onClick}>Edit</Button>
      </td>
      <td>
        <Button onClick={onClick}>Dell</Button>
      </td>
    </tr>
  );
}
