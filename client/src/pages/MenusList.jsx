import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBurgers, deleteBurgerAction } from "../actions/burgerActions";

function MenusList() {
  const dispatch = useDispatch();

  const burgerState = useSelector((state) => state.getAllBurgersReducer);
  //   const deleteBurgerState = useSelector((state) => state.deleteBurgerReducer);

  const { burgers } = burgerState;
  //   const { success } = deleteBurgerState;

  useEffect(() => {
    dispatch(getAllBurgers());
  }, [burgers]);
  return (
    <div>
      <h3 className="text-dark my-3">Menü Listesi</h3>

      <table className="table table-hovered table-dark table-striped w-75 mx-auto">
        <thead>
          <tr>
            <th>Menü Adı</th>
            <th>Menü Fiyatı</th>
            <th>Menü Kategorisi</th>
            <th>Operasyonlar</th>
          </tr>
        </thead>
        <tbody>
          {burgers.map((burger) => (
            <tr>
              <td>{burger.ad}</td>
              <td>
                Small: {burger.fiyat[0]["small"]} <br />
                Medium: {burger.fiyat[0]["medium"]} <br />
                Mega: {burger.fiyat[0]["mega"]} <br />
              </td>
              <td>{burger.kategori}</td>
              <td>
                <i
                  className="fa-solid fa-trash text-danger"
                  onClick={() => dispatch(deleteBurgerAction(burger._id))}
                  style={{ cursor: "pointer" }}
                />
                <Link to={`/admin/editmenu/${burger._id}`}>
                  <i className="fa-solid fa-pen-to-square text-info mx-2" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenusList;
