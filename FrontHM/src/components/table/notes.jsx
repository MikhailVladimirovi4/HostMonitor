import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";


export default function Notes({ ipAddress, title, description, note, createdAt }) {

    console.log(ipAddress,title,description,note,createdAt)
  return (
    <tr>
      <td className="datatable">{createdAt}</td>
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