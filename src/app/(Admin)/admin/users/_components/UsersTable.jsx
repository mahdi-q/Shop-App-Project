import { usersTHeads } from "@/constants/tableHeads";
import UserRow from "./UserRow";

function UsersTable({users}) {
  return (
    <div className="table__layout">
      <table>
        <thead>
          <tr>
            {usersTHeads.map((item) => (
              <th key={item.id} className="table__th whitespace-nowrap">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <UserRow key={index} user={user} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UsersTable;
