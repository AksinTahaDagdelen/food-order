import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction, deleteUserAction } from "../actions/userActions";

function UsersList() {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.getAllUsersReducer);
  const { users } = userState;

  useEffect(() => {
    dispatch(getAllUsersAction());
    console.log(users);
  }, [users]);
  return (
    <div>
      <div>
        <h3 className="text-dark my-3">Kullanıcı Listesi</h3>

        <table className="table table-hovered table-dark table-striped w-75 mx-auto">
          <thead>
            <tr>
              <th>Kullanıcı ID</th>
              <th>Adı</th>
              <th>Maili</th>
              <th>Operasyonlar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>
                  {user.name} <br />
                </td>
                <td>{user.mail}</td>
                <td>
                  <i
                    className="fa-solid fa-trash text-danger"
                    onClick={() => dispatch(deleteUserAction(user._id))}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
